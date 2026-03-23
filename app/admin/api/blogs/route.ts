import { NextResponse } from 'next/server';
import { safeRows, handlePost, handlePut, handleDelete } from '../_utils';

export const runtime = 'nodejs';

type BlogRow = {
  id: number;
  title: string | null;
  slug: string | null;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  author_id: number | null;
  author_name: string | null;
  author_email: string | null;
  category: string | null;
  tags: string | null;
  status: string | null;
  is_featured: boolean | null;
  view_count: number | null;
  reading_time: number | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let whereClause = '';
  const params: any[] = [];
  
  if (status) {
    whereClause += ' WHERE b.status = ?';
    params.push(status);
  }
  if (category) {
    whereClause += whereClause ? ' AND b.category = ?' : ' WHERE b.category = ?';
    params.push(category);
  }
  if (search) {
    whereClause += whereClause ? ' AND (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)' : ' WHERE (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }
  
  const rows = await safeRows<BlogRow>(
    `SELECT b.*, u.name as author_name, u.email as author_email 
     FROM blogs b 
     LEFT JOIN users u ON b.author_id = u.id
     ${whereClause}
     ORDER BY b.created_at DESC
     LIMIT 200`,
    params
  );
  return NextResponse.json({ blogs: rows });
}

export async function POST(req: Request) { 
  const body = await req.json();
  
  // Generate slug from title
  const slug = body.title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || '';

  // Calculate reading time
  const wordsPerMinute = 200;
  const words = body.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const reading_time = Math.ceil(words / wordsPerMinute);

  // Set published_at if status is published
  const published_at = body.status === 'published' ? new Date().toISOString().slice(0, 19).replace('T', ' ') : null;
  
  const enhancedBody = {
    ...body,
    slug,
    reading_time,
    published_at,
    author_id: 1 // Placeholder - should come from auth token
  };
  
  return handlePost(new Request(req.url, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(enhancedBody)
  }), 'blogs'); 
}

export async function PUT(req: Request) { 
  const body = await req.json();
  
  // Generate slug if title changed
  if (body.title) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Calculate reading time if content changed
  if (body.content && !body.reading_time) {
    const wordsPerMinute = 200;
    const words = body.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    body.reading_time = Math.ceil(words / wordsPerMinute);
  }

  // Set published_at if status changed to published
  if (body.status === 'published') {
    body.published_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
  
  return handlePut(new Request(req.url, {
    method: 'PUT',
    headers: req.headers,
    body: JSON.stringify(body)
  }), 'blogs'); 
}

export async function DELETE(req: Request) { return handleDelete(req, 'blogs'); }
