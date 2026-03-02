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

// If data is not JSON, check $_POST
if (is_null($data)) {
    $data = $_POST;
}

// Validate required fields
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

// SQL Insert Query
$sql = "INSERT INTO contact_inquiries (first_name, last_name, state, phone, email, inquiry_type, message, exclusive_offers)
        VALUES ('$firstName', '$lastName', '$state', '$phone', '$email', '$inquiryType', '$message', $exclusiveOffers)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Message sent successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>