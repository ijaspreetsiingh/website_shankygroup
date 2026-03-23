import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export const runtime = 'nodejs';

type Job = {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  job_type: string | null;
  department: string | null;
  requirements: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export async function GET() {
  try {
    const jobs = await query<Job[]>(
      `SELECT id, title, description, location, job_type, department, requirements, status, created_at, updated_at
       FROM jobs
       WHERE status = 'published'
       ORDER BY created_at DESC`
    );
    return NextResponse.json({ status: 'success', jobs });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json({ status: 'error', jobs: [], message: 'Failed to fetch jobs' }, { status: 500 });
  }
}
