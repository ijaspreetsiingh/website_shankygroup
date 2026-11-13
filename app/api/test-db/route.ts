import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Only allow in development or from admin
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
    }

    const result = await execute('SELECT 1 as test');
    const users = await query<Array<{ count: number }>>('SELECT COUNT(*) as count FROM users');
    const count = users[0]?.count || 0;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      userCount: count
    });
    
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Database connection failed'
    }, { status: 500 });
  }
}
