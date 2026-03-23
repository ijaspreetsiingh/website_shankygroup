import { NextResponse } from 'next/server';
import { safeRows, handlePost, handlePut, handleDelete } from '../_utils';
import { execute } from '@/app/lib/db';

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

async function ensureCareersSchema() {
  await execute(
    `CREATE TABLE IF NOT EXISTS career_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) DEFAULT NULL,
      position VARCHAR(255) NOT NULL,
      experience VARCHAR(100) DEFAULT NULL,
      message TEXT,
      resume_path VARCHAR(500) DEFAULT NULL,
      resume_name VARCHAR(255) DEFAULT NULL,
      resume_mime VARCHAR(120) DEFAULT NULL,
      resume_blob LONGBLOB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );
  await execute(`ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS resume_name VARCHAR(255) DEFAULT NULL`);
  await execute(`ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS resume_mime VARCHAR(120) DEFAULT NULL`);
  await execute(`ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS resume_blob LONGBLOB`);
}

export async function GET() {
  await ensureCareersSchema();
  const rows = await safeRows<CareerRow>(
    `SELECT
      id,
      name,
      email,
      phone,
      position,
      experience,
      CASE
        WHEN resume_blob IS NOT NULL THEN CONCAT('/admin/api/careers/resume/', id)
        ELSE resume_path
      END AS resume_path,
      created_at
     FROM career_applications
     ORDER BY id DESC
     LIMIT 200`
  );
  return NextResponse.json({ rows });
}

export async function POST(req: Request) { return handlePost(req, 'career_applications'); }
export async function PUT(req: Request) { return handlePut(req, 'career_applications'); }
export async function DELETE(req: Request) { return handleDelete(req, 'career_applications'); }
