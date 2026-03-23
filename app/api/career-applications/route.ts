import { NextResponse } from 'next/server';
import { execute } from '@/app/lib/db';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const position = String(formData.get('position') || '').trim();
    const experience = String(formData.get('experience') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !position) {
      return NextResponse.json({ status: 'error', message: 'Name, email and position are required' }, { status: 400 });
    }

    let resumePath: string | null = null;
    let resumeName: string | null = null;
    let resumeMime: string | null = null;
    let resumeBlob: Buffer | null = null;
    const resume = formData.get('resume');
    if (resume instanceof File && resume.size > 0) {
      const ext = (resume.name.split('.').pop() || '').toLowerCase();
      const allowed = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif']);
      if (!allowed.has(ext)) {
        return NextResponse.json({ status: 'error', message: 'Resume: PDF, DOC, DOCX or image only' }, { status: 400 });
      }
      const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120) || `resume.${ext || 'pdf'}`;
      const arrayBuffer = await resume.arrayBuffer();
      resumeBlob = Buffer.from(arrayBuffer);
      resumeName = safeName;
      resumeMime = resume.type || 'application/octet-stream';
    }

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

    await execute(
      `INSERT INTO career_applications (name, email, phone, position, experience, message, resume_path, resume_name, resume_mime, resume_blob)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, position, experience || null, message || null, resumePath, resumeName, resumeMime, resumeBlob]
    );

    return NextResponse.json({ status: 'success', message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Career application API error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
