import { NextResponse } from 'next/server';
import { execute } from '@/app/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log('=== DATABASE TEST START ===');
    
    // Check environment variables first
    console.log('Environment variables check:');
    console.log('DB_HOST:', process.env.DB_HOST ? 'SET' : 'MISSING');
    console.log('DB_USER:', process.env.DB_USER ? 'SET' : 'MISSING');
    console.log('DB_NAME:', process.env.DB_NAME ? 'SET' : 'MISSING');
    console.log('DB_PORT:', process.env.DB_PORT || '3306');
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'SET' : 'MISSING');
    
    // Test basic database connection
    console.log('Testing database connection...');
    const result = await execute('SELECT 1 as test');
    console.log('Database connection successful:', result);
    
    // Test users table
    console.log('Testing users table...');
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
    
    // Check existing users
    console.log('Checking existing users...');
    const users = await execute('SELECT COUNT(*) as count FROM users');
    console.log('Users count result:', users);
    
    const count = Array.isArray(users) ? users[0]?.count || 0 : 0;
    console.log('Total users:', count);
    
    console.log('=== DATABASE TEST END ===');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      userCount: count,
      envCheck: {
        DB_HOST: process.env.DB_HOST ? 'SET' : 'MISSING',
        DB_USER: process.env.DB_USER ? 'SET' : 'MISSING',
        DB_NAME: process.env.DB_NAME ? 'SET' : 'MISSING',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_PASSWORD: process.env.DB_PASSWORD ? 'SET' : 'MISSING'
      },
      details: {
        connection: 'OK',
        usersTable: 'OK',
        userCount: count
      }
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Database connection failed',
      type: typeof error,
      stack: error instanceof Error ? error.stack : 'No stack trace',
      envCheck: {
        DB_HOST: process.env.DB_HOST ? 'SET' : 'MISSING',
        DB_USER: process.env.DB_USER ? 'SET' : 'MISSING',
        DB_NAME: process.env.DB_NAME ? 'SET' : 'MISSING',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_PASSWORD: process.env.DB_PASSWORD ? 'SET' : 'MISSING'
      }
    }, { status: 500 });
  }
}
