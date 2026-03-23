import { NextResponse } from 'next/server';
import { execute } from '@/app/lib/db';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const visitor = body?.visitor_data;
    if (!visitor) {
      return NextResponse.json({ status: 'error', message: 'No visitor data provided' }, { status: 400 });
    }

    await execute(
      `CREATE TABLE IF NOT EXISTS visitors (
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
        visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    await execute(
      `INSERT INTO visitors
        (ip, country, city, region, latitude, longitude, timezone, user_agent, browser, os, screen_resolution, language, referrer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(visitor?.ip || ''),
        String(visitor?.country || ''),
        String(visitor?.city || ''),
        String(visitor?.region || ''),
        visitor?.latitude ?? null,
        visitor?.longitude ?? null,
        String(visitor?.timezone || ''),
        String(visitor?.userAgent || ''),
        String(visitor?.browser || ''),
        String(visitor?.os || ''),
        String(visitor?.screenResolution || ''),
        String(visitor?.language || ''),
        String(visitor?.referrer || ''),
      ]
    );

    return NextResponse.json({ status: 'success', message: 'Visitor tracked successfully' });
  } catch (error) {
    console.error('Visitor tracking API error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
