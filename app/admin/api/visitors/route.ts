import { NextResponse } from 'next/server';
import { safeRows, handlePost, handlePut, handleDelete } from '../_utils';

export const runtime = 'nodejs';

type VisitorRow = {
  id: number;
  ip: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  user_agent: string | null;
  browser: string | null;
  os: string | null;
  screen_resolution: string | null;
  language: string | null;
  referrer: string | null;
  visit_time: string | null;
};

export async function GET() {
  const rows = await safeRows<VisitorRow>(
    `SELECT id, ip, country, city, region, latitude, longitude, timezone, user_agent, browser, os, screen_resolution, language, referrer, visit_time
     FROM visitors
     ORDER BY id DESC
     LIMIT 200`
  );
  return NextResponse.json({ rows });
}

export async function POST(req: Request) { return handlePost(req, 'visitors'); }
export async function PUT(req: Request) { return handlePut(req, 'visitors'); }
export async function DELETE(req: Request) { return handleDelete(req, 'visitors'); }
