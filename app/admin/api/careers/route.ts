import { NextResponse } from 'next/server';
import { safeRows, handlePost, handlePut, handleDelete } from '../_utils';

export const runtime = 'nodejs';

type CareerRow = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  position: string | null;
  experience: string | null;
  resume_path: string | null;
  created_at: string | null;
};

export async function GET() {
  const rows = await safeRows<CareerRow>(
    `SELECT id, name, email, phone, position, experience, resume_path, created_at
     FROM career_applications
     ORDER BY id DESC
     LIMIT 200`
  );
  return NextResponse.json({ rows });
}

export async function POST(req: Request) { return handlePost(req, 'career_applications'); }
export async function PUT(req: Request) { return handlePut(req, 'career_applications'); }
export async function DELETE(req: Request) { return handleDelete(req, 'career_applications'); }
