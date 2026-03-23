<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shankygroup"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Debug: Log received data
error_log("Received JSON: " . $json);
error_log("Decoded data: " . print_r($data, true));
error_log("Inquiry type received: " . ($data['inquiryType'] ?? 'NOT SET'));

// If data is not JSON, check $_POST
if (is_null($data)) {
    $data = $_POST;
    error_log("Using POST data instead: " . print_r($data, true));
}

// Handle different inquiry types and actions
if (isset($data['action'])) {
    error_log("=== ACTION RECEIVED: " . $data['action'] . " ===");
    
    switch ($data['action']) {
        case 'get_blogs':
            error_log("Processing get_blogs action");
            getBlogs($conn);
            break;
        case 'get_blog':
            error_log("Processing get_blog action");
            getSingleBlog($conn, $data);
            break;
        case 'get_blog_by_slug':
            error_log("Processing get_blog_by_slug action");
            getBlogBySlug($conn, $data);
            break;
        case 'get_related_blogs':
            error_log("Processing get_related_blogs action");
            getRelatedBlogs($conn, $data);
            break;
        case 'get_blog_comments':
            error_log("Processing get_blog_comments action");
            getBlogComments($conn, $data);
            break;
        case 'add_comment':
            error_log("Processing add_comment action");
            addBlogComment($conn, $data);
            break;
        case 'increment_view':
            error_log("Processing increment_view action");
            incrementBlogView($conn, $data);
            break;
        case 'track_visitor':
            error_log("Processing track_visitor action");
            trackVisitor($conn);
            break;
        case 'visitor_analytics':
            error_log("Processing visitor_analytics action");
            getVisitorAnalytics($conn);
            break;
        case 'submit_vendor_registration':
            handleVendorRegistrationSubmit($conn, $data);
            exit();
        case 'get_jobs':
            getJobs($conn);
            exit();
        case 'submit_career_application':
            handleCareerApplicationSubmit($conn);
            exit();
        default:
            error_log("ERROR: Invalid action - " . $data['action']);
            echo json_encode(["status" => "error", "message" => "Invalid action"]);
            break;
    }
    error_log("=== ACTION PROCESSING COMPLETED ===");
    exit(); // Important: exit after handling action
}

// Vendor form from website (vender.tsx) - has companyName, contactPerson, email, etc. (no firstName)
if (isset($data['companyName']) && isset($data['contactPerson']) && !empty($data['email']) && empty($data['firstName'])) {
    handleVendorRegistrationSubmit($conn, $data);
    exit();
}

// Only validate contact form fields if it's not a blog action
if (empty($data['firstName']) || empty($data['email'])) {
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
    exit();
}

// Prepare data for insertion
$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName'] ?? '');
$state = $conn->real_escape_string($data['state'] ?? '');
$phone = $conn->real_escape_string($data['phone'] ?? '');
$email = $conn->real_escape_string($data['email']);
$inquiryType = $conn->real_escape_string($data['inquiryType'] ?? '');
$message = $conn->real_escape_string($data['message'] ?? '');
$exclusiveOffers = (isset($data['exclusiveOffers']) && $data['exclusiveOffers']) ? 1 : 0;
$source = 'website'; // Set source to website

// SQL Insert Query with source
$sql = "INSERT INTO contact_inquiries (first_name, last_name, state, phone, email, inquiry_type, message, exclusive_offers, source)
        VALUES ('$firstName', '$lastName', '$state', '$phone', '$email', '$inquiryType', '$message', $exclusiveOffers, '$source')";

// Debug: Log the SQL query
error_log("SQL Query: " . $sql);
error_log("InquiryType being inserted: " . $inquiryType);

// Handle inquiry types
if (isset($data['inquiryType'])) {
    switch ($data['inquiryType']) {
        case 'general':
            handleGeneralInquiry($conn, $data);
            break;
        case 'vendorregistration':
            handleVendorRegistration($conn, $data);
            break;
        case 'product':
            handleProductInquiry($conn, $data);
            break;
        default:
            echo json_encode(["status" => "error", "message" => "Invalid inquiry type"]);
            break;
    }
} else {
    // Default to general inquiry if no inquiry type specified
    handleGeneralInquiry($conn, $data);
}

$conn->close();

// Blog Functions
function getBlogs($conn) {
    // Check if blogs table exists
    $checkTableQuery = "SHOW TABLES LIKE 'blogs'";
    $tableResult = $conn->query($checkTableQuery);
    
    if ($tableResult && $tableResult->num_rows === 0) {
        echo json_encode([
            "status" => "success", 
            "message" => "No blogs table found - returning empty blogs array",
            "blogs" => []
        ]);
        return;
    }
    
    $sql = "SELECT b.*, u.name as author_name 
            FROM blogs b 
            LEFT JOIN users u ON b.author_id = u.id 
            WHERE b.status = 'published' 
            ORDER BY b.published_at DESC, b.created_at DESC";
    
    $result = $conn->query($sql);
    
    if ($result) {
        $blogs = [];
        while ($row = $result->fetch_assoc()) {
            $blogs[] = $row;
        }
        echo json_encode([
            "status" => "success", 
            "message" => "Blogs retrieved successfully",
            "blogs" => $blogs
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Error fetching blogs: " . $conn->error
        ]);
    }
}

// Career jobs – same table as dashboard (vendor DB); only published shown on website
function getJobs($conn) {
    $createTable = "
        CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            location VARCHAR(255) DEFAULT NULL,
            job_type VARCHAR(100) DEFAULT 'Full-time',
            department VARCHAR(255) DEFAULT NULL,
            requirements TEXT,
            status ENUM('draft','published') DEFAULT 'draft',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_status (status),
            INDEX idx_created_at (created_at)
        )
    ";
    if (!$conn->query($createTable)) {
        echo json_encode(["status" => "error", "message" => "Error ensuring jobs table: " . $conn->error]);
        return;
    }
    $sql = "SELECT id, title, description, location, job_type, department, requirements, status, created_at, updated_at 
            FROM jobs 
            WHERE status = 'published' 
            ORDER BY created_at DESC";
    $result = $conn->query($sql);
    if ($result) {
        $jobs = [];
        while ($row = $result->fetch_assoc()) {
            $jobs[] = $row;
        }
        echo json_encode(["status" => "success", "message" => "Jobs retrieved successfully", "jobs" => $jobs]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error fetching jobs: " . $conn->error]);
    }
}

// Career application from website form (multipart: name, email, phone, position, experience, message, resume file)
function handleCareerApplicationSubmit($conn) {
    $name = isset($_POST['name']) ? $conn->real_escape_string(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? $conn->real_escape_string(trim($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? $conn->real_escape_string(trim($_POST['phone'])) : '';
    $position = isset($_POST['position']) ? $conn->real_escape_string(trim($_POST['position'])) : '';
    $experience = isset($_POST['experience']) ? $conn->real_escape_string(trim($_POST['experience'])) : '';
    $message = isset($_POST['message']) ? $conn->real_escape_string(trim($_POST['message'])) : '';
    if (empty($name) || empty($email) || empty($position)) {
        echo json_encode(["status" => "error", "message" => "Name, email and position are required"]);
        return;
    }
    $createTable = "
        CREATE TABLE IF NOT EXISTS career_applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(100) DEFAULT NULL,
            position VARCHAR(255) NOT NULL,
            experience VARCHAR(100) DEFAULT NULL,
            message TEXT,
            resume_path VARCHAR(500) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_created_at (created_at)
        )
    ";
    if (!$conn->query($createTable)) {
        echo json_encode(["status" => "error", "message" => "Database error"]);
        return;
    }
    $resumePath = null;
    if (!empty($_FILES['resume']['name']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'career-resumes';
        if (!is_dir($uploadDir)) {
            @mkdir($uploadDir, 0755, true);
        }
        $ext = strtolower(pathinfo($_FILES['resume']['name'], PATHINFO_EXTENSION)) ?: 'pdf';
        $allowed = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($ext, $allowed)) {
            echo json_encode(["status" => "error", "message" => "Resume: PDF, DOC, DOCX or image only"]);
            return;
        }
        $filename = date('YmdHis') . '_' . preg_replace('/[^a-zA-Z0-9.-]/', '_', substr($_FILES['resume']['name'], -50));
        $filepath = $uploadDir . DIRECTORY_SEPARATOR . $filename;
        if (move_uploaded_file($_FILES['resume']['tmp_name'], $filepath)) {
            $base = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
            $resumePath = $base . '/uploads/career-resumes/' . $filename;
        }
    }
    $resumePathEsc = $resumePath ? "'" . $conn->real_escape_string($resumePath) . "'" : "NULL";
    $messageEsc = $message !== '' ? "'" . $message . "'" : "NULL";
    $phoneEsc = $phone !== '' ? "'" . $phone . "'" : "NULL";
    $experienceEsc = $experience !== '' ? "'" . $experience . "'" : "NULL";
    $sql = "INSERT INTO career_applications (name, email, phone, position, experience, message, resume_path) VALUES ('$name', '$email', $phoneEsc, '$position', $experienceEsc, $messageEsc, $resumePathEsc)";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "success", "message" => "Application submitted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save application"]);
    }
}

function getSingleBlog($conn, $data) {
    if (!isset($data['blog_id'])) {
        echo json_encode(["status" => "error", "message" => "Blog ID is required"]);
        return;
    }
    
    $blogId = $conn->real_escape_string($data['blog_id']);
    
    $sql = "SELECT b.*, u.name as author_name 
            FROM blogs b 
            LEFT JOIN users u ON b.author_id = u.id 
            WHERE b.id = $blogId AND b.status = 'published'";
    
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $blog = $result->fetch_assoc();
        echo json_encode([
            "status" => "success", 
            "message" => "Blog retrieved successfully",
            "blog" => $blog
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Blog not found"
        ]);
    }
}

function incrementBlogView($conn, $data) {
    if (!isset($data['blog_id'])) {
        echo json_encode(["status" => "error", "message" => "Blog ID is required"]);
        return;
    }
    
    $blogId = $conn->real_escape_string($data['blog_id']);
    
    $sql = "UPDATE blogs SET view_count = view_count + 1 WHERE id = $blogId";
    
    if ($conn->query($sql)) {
        echo json_encode([
            "status" => "success", 
            "message" => "View count incremented"
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Error incrementing view count: " . $conn->error
        ]);
    }
}

// Function to track visitor
function trackVisitor($conn) {
    error_log("=== TRACK VISITOR FUNCTION CALLED ===");
    
    // Check both JSON input and $_POST
    $visitorData = null;
    
    // First try to get from JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if ($data && isset($data['visitor_data'])) {
        $visitorData = $data['visitor_data'];
        error_log("Visitor data from JSON: " . print_r($visitorData, true));
    } else {
        // Try $_POST
        $visitorData = $_POST['visitor_data'] ?? null;
        error_log("Visitor data from POST: " . print_r($visitorData, true));
    }
    
    if (!$visitorData) {
        error_log("ERROR: No visitor data provided in JSON or POST");
        error_log("Raw JSON received: " . $json);
        error_log("Raw POST data: " . print_r($_POST, true));
        
        echo json_encode([
            "status" => "error", 
            "message" => "No visitor data provided"
        ]);
        return;
    }
    
    // Check database connection
    if ($conn->connect_error) {
        error_log("ERROR: Database connection failed: " . $conn->connect_error);
        echo json_encode([
            "status" => "error", 
            "message" => "Database connection failed"
        ]);
        return;
    }
    
    error_log("Database connection OK, creating visitors table...");
    
    // Create visitors table if it doesn't exist
    $createVisitorsTableQuery = "
        CREATE TABLE IF NOT EXISTS visitors (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ip VARCHAR(45),
            country VARCHAR(100),
            city VARCHAR(100),
            region VARCHAR(100),
            latitude DECIMAL(10, 8),
            longitude DECIMAL(11, 8),
            timezone VARCHAR(50),
            user_agent TEXT,
            browser VARCHAR(50),
            os VARCHAR(50),
            screen_resolution VARCHAR(20),
            language VARCHAR(10),
            referrer VARCHAR(500),
            visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_ip (ip),
            INDEX idx_country (country),
            INDEX idx_visit_time (visit_time)
        )
    ";
    
    if (!$conn->query($createVisitorsTableQuery)) {
        error_log("ERROR: Creating visitors table failed: " . $conn->error);
        echo json_encode([
            "status" => "error", 
            "message" => "Error creating visitors table: " . $conn->error
        ]);
        return;
    }
    
    error_log("Visitors table created/verified successfully");
    
    // Sanitize and prepare data
    $ip = $conn->real_escape_string($visitorData['ip'] ?? '');
    $country = $conn->real_escape_string($visitorData['country'] ?? '');
    $city = $conn->real_escape_string($visitorData['city'] ?? '');
    $region = $conn->real_escape_string($visitorData['region'] ?? '');
    $latitude = $visitorData['latitude'] ?? null;
    $longitude = $visitorData['longitude'] ?? null;
    $timezone = $conn->real_escape_string($visitorData['timezone'] ?? '');
    $userAgent = $conn->real_escape_string($visitorData['userAgent'] ?? '');
    $browser = $conn->real_escape_string($visitorData['browser'] ?? '');
    $os = $conn->real_escape_string($visitorData['os'] ?? '');
    $screenResolution = $conn->real_escape_string($visitorData['screenResolution'] ?? '');
    $language = $conn->real_escape_string($visitorData['language'] ?? '');
    $referrer = $conn->real_escape_string($visitorData['referrer'] ?? '');
    
    error_log("Sanitized data prepared, inserting into database...");
    
    // Insert visitor data
    $insertVisitorQuery = "
        INSERT INTO visitors 
        (ip, country, city, region, latitude, longitude, timezone, user_agent, browser, os, screen_resolution, language, referrer) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";
    
    $stmt = $conn->prepare($insertVisitorQuery);
    if (!$stmt) {
        error_log("ERROR: Failed to prepare statement: " . $conn->error);
        echo json_encode([
            "status" => "error", 
            "message" => "Failed to prepare statement: " . $conn->error
        ]);
        return;
    }
    
    $stmt->bind_param("ssssddsssssss", 
        $ip, $country, $city, $region, $latitude, $longitude, $timezone, 
        $userAgent, $browser, $os, $screenResolution, $language, $referrer
    );
    
    if ($stmt->execute()) {
        error_log("SUCCESS: Visitor data inserted successfully");
        echo json_encode([
            "status" => "success", 
            "message" => "Visitor tracked successfully"
        ]);
        
        // Send visitor data to admin dashboard server
        sendVisitorDataToAdmin($conn);
    } else {
        error_log("ERROR: Failed to insert visitor data: " . $stmt->error);
        echo json_encode([
            "status" => "error", 
            "message" => "Error tracking visitor: " . $stmt->error
        ]);
    }
    
    $stmt->close();
    error_log("=== TRACK VISITOR FUNCTION ENDED ===");
}

// Function to get visitor analytics
function getVisitorAnalytics($conn) {
    // Create visitors table if it doesn't exist
    $createVisitorsTableQuery = "
        CREATE TABLE IF NOT EXISTS visitors (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ip VARCHAR(45),
            country VARCHAR(100),
            city VARCHAR(100),
            region VARCHAR(100),
            latitude DECIMAL(10, 8),
            longitude DECIMAL(11, 8),
            timezone VARCHAR(50),
            user_agent TEXT,
            browser VARCHAR(50),
            os VARCHAR(50),
            screen_resolution VARCHAR(20),
            language VARCHAR(10),
            referrer VARCHAR(500),
            visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_ip (ip),
            INDEX idx_country (country),
            INDEX idx_visit_time (visit_time)
        )
    ";
    
    $conn->query($createVisitorsTableQuery);
    
    // Get total visitors
    $totalVisitorsQuery = "SELECT COUNT(DISTINCT ip) as total_visitors FROM visitors";
    $totalResult = $conn->query($totalVisitorsQuery);
    $totalVisitors = $totalResult->fetch_assoc()['total_visitors'];
    
    // Get visitors by country
    $countryQuery = "
        SELECT country, COUNT(*) as count 
        FROM visitors 
        WHERE country != '' 
        GROUP BY country 
        ORDER BY count DESC 
        LIMIT 10
    ";
    $countryResult = $conn->query($countryQuery);
    $visitorsByCountry = [];
    while ($row = $countryResult->fetch_assoc()) {
        $visitorsByCountry[] = $row;
    }
    
    // Get recent visitors with location
    $recentVisitorsQuery = "
        SELECT ip, country, city, region, latitude, longitude, browser, os, visit_time 
        FROM visitors 
        ORDER BY visit_time DESC 
        LIMIT 50
    ";
    $recentResult = $conn->query($recentVisitorsQuery);
    $recentVisitors = [];
    while ($row = $recentResult->fetch_assoc()) {
        $recentVisitors[] = $row;
    }
    
    // Get visitors by browser
    $browserQuery = "
        SELECT browser, COUNT(*) as count 
        FROM visitors 
        WHERE browser != '' 
        GROUP BY browser 
        ORDER BY count DESC
    ";
    $browserResult = $conn->query($browserQuery);
    $visitorsByBrowser = [];
    while ($row = $browserResult->fetch_assoc()) {
        $visitorsByBrowser[] = $row;
    }
    
    // Get visitors by OS
    $osQuery = "
        SELECT os, COUNT(*) as count 
        FROM visitors 
        WHERE os != '' 
        GROUP BY os 
        ORDER BY count DESC
    ";
    $osResult = $conn->query($osQuery);
    $visitorsByOS = [];
    while ($row = $osResult->fetch_assoc()) {
        $visitorsByOS[] = $row;
    }
    
    // Get today's visitors
    $todayQuery = "SELECT COUNT(DISTINCT ip) as today_visitors FROM visitors WHERE DATE(visit_time) = CURDATE()";
    $todayResult = $conn->query($todayQuery);
    $todayVisitors = $todayResult->fetch_assoc()['today_visitors'];
    
    // Debug log
    error_log("Visitor Analytics - Total: $totalVisitors, Today: $todayVisitors, Countries: " . count($visitorsByCountry));
    
    echo json_encode([
        "status" => "success",
        "data" => [
            "total_visitors" => $totalVisitors,
            "today_visitors" => $todayVisitors,
            "visitors_by_country" => $visitorsByCountry,
            "visitors_by_browser" => $visitorsByBrowser,
            "visitors_by_os" => $visitorsByOS,
            "recent_visitors" => $recentVisitors
        ]
    ]);
}

// Function to send visitor data to admin dashboard
function sendVisitorDataToAdmin($conn) {
    // Get latest visitor data
    $query = "SELECT * FROM visitors ORDER BY visit_time DESC LIMIT 1";
    $result = $conn->query($query);
    
    if ($result && $result->num_rows > 0) {
        $visitor = $result->fetch_assoc();
        
        error_log("=== SENDING VISITOR DATA TO ADMIN ===");
        error_log("Visitor data from PHP DB: " . print_r($visitor, true));
        
        // Direct database connection to admin dashboard
        try {
            // Connect to admin dashboard database
            $adminConn = new mysqli("localhost", "root", "", "shankygroup_admin");
            
            if ($adminConn->connect_error) {
                error_log("Failed to connect to admin database: " . $adminConn->connect_error);
                return;
            }
            
            // Create visitor_updates table if not exists
            $createTableQuery = "
                CREATE TABLE IF NOT EXISTS visitor_updates (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    ip VARCHAR(45),
                    country VARCHAR(100),
                    city VARCHAR(100),
                    region VARCHAR(100),
                    latitude DECIMAL(10, 8),
                    longitude DECIMAL(11, 8),
                    timezone VARCHAR(50),
                    user_agent TEXT,
                    browser VARCHAR(50),
                    os VARCHAR(50),
                    screen_resolution VARCHAR(20),
                    language VARCHAR(10),
                    referrer VARCHAR(500),
                    visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ";
            $adminConn->query($createTableQuery);
            
            // Insert visitor data with all fields
            $insertQuery = "
                INSERT INTO visitor_updates 
                (ip, country, city, region, latitude, longitude, timezone, user_agent, browser, os, screen_resolution, language, referrer, visit_time) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ";
            
            $stmt = $adminConn->prepare($insertQuery);
            $stmt->bind_param("ssssddssssssss", 
                $visitor['ip'], 
                $visitor['country'], 
                $visitor['city'], 
                $visitor['region'], 
                $visitor['latitude'], 
                $visitor['longitude'], 
                $visitor['timezone'], 
                $visitor['user_agent'], 
                $visitor['browser'], 
                $visitor['os'], 
                $visitor['screen_resolution'], 
                $visitor['language'], 
                $visitor['referrer'], 
                $visitor['visit_time']
            );
            
            if ($stmt->execute()) {
                error_log("Visitor data inserted into admin database successfully");
            } else {
                error_log("Error inserting visitor data: " . $stmt->error);
            }
            
            $stmt->close();
            $adminConn->close();
            
        } catch (Exception $e) {
            error_log("Error in sendVisitorDataToAdmin: " . $e->getMessage());
        }
        
        // Also try cURL method as backup
        $adminData = [
            'action' => 'visitor_update',
            'visitor_data' => $visitor
        ];
        
        $ch = curl_init('http://localhost:5000/api/visitor-update');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($adminData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        error_log("Visitor data sent to admin via cURL: " . $response);
        error_log("=== VISITOR DATA SEND COMPLETED ===");
    }
}

// Function to get email template from database
function getEmailTemplate($conn) {
    $templateQuery = "SELECT * FROM email_templates WHERE template_type = 'thank_you' AND is_default = TRUE AND is_active = 1 LIMIT 1";
    $templateResult = $conn->query($templateQuery);
    
    if ($templateResult->num_rows > 0) {
        return $templateResult->fetch_assoc();
    }
    return null;
}

// Get vendor registration email template: company_settings custom subject/body, or email_templates by template_id
function getVendorEmailTemplate($conn) {
    $settings = [];
    $q = "SELECT setting_key, setting_value FROM company_settings WHERE setting_key IN ('vendor_registration_template_id', 'vendor_registration_subject', 'vendor_registration_body')";
    $res = $conn->query($q);
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
    }
    $templateId = isset($settings['vendor_registration_template_id']) ? $settings['vendor_registration_template_id'] : 'professional';
    $customSubject = isset($settings['vendor_registration_subject']) ? trim($settings['vendor_registration_subject']) : '';
    $customBody = isset($settings['vendor_registration_body']) ? $settings['vendor_registration_body'] : '';
    if ($customSubject !== '' && $customBody !== '') {
        return ['subject' => $customSubject, 'body' => $customBody, 'template_id' => $templateId];
    }
    $stmt = $conn->prepare("SELECT * FROM email_templates WHERE template_id = ? AND template_type = 'thank_you' AND is_active = 1 LIMIT 1");
    $stmt->bind_param('s', $templateId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }
    return null;
}

// Function to send thank you email using Elastic Mail credentials from database
// $useVendorTemplate: when true, use vendor registration template (company_settings / email_templates)
function sendThankYouEmail($firstName, $email, $conn, $useVendorTemplate = false) {
    // Debug: Check if connection is still alive
    if (!$conn->ping()) {
        // Reconnect if connection is closed
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            error_log("Database reconnection failed: " . $conn->connect_error);
            return false;
        }
    }
    
    // Get Elastic Mail credentials from database
    $smtpQuery = "SELECT * FROM smtp_configurations WHERE is_active = 1 ORDER BY created_at DESC LIMIT 1";
    $smtpResult = $conn->query($smtpQuery);
    
    // Debug: Log the query and result
    error_log("SMTP Query: " . $smtpQuery);
    error_log("SMTP Result Count: " . $smtpResult->num_rows);
    
    if ($smtpResult->num_rows > 0) {
        $smtpConfig = $smtpResult->fetch_assoc();
        
        // Debug: Log SMTP config (without password)
        error_log("SMTP Config Found - Host: " . $smtpConfig['host'] . ", User: " . $smtpConfig['username'] . ", From: " . $smtpConfig['from_email']);
        error_log("Password Length: " . strlen($smtpConfig['password']) . " chars");
        error_log("From Email: " . $smtpConfig['from_email']);
        
        // Validate required fields
        if (empty($smtpConfig['password']) || empty($smtpConfig['from_email'])) {
            error_log("ERROR: Missing API key or from email in SMTP configuration");
            return sendEmailViaPHP($firstName, $email);
        }
        
        // Use Elastic Mail API with dynamic template
        $overrideTemplate = $useVendorTemplate ? getVendorEmailTemplate($conn) : null;
        return sendEmailViaElasticMail($firstName, $email, $smtpConfig, $conn, $overrideTemplate);
    } else {
        // Debug: No SMTP config found
        error_log("No SMTP configuration found in database");
        
        // Fallback to PHP mail if no SMTP config found
        return sendEmailViaPHP($firstName, $email);
    }
}

// Function to send email via SMTP (same as backend approach)
// $overrideTemplate: optional array with subject, body, template_id (e.g. from getVendorEmailTemplate)
function sendEmailViaElasticMail($firstName, $email, $smtpConfig, $conn, $overrideTemplate = null) {
    
    // Use override (e.g. vendor template) or get default email template from database
    $emailTemplate = $overrideTemplate !== null ? $overrideTemplate : getEmailTemplate($conn);
    
    if ($emailTemplate) {
        // Use custom template from database
        $subject = $emailTemplate['subject'];
        $emailBody = $emailTemplate['body'];    
        
        // Replace placeholders with actual client data
        $emailBody = str_replace('{firstName}', htmlspecialchars($firstName), $emailBody);
        $emailBody = str_replace('{companyName}', htmlspecialchars($smtpConfig['from_name']), $emailBody);
        
        // Generate ticket ID for corporate template
        if (strpos($emailTemplate['template_id'], 'corporate') !== false) {
            $ticketId = 'TKT' . date('Ymd') . strtoupper(substr(uniqid(), -6));
            $emailBody = str_replace('{ticketId}', $ticketId, $emailBody);
            $subject = str_replace('{ticketId}', $ticketId, $subject);
        }
        
        error_log("Using custom email template: " . $emailTemplate['template_id']);
    } else {
        // Fallback to default template
        $subject = "Thank You for Contacting Us!";
        $fromEmail = $smtpConfig['from_email'];
        $fromName = $smtpConfig['from_name'];
        
        $emailBody = "
        <!DOCTYPE html>
        <html>
        <head>
            <title>Thank You for Contacting Us</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { padding: 20px; background: #f9fafb; border: 1px solid #e5e7eb; }
                .footer { background: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
                .highlight { background: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; margin: 15px 0; }
                .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🎉 Thank You for Contacting Us!</h1>
                </div>
                <div class='content'>
                    <p>Dear <strong>" . htmlspecialchars($firstName) . "</strong>,</p>
                    <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
                    
                    <div class='highlight'>
                        <p><strong>📧 Your inquiry is important to us!</strong></p>
                        <p>Our team will review your message and respond within 24-48 hours.</p>
                    </div>
                    
                    <p>While you wait, feel free to explore our services:</p>
                    <a href='https://shankygroup.com/services' class='button'>Explore Our Services</a>
                    
                    <br>
                    <p>Best regards,<br>
                    <strong>The Team</strong><br>
                    " . htmlspecialchars($smtpConfig['from_name']) . "</p>
                </div>
                <div class='footer'>
                    <p><em>This is an automated message. Please do not reply to this email.</em></p>
                    <p>If you have urgent questions, call us at: +91-XXXXXXXXXX</p>
                    <p>Visit our website: <a href='https://shankygroup.com'>shankygroup.com</a></p>
                </div>
            </div>
        </body>
        </html>";
        
        error_log("Using default fallback template");
    }
    
    $fromEmail = $smtpConfig['from_email'];
    $fromName = $smtpConfig['from_name'];
    
    error_log("Sending email via PHPMailer SMTP to: " . $email);
    error_log("From: " . $fromEmail . " (" . $fromName . ")");
    error_log("SMTP Host: " . $smtpConfig['host'] . ":" . $smtpConfig['port']);
    
    // Validate email addresses
    if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        error_log("ERROR: Invalid from email: " . $fromEmail);
        return sendEmailViaPHP($firstName, $email);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_log("ERROR: Invalid to email: " . $email);
        return false;
    }
    
    // Try PHPMailer with proper SMTP authentication
    try {
        // Import PHPMailer
        require_once __DIR__ . '/vendor/autoload.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        // Server settings
        $mail->isSMTP();
        $mail->Host = $smtpConfig['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtpConfig['username'];
        $mail->Password = $smtpConfig['password'];
        $mail->SMTPSecure = $smtpConfig['secure'] ? 'tls' : '';
        $mail->Port = $smtpConfig['port'];
        
        // Recipients
        $mail->setFrom($smtpConfig['from_email'], $smtpConfig['from_name']);
        $mail->addAddress($email);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $emailBody;
        
        error_log("Sending via PHPMailer SMTP...");
        $mail->send();
        error_log("Email sent successfully via PHPMailer SMTP");
        return true;
        
    } catch (Exception $e) {
        error_log("PHPMailer SMTP failed: " . $e->getMessage());
        error_log("Trying Elastic Mail API as fallback...");
        
        // Fallback to Elastic Mail API
        return sendEmailViaElasticMailAPI($firstName, $email, $smtpConfig, $subject, $fromEmail, $fromName, $emailBody);
    }
}

// Separate function for Elastic Mail API (fallback)
function sendEmailViaElasticMailAPI($firstName, $email, $smtpConfig, $subject, $fromEmail, $fromName, $emailBody) {
    $elasticMailUrl = "https://api.elasticemail.com/v2/email/send";
    
    $postData = [
        'apikey' => $smtpConfig['password'],
        'from' => $fromEmail,
        'fromName' => $fromName,
        'to' => $email,
        'subject' => $subject,
        'bodyHtml' => $emailBody,
        'isTransactional' => true
    ];
    
    error_log("Elastic Mail API Key exists: " . (!empty($smtpConfig['password']) ? 'YES' : 'NO'));
    error_log("API Key Length: " . strlen($smtpConfig['password']) . " chars");
    error_log("From Email: " . $fromEmail);
    error_log("To Email: " . $email);
    error_log("Sending to Elastic Mail API: " . $elasticMailUrl);
    
    $ch = curl_init($elasticMailUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Contact-API/1.0');
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    error_log("Elastic Mail Response: " . $response);
    error_log("HTTP Code: " . $httpCode);
    error_log("Curl Error: " . $error);
    
    // Parse response for more details
    $responseData = json_decode($response, true);
    if ($responseData && isset($responseData['success'])) {
        if ($responseData['success'] === false) {
            error_log("Elastic Mail API Error: " . ($responseData['error'] ?? 'Unknown error'));
        }
    }
    
    if ($httpCode == 200 && $responseData && $responseData['success']) {
        error_log("Email sent successfully via Elastic Mail API");
        return true;
    } else {
        error_log("Elastic Mail Error - HTTP Code: " . $httpCode . ", Error: " . $error);
        error_log("Response: " . $response);
        return false;
    }
}

// Fallback function to send email via PHP mail
function sendEmailViaPHP($firstName, $email) {
    $subject = "Thank You for Contacting Us!";
    $fromEmail = "noreply@yourcompany.com";
    $fromName = "Your Company Name";
    
    $headers = "From: $fromEmail\r\n";
    $headers .= "Reply-To: info@yourcompany.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $emailBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <title>Thank You for Contacting Us</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .footer { background: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class='content'>
                <p>Dear <strong>" . htmlspecialchars($firstName) . "</strong>,</p>
                <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
                <p><strong>Your inquiry is important to us!</strong></p>
                <p>Our team will review your message and respond within 24-48 hours.</p>
                <br>
                <p>Best regards,<br>
                <strong>The Team</strong><br>
                " . htmlspecialchars($fromName) . "</p>
            </div>
            <div class='footer'>
                <p><em>This is an automated message. Please do not reply to this email.</em></p>
                <p>If you have urgent questions, call us at: +91-XXXXXXXXXX</p>
            </div>
        </div>
    </body>
    </html>";
    
    return mail($email, $subject, $emailBody, $headers);
}

/**
 * Get admin notification email from company_settings.
 * Tries current DB (shankygroup) first, then shankygroup_admin so backend Settings sync works.
 */
function getAdminNotificationEmail($conn) {
    $email = '';
    $q = "SELECT setting_value FROM company_settings WHERE setting_key = 'admin_notification_email' LIMIT 1";
    $res = $conn->query($q);
    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $email = trim($row['setting_value'] ?? '');
    }
    if ($email !== '') {
        return $email;
    }
    // Fallback: backend may store in admin DB when PHP_DB_NAME is not set
    $adminConn = @new mysqli("localhost", "root", "", "shankygroup_admin");
    if (!$adminConn->connect_error) {
        $res2 = $adminConn->query($q);
        if ($res2 && $res2->num_rows > 0) {
            $row = $res2->fetch_assoc();
            $email = trim($row['setting_value'] ?? '');
        }
        $adminConn->close();
    }
    return $email;
}

/**
 * Send notification email to admin when new Contact Us or Vendor Registration is submitted.
 * Uses admin_notification_email from Settings (company_settings); same SMTP as thank-you emails.
 */
function sendAdminNotificationEmail($conn, $type, $formData) {
    $toEmail = getAdminNotificationEmail($conn);
    if ($toEmail === '' || !filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        error_log("Admin notification skipped: no valid admin_notification_email in company_settings. Add it in Settings.");
        return;
    }

    if (!$conn->ping()) {
        global $servername, $username, $password, $dbname;
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            error_log("Admin notification: DB reconnect failed: " . $conn->connect_error);
            return;
        }
    }

    $smtpQuery = "SELECT * FROM smtp_configurations WHERE is_active = 1 ORDER BY created_at DESC LIMIT 1";
    $smtpResult = $conn->query($smtpQuery);
    if (!$smtpResult || $smtpResult->num_rows === 0) {
        error_log("Admin notification: No SMTP config; cannot send notification email.");
        return;
    }
    $smtpConfig = $smtpResult->fetch_assoc();
    $fromEmail = $smtpConfig['from_email'] ?? '';
    $fromName = $smtpConfig['from_name'] ?? 'Website';
    if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        error_log("Admin notification: Invalid from_email in SMTP config.");
        return;
    }

    $isVendor = ($type === 'vendor');
    $subject = $isVendor
        ? "New Vendor Registration – " . ($formData['company_name'] ?? $formData['contact_person'] ?? 'New lead')
        : "New Contact Us Lead – " . ($formData['email'] ?? 'Website');

    $rows = [];
    foreach ($formData as $k => $v) {
        if ($v === '' || $v === null) continue;
        $rows[] = '<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;">' . htmlspecialchars(str_replace('_', ' ', ucfirst($k))) . '</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">' . htmlspecialchars(is_bool($v) ? ($v ? 'Yes' : 'No') : $v) . '</td></tr>';
    }
    $tableRows = implode('', $rows);
    $emailBody = "
    <!DOCTYPE html>
    <html>
    <head><meta charset=\"UTF-8\"><title>New Form Submission</title></head>
    <body style=\"font-family:Arial,sans-serif;line-height:1.5;color:#333;\">
        <div style=\"max-width:600px;margin:0 auto;padding:20px;\">
            <h2 style=\"color:#2563eb;\">New " . ($isVendor ? "Vendor Registration" : "Contact Us") . " Submission</h2>
            <p>You have received a new form submission from the website.</p>
            <table style=\"width:100%;border-collapse:collapse;\">" . $tableRows . "</table>
            <p style=\"margin-top:20px;font-size:12px;color:#6b7280;\">This is an automated notification. Reply to the submitter's email to respond.</p>
        </div>
    </body>
    </html>";

    try {
        require_once __DIR__ . '/vendor/autoload.php';
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $smtpConfig['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtpConfig['username'];
        $mail->Password = $smtpConfig['password'];
        $mail->SMTPSecure = !empty($smtpConfig['secure']) ? 'tls' : '';
        $mail->Port = (int)($smtpConfig['port'] ?? 587);
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($toEmail);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $emailBody;
        $mail->send();
        error_log("Admin notification email sent to: " . $toEmail);
    } catch (Exception $e) {
        error_log("Admin notification PHPMailer failed: " . $e->getMessage());
        sendAdminNotificationViaElastic($toEmail, $subject, $emailBody, $smtpConfig);
    }
}

function sendAdminNotificationViaElastic($toEmail, $subject, $emailBody, $smtpConfig) {
    $fromEmail = $smtpConfig['from_email'] ?? '';
    $fromName = $smtpConfig['from_name'] ?? 'Website';
    $postData = [
        'apikey' => $smtpConfig['password'],
        'from' => $fromEmail,
        'fromName' => $fromName,
        'to' => $toEmail,
        'subject' => $subject,
        'bodyHtml' => $emailBody,
        'isTransactional' => true
    ];
    $ch = curl_init("https://api.elasticemail.com/v2/email/send");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($httpCode == 200) {
        error_log("Admin notification sent via Elastic Mail API to: " . $toEmail);
    } else {
        error_log("Admin notification Elastic API failed. HTTP: " . $httpCode . ", Response: " . $response);
    }
}

// Contact form handler functions
function handleGeneralInquiry($conn, $data) {
    global $firstName, $lastName, $state, $phone, $email, $inquiryType, $message, $exclusiveOffers, $source, $sql;
    
    // Execute the SQL query
    if ($conn->query($sql)) {
        sendThankYouEmail($firstName, $email, $conn);
        sendAdminNotificationEmail($conn, 'contact', [
            'form' => 'Contact Us',
            'first_name' => $firstName,
            'last_name' => $lastName,
            'state' => $state,
            'phone' => $phone,
            'email' => $email,
            'inquiry_type' => $inquiryType,
            'message' => $message,
            'exclusive_offers' => (bool)$exclusiveOffers,
            'source' => $source
        ]);
        echo json_encode([
            "status" => "success", 
            "message" => "Contact form submitted successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Error submitting contact form: " . $conn->error
        ]);
    }
}

// Ensure vendor_registrations table exists with all columns (create + add missing columns)
function ensureVendorRegistrationsTable($conn) {
    $createQuery = "
        CREATE TABLE IF NOT EXISTS vendor_registrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            state VARCHAR(255) DEFAULT NULL,
            phone VARCHAR(50) DEFAULT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT DEFAULT NULL,
            exclusive_offers TINYINT(1) DEFAULT 0,
            source VARCHAR(100) DEFAULT 'website',
            company_name VARCHAR(255) DEFAULT NULL,
            city VARCHAR(255) DEFAULT NULL,
            budget VARCHAR(100) DEFAULT NULL,
            address VARCHAR(500) DEFAULT NULL,
            country VARCHAR(255) DEFAULT NULL,
            gst_no VARCHAR(100) DEFAULT NULL,
            contact_person VARCHAR(255) DEFAULT NULL,
            designation VARCHAR(255) DEFAULT NULL,
            landline VARCHAR(50) DEFAULT NULL,
            website VARCHAR(255) DEFAULT NULL,
            status ENUM('new', 'contacted', 'qualified', 'converted') DEFAULT 'new',
            vendor_status VARCHAR(50) DEFAULT NULL,
            priority VARCHAR(50) DEFAULT 'medium',
            notes TEXT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_status (status),
            INDEX idx_created_at (created_at)
        )
    ";
    if (!$conn->query($createQuery)) {
        return false;
    }
    // Add only missing columns if table already existed (avoid "Duplicate column" fatal error)
    $alterColumns = [
        "address" => "ADD COLUMN address VARCHAR(500) DEFAULT NULL",
        "country" => "ADD COLUMN country VARCHAR(255) DEFAULT NULL",
        "gst_no" => "ADD COLUMN gst_no VARCHAR(100) DEFAULT NULL",
        "contact_person" => "ADD COLUMN contact_person VARCHAR(255) DEFAULT NULL",
        "designation" => "ADD COLUMN designation VARCHAR(255) DEFAULT NULL",
        "landline" => "ADD COLUMN landline VARCHAR(50) DEFAULT NULL",
        "website" => "ADD COLUMN website VARCHAR(255) DEFAULT NULL",
        "vendor_status" => "ADD COLUMN vendor_status VARCHAR(50) DEFAULT NULL"
    ];
    foreach ($alterColumns as $colName => $alterSql) {
        $escaped = $conn->real_escape_string($colName);
        $check = $conn->query("SHOW COLUMNS FROM vendor_registrations LIKE '" . $escaped . "'");
        if ($check && $check->num_rows === 0) {
            $conn->query("ALTER TABLE vendor_registrations " . $alterSql);
        }
    }
    return true;
}

// Vendor form submit from website (vender.tsx) - companyName, contactPerson, email, mobile, etc.
function handleVendorRegistrationSubmit($conn, $data) {
    if (empty($data['email'])) {
        echo json_encode(["status" => "error", "message" => "Email is required"]);
        return;
    }
    if (empty($data['companyName']) && empty($data['contactPerson'])) {
        echo json_encode(["status" => "error", "message" => "Company name or contact person is required"]);
        return;
    }
    if (!ensureVendorRegistrationsTable($conn)) {
        echo json_encode(["status" => "error", "message" => "Error creating vendor table"]);
        return;
    }
    $companyName = $conn->real_escape_string($data['companyName'] ?? '');
    $contactPerson = $conn->real_escape_string($data['contactPerson'] ?? '');
    $designation = $conn->real_escape_string($data['designation'] ?? '');
    $email = $conn->real_escape_string($data['email']);
    $mobile = $conn->real_escape_string($data['mobile'] ?? '');
    $landline = $conn->real_escape_string($data['landline'] ?? '');
    $address = $conn->real_escape_string($data['address'] ?? '');
    $country = $conn->real_escape_string($data['country'] ?? '');
    $gstNo = $conn->real_escape_string($data['gstNo'] ?? '');
    $website = $conn->real_escape_string($data['website'] ?? '');
    $message = $conn->real_escape_string($data['message'] ?? '');
    $vendorStatus = $conn->real_escape_string($data['status'] ?? '');
    $exclusiveOffers = (isset($data['exclusiveOffers']) && $data['exclusiveOffers']) ? 1 : 0;
    // Use proper firstName/lastName from form when sent; fallback to contactPerson/designation for old clients
    $firstName = !empty($data['firstName']) ? $conn->real_escape_string(trim($data['firstName'])) : ($contactPerson ?: $companyName);
    $lastName = !empty($data['lastName']) ? $conn->real_escape_string(trim($data['lastName'])) : ($designation ?: '');

    $sql = "INSERT INTO vendor_registrations (
        first_name, last_name, company_name, email, phone, landline, address, country, gst_no, contact_person, designation, website, message, exclusive_offers, source, vendor_status
    ) VALUES (
        '$firstName', " . ($lastName ? "'$lastName'" : "NULL") . ", " . ($companyName ? "'$companyName'" : "NULL") . ", '$email', " .
        ($mobile ? "'$mobile'" : "NULL") . ", " . ($landline ? "'$landline'" : "NULL") . ", " . ($address ? "'$address'" : "NULL") . ", " .
        ($country ? "'$country'" : "NULL") . ", " . ($gstNo ? "'$gstNo'" : "NULL") . ", " . ($contactPerson ? "'$contactPerson'" : "NULL") . ", " .
        ($designation ? "'$designation'" : "NULL") . ", " . ($website ? "'$website'" : "NULL") . ", " . ($message ? "'$message'" : "NULL") . ", $exclusiveOffers, 'website', " .
        ($vendorStatus ? "'$vendorStatus'" : "NULL") . "
    )";
    if ($conn->query($sql)) {
        sendThankYouEmail($firstName, $email, $conn, true);
        sendAdminNotificationEmail($conn, 'vendor', [
            'form' => 'Vendor Registration',
            'first_name' => $firstName,
            'last_name' => $lastName,
            'company_name' => isset($data['companyName']) ? $data['companyName'] : '',
            'contact_person' => isset($data['contactPerson']) ? $data['contactPerson'] : '',
            'designation' => isset($data['designation']) ? $data['designation'] : '',
            'email' => isset($data['email']) ? $data['email'] : '',
            'mobile' => isset($data['mobile']) ? $data['mobile'] : '',
            'landline' => isset($data['landline']) ? $data['landline'] : '',
            'address' => isset($data['address']) ? $data['address'] : '',
            'country' => isset($data['country']) ? $data['country'] : '',
            'gst_no' => isset($data['gstNo']) ? $data['gstNo'] : '',
            'website' => isset($data['website']) ? $data['website'] : '',
            'status' => isset($data['status']) ? $data['status'] : '',
            'message' => isset($data['message']) ? $data['message'] : '',
            'exclusive_offers' => !empty($data['exclusiveOffers'])
        ]);
        echo json_encode(["status" => "success", "message" => "Vendor registration submitted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error saving: " . $conn->error]);
    }
}

function handleVendorRegistration($conn, $data) {
    global $firstName, $lastName, $state, $phone, $email, $message, $exclusiveOffers, $source;

    if (!ensureVendorRegistrationsTable($conn)) {
        echo json_encode(["status" => "error", "message" => "Error creating vendor table: " . $conn->error]);
        return;
    }

    $companyName = $conn->real_escape_string($data['companyName'] ?? $data['company_name'] ?? '');
    $city = $conn->real_escape_string($data['city'] ?? '');
    $budget = $conn->real_escape_string($data['budget'] ?? '');

    $sqlVendor = "INSERT INTO vendor_registrations (first_name, last_name, state, phone, email, message, exclusive_offers, source, company_name, city, budget)
        VALUES ('$firstName', '$lastName', '$state', '$phone', '$email', '$message', $exclusiveOffers, '$source', " .
        ($companyName ? "'$companyName'" : "NULL") . ", " .
        ($city ? "'$city'" : "NULL") . ", " .
        ($budget ? "'$budget'" : "NULL") . ")";

    if ($conn->query($sqlVendor)) {
        sendThankYouEmail($firstName, $email, $conn, true);
        sendAdminNotificationEmail($conn, 'vendor', [
            'form' => 'Vendor Registration',
            'first_name' => $firstName,
            'last_name' => $lastName,
            'company_name' => $data['companyName'] ?? $data['company_name'] ?? '',
            'email' => $email,
            'state' => $state,
            'phone' => $phone,
            'message' => $message,
            'city' => $data['city'] ?? '',
            'budget' => $data['budget'] ?? '',
            'source' => $source
        ]);
        echo json_encode([
            "status" => "success",
            "message" => "Vendor registration submitted successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Error submitting vendor registration: " . $conn->error
        ]);
    }
}

function handleProductInquiry($conn, $data) {
    // Handle product inquiry
    handleGeneralInquiry($conn, $data);
}

// Additional Blog Functions
function getBlogBySlug($conn, $data) {
    if (!isset($data['slug'])) {
        echo json_encode(["status" => "error", "message" => "Slug is required"]);
        return;
    }
    
    $slug = $conn->real_escape_string($data['slug']);
    
    $sql = "SELECT b.*, u.name as author_name, u.email as author_email 
            FROM blogs b 
            LEFT JOIN users u ON b.author_id = u.id 
            WHERE b.slug = '$slug' AND b.status = 'published'";
    
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $blog = $result->fetch_assoc();
        echo json_encode([
            "status" => "success", 
            "message" => "Blog retrieved successfully",
            "blog" => $blog
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Blog not found"
        ]);
    }
}

function getRelatedBlogs($conn, $data) {
    if (!isset($data['slug'])) {
        echo json_encode(["status" => "error", "message" => "Slug is required"]);
        return;
    }
    
    $slug = $conn->real_escape_string($data['slug']);
    
    // First get the current blog's category
    $currentSql = "SELECT category FROM blogs WHERE slug = '$slug' AND status = 'published' LIMIT 1";
    $currentResult = $conn->query($currentSql);
    
    if ($currentResult && $currentResult->num_rows > 0) {
        $currentBlog = $currentResult->fetch_assoc();
        $category = $currentBlog['category'];
        
        // Get related blogs from same category, excluding current blog
        $sql = "SELECT b.*, u.name as author_name 
                FROM blogs b 
                LEFT JOIN users u ON b.author_id = u.id 
                WHERE b.category = '$category' AND b.slug != '$slug' AND b.status = 'published' 
                ORDER BY b.published_at DESC 
                LIMIT 3";
        
        $result = $conn->query($sql);
        
        if ($result) {
            $blogs = [];
            while ($row = $result->fetch_assoc()) {
                $blogs[] = $row;
            }
            echo json_encode([
                "status" => "success", 
                "message" => "Related blogs retrieved successfully",
                "blogs" => $blogs
            ]);
        } else {
            echo json_encode([
                "status" => "error", 
                "message" => "Error fetching related blogs: " . $conn->error
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Current blog not found"
        ]);
    }
}

function getBlogComments($conn, $data) {
    if (!isset($data['slug'])) {
        echo json_encode(["status" => "error", "message" => "Slug is required"]);
        return;
    }
    
    $slug = $conn->real_escape_string($data['slug']);
    
    // First get the blog ID
    $blogSql = "SELECT id FROM blogs WHERE slug = '$slug' LIMIT 1";
    $blogResult = $conn->query($blogSql);
    
    if ($blogResult && $blogResult->num_rows > 0) {
        $blog = $blogResult->fetch_assoc();
        $blogId = $blog['id'];
        
        // Check if blog_comments table exists
        $checkTableQuery = "SHOW TABLES LIKE 'blog_comments'";
        $tableResult = $conn->query($checkTableQuery);
        
        if ($tableResult && $tableResult->num_rows === 0) {
            echo json_encode([
                "status" => "success", 
                "message" => "No comments table found - returning empty comments array",
                "comments" => []
            ]);
            return;
        }
        
        $sql = "SELECT * FROM blog_comments 
                WHERE blog_id = $blogId AND status = 'approved' 
                ORDER BY created_at DESC";
        
        $result = $conn->query($sql);
        
        if ($result) {
            $comments = [];
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }
            echo json_encode([
                "status" => "success", 
                "message" => "Comments retrieved successfully",
                "comments" => $comments
            ]);
        } else {
            echo json_encode([
                "status" => "error", 
                "message" => "Error fetching comments: " . $conn->error
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Blog not found"
        ]);
    }
}

function addBlogComment($conn, $data) {
    if (!isset($data['blog_id']) || !isset($data['name']) || !isset($data['email']) || !isset($data['content'])) {
        echo json_encode(["status" => "error", "message" => "Required fields missing"]);
        return;
    }
    
    $blogId = $conn->real_escape_string($data['blog_id']);
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $content = $conn->real_escape_string($data['content']);
    
    // Create blog_comments table if it doesn't exist
    $createCommentsTableQuery = "
        CREATE TABLE IF NOT EXISTS blog_comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            blog_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
        )
    ";
    
    $conn->query($createCommentsTableQuery);
    
    $sql = "INSERT INTO blog_comments (blog_id, name, email, content, status) 
            VALUES ($blogId, '$name', '$email', '$content', 'approved')";
    
    if ($conn->query($sql)) {
        echo json_encode([
            "status" => "success", 
            "message" => "Comment added successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Error adding comment: " . $conn->error
        ]);
    }
}
?>