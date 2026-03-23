import { NextResponse } from 'next/server';
import { safeCount } from '../_utils';

export const runtime = 'nodejs';

export async function GET() {
  const [leads, contacts, vendors, careers, jobs, visitors, blogs] = await Promise.all([
    safeCount('SELECT COUNT(*) as total FROM leads'),
    safeCount('SELECT COUNT(*) as total FROM contact_inquiries'),
    safeCount('SELECT COUNT(*) as total FROM vendor_registrations'),
    safeCount('SELECT COUNT(*) as total FROM career_applications'),
    safeCount('SELECT COUNT(*) as total FROM jobs'),
    safeCount('SELECT COUNT(*) as total FROM visitors'),
    safeCount("SELECT COUNT(*) as total FROM blogs WHERE status = 'published'"),
  ]);

  return NextResponse.json({ leads, contacts, vendors, careers, jobs, visitors, blogs });
}
