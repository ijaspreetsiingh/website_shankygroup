import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    console.log('=== LOGIN API START ===');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { email, password } = body;

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Login attempt for email:', email);

    try {
      // Create users table if not exists
      console.log('Creating users table if not exists...');
      await execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) DEFAULT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role ENUM('admin', 'user') DEFAULT 'user',
          profile_type ENUM('personal', 'business') DEFAULT 'personal',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('Users table created/verified');
    } catch (tableError) {
      console.error('Error creating users table:', tableError);
      return NextResponse.json(
        { success: false, message: 'Database setup error' },
        { status: 500 }
      );
    }

    try {
      // Find user by email
      console.log('Finding user by email:', email);
      const users = await query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      console.log('Query result:', users);
      console.log('User found:', users.length > 0 ? 'Yes' : 'No');
      console.log('User data type:', typeof users);
      console.log('User data length:', users?.length);

      if (!users || users.length === 0) {
        console.log('No user found with email:', email);
        return NextResponse.json(
          { success: false, message: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Handle different database response formats
      let user;
      if (Array.isArray(users)) {
        user = users[0];
      } else if (users && typeof users === 'object') {
        user = users;
      } else {
        console.error('Unexpected user data format:', users);
        return NextResponse.json(
          { success: false, message: 'Database error' },
          { status: 500 }
        );
      }

      console.log('User extracted:', { id: user.id, email: user.email, role: user.role });

      // Check password
      console.log('Checking password...');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
        console.log('Invalid password for email:', email);
        return NextResponse.json(
          { success: false, message: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      console.log('Login successful for:', user.email);
      console.log('=== LOGIN API END ===');

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: userWithoutPassword
      });

    } catch (queryError) {
      console.error('Database query error:', queryError);
      return NextResponse.json(
        { success: false, message: 'Database query error' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Login API error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
