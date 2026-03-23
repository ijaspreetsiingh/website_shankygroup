import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export const runtime = 'nodejs';

type ResumeRow = {
  id: number;
  resume_name: string | null;
  resume_mime: string | null;
  resume_blob: Buffer | null;
};

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const resumeId = Number(id);
    if (!Number.isFinite(resumeId) || resumeId <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid resume id' }, { status: 400 });
    }

    const rows = await query<ResumeRow[]>(
      `SELECT id, resume_name, resume_mime, resume_blob
       FROM career_applications
       WHERE id = ?
       LIMIT 1`,
      [resumeId]
    );

    const row = rows?.[0];
    if (!row || !row.resume_blob) {
      return NextResponse.json({ success: false, message: 'Resume not found' }, { status: 404 });
    }

    const fileName = (row.resume_name || `resume-${resumeId}.pdf`).replace(/[\r\n"]/g, '_');
    const mime = row.resume_mime || 'application/octet-stream';

    const body = new Uint8Array(row.resume_blob);
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'private, max-age=0, no-store',
      },
    });
  } catch (error) {
    console.error('Career resume download error:', error);
    return NextResponse.json({ success: false, message: 'Failed to download resume' }, { status: 500 });
  }
}
