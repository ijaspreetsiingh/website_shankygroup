import { NextResponse } from 'next/server';
import { execute } from '@/app/lib/db';

export const runtime = 'nodejs';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const title = String(body?.title || '').trim();
    if (!title) return NextResponse.json({ message: 'Title is required' }, { status: 400 });

    await execute(
      `UPDATE jobs
       SET title = ?, description = ?, location = ?, job_type = ?, department = ?, requirements = ?, status = ?
       WHERE id = ?`,
      [
        title,
        String(body?.description || '').trim() || null,
        String(body?.location || '').trim() || null,
        String(body?.job_type || '').trim() || null,
        String(body?.department || '').trim() || null,
        String(body?.requirements || '').trim() || null,
        String(body?.status || 'draft').trim(),
        Number(id),
      ]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await execute('DELETE FROM jobs WHERE id = ?', [Number(id)]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Failed to delete job' }, { status: 500 });
  }
}
