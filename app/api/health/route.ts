import { NextResponse } from 'next/server';

/**
 * GET /api/health — dusre device (e.g. phone) se check karne ke liye ki backend reachable hai ya nahi.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Backend chal raha hai',
    timestamp: new Date().toISOString(),
  });
}
