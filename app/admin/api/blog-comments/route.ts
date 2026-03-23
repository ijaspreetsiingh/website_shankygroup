import { NextResponse } from 'next/server';
import { safeRows, handlePost, handlePut, handleDelete } from '../_utils';

export const runtime = 'nodejs';

type BlogCommentRow = {
  id: number;
  blog_id: number | null;
  name: string | null;
  email: string | null;
  content: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  blog_title?: string | null;
  blog_slug?: string | null;
};

export async function GET() {
  const rows = await safeRows<BlogCommentRow>(
    `SELECT c.*, b.title as blog_title, b.slug as blog_slug 
     FROM blog_comments c 
     LEFT JOIN blogs b ON c.blog_id = b.id
     ORDER BY c.created_at DESC
     LIMIT 200`
  );
  
  // Calculate stats
  const stats = {
    totalComments: rows.length,
    pendingComments: rows.filter(c => c.status === 'pending').length,
    approvedComments: rows.filter(c => c.status === 'approved').length,
    rejectedComments: rows.filter(c => c.status === 'rejected').length
  };
  
  return NextResponse.json({ comments: rows, stats });
}

export async function POST(req: Request) { 
  return handlePost(req, 'blog_comments'); 
}

export async function PUT(req: Request) { 
  return handlePut(req, 'blog_comments'); 
}

export async function DELETE(req: Request) { 
  return handleDelete(req, 'blog_comments'); 
}
