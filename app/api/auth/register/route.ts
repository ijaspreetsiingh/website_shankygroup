import { NextResponse } from 'next/server';
import { execute } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    console.log('=== REGISTER API START ===');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { email, password, name, profile_type = 'personal' } = body;

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Register attempt for email:', email);

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
      // Check if user already exists
      console.log('Checking if user exists:', email);
      const existingUsers = await execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      console.log('Existing users result:', existingUsers);
      
      let userExists = false;
      if (Array.isArray(existingUsers)) {
        userExists = existingUsers.length > 0;
      } else if (existingUsers && typeof existingUsers === 'object') {
        userExists = true;
      }

      if (userExists) {
        console.log('User already exists:', email);
        return NextResponse.json(
          { success: false, message: 'User with this email already exists' },
          { status: 409 }
        );
      }

      // Hash password
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 12);
      console.log('Password hashed successfully');

      // Create user
      console.log('Creating user...');
      const result = await execute(
        'INSERT INTO users (name, email, password, role, profile_type) VALUES (?, ?, ?, ?, ?)',
        [name || null, email, hashedPassword, 'user', profile_type]
      );

      console.log('User created result:', result);
      
      let userId = null;
      if (result && typeof result === 'object' && 'insertId' in result) {
        userId = (result as any).insertId;
      }

      console.log('User created successfully, ID:', userId);
      console.log('=== REGISTER API END ===');

      return NextResponse.json({
        success: true,
        message: 'User registered successfully',
        userId: userId
      });

    } catch (queryError) {
      console.error('Database query error:', queryError);
      return NextResponse.json(
        { success: false, message: 'Database query error' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Register API error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
