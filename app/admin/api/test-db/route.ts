import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log('=== TEST DATABASE CONNECTION ===');
    
    // Test basic database connection
    const result = await query('SELECT COUNT(*) as count FROM vendor_registrations');
    console.log('Database connection successful');
    console.log('Vendor count result:', result);
    
    // Test full query
    const vendors = await query('SELECT * FROM vendor_registrations ORDER BY id DESC LIMIT 5');
    console.log('Sample vendor data:', vendors);
    
    return NextResponse.json({ 
      success: true, 
      count: result[0]?.count || 0,
      vendors: vendors 
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Database connection failed' 
    }, { status: 500 });
  }
}
