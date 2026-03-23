import { NextResponse } from 'next/server';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
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
    const resume = formData.get('resume');
    if (resume instanceof File && resume.size > 0) {
      const ext = (resume.name.split('.').pop() || '').toLowerCase();
      const allowed = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif']);
      if (!allowed.has(ext)) {
        return NextResponse.json({ status: 'error', message: 'Resume: PDF, DOC, DOCX or image only' }, { status: 400 });
      }
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'career-resumes');
      await mkdir(uploadDir, { recursive: true });
      const safeName = resume.name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(-60) || `resume.${ext || 'pdf'}`;
      const fileName = `${Date.now()}_${safeName}`;
      const absFilePath = path.join(uploadDir, fileName);
      const arrayBuffer = await resume.arrayBuffer();
      await writeFile(absFilePath, Buffer.from(arrayBuffer));
      resumePath = `/uploads/career-resumes/${fileName}`;
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    await execute(
      `INSERT INTO career_applications (name, email, phone, position, experience, message, resume_path)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, position, experience || null, message || null, resumePath]
    );

    return NextResponse.json({ status: 'success', message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Career application API error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
