import { NextResponse } from 'next/server';
import { safeRows, handlePost, handlePut, handleDelete } from '../_utils';

export const runtime = 'nodejs';

type ContactRow = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  inquiry_type: string | null;
  message: string | null;
  created_at: string | null;
};

export async function GET() {
  const rows = await safeRows<ContactRow>(
    `SELECT id, first_name, last_name, state, phone, email, inquiry_type, message, created_at
     FROM contact_inquiries
     ORDER BY id DESC
     LIMIT 200`
  );
  return NextResponse.json({ rows });
}

export async function POST(req: Request) { return handlePost(req, 'contact_inquiries'); }
export async function PUT(req: Request) { return handlePut(req, 'contact_inquiries'); }
export async function DELETE(req: Request) { return handleDelete(req, 'contact_inquiries'); }
