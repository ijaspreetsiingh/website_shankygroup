import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';
import { handlePut, handleDelete } from '../_utils';

export const runtime = 'nodejs';

type JobRow = {
  id: number;
  title: string;
  location: string | null;
  job_type: string | null;
  department: string | null;
  status: string;
  created_at: string;
};

async function ensureJobsTable() {
  await execute(
    `CREATE TABLE IF NOT EXISTS jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT NULL,
      location VARCHAR(255) DEFAULT NULL,
      job_type VARCHAR(100) DEFAULT NULL,
      department VARCHAR(255) DEFAULT NULL,
      requirements TEXT DEFAULT NULL,
      status ENUM('draft','published','closed') DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`
  );
}

export async function GET() {
  await ensureJobsTable();
  const rows = await query<JobRow[]>(
    `SELECT id, title, location, job_type, department, status, created_at
     FROM jobs
     ORDER BY id DESC
     LIMIT 300`
  );
  return NextResponse.json({ rows });
}

export async function POST(request: Request) {
  try {
    await ensureJobsTable();
    const body = await request.json();
    const title = String(body?.title || '').trim();
    if (!title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }
    await execute(
      `INSERT INTO jobs (title, description, location, job_type, department, requirements, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        String(body?.description || '').trim() || null,
        String(body?.location || '').trim() || null,
        String(body?.job_type || '').trim() || null,
        String(body?.department || '').trim() || null,
        String(body?.requirements || '').trim() || null,
        String(body?.status || 'draft').trim(),
      ]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Failed to create job' }, { status: 500 });
  }
}

export async function PUT(req: Request) { return handlePut(req, 'jobs'); }
export async function DELETE(req: Request) { return handleDelete(req, 'jobs'); }
