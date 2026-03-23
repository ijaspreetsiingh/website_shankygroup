import { NextResponse } from 'next/server';
import { safeRows, handlePost, handlePut, handleDelete } from '../_utils';

export const runtime = 'nodejs';

type VendorRow = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  vendor_status: string | null;
  created_at: string | null;
  // Additional fields from vendor form
  address?: string | null;
  state?: string | null;
  city?: string | null;
  gst_no?: string | null;
  contact_person?: string | null;
  designation?: string | null;
  landline?: string | null;
  website?: string | null;
  message?: string | null;
  exclusive_offers?: number;
};

export async function GET() {
  console.log('=== ADMIN VENDORS API DEBUG ===');
  
  const rows = await safeRows<VendorRow>(
    `SELECT id, first_name, last_name, company_name, email, phone, country, vendor_status, created_at,
            address, state, city, gst_no, contact_person, designation, landline, website, message, exclusive_offers
     FROM vendor_registrations
     ORDER BY id DESC
     LIMIT 200`
  );
  
  console.log('Database query result:', rows);
  console.log('Number of vendors:', rows?.length || 0);
  console.log('=== END ADMIN VENDORS API DEBUG ===');
  
  return NextResponse.json({ rows });
}

export async function POST(req: Request) { return handlePost(req, 'vendor_registrations'); }
export async function PUT(req: Request) { return handlePut(req, 'vendor_registrations'); }
export async function DELETE(req: Request) { return handleDelete(req, 'vendor_registrations'); }
