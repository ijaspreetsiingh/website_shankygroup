import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';

export const runtime = 'nodejs';

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || '';

type Blog = {
  id?: number;
  category?: string;
  featured_image?: string | null;
};

type BlogComment = {
  id: number;
  blog_id: number;
  name: string;
  email: string;
  content: string;
  status: string;
  created_at: string;
};

function resolveFeaturedImageUrl(featuredImage: string | null | undefined): string {
  if (!featuredImage || typeof featuredImage !== 'string') return featuredImage ?? '';
  const t = featuredImage.trim();
  if (!t || t.startsWith('http://') || t.startsWith('https://')) return featuredImage;
  return backendBase ? `${backendBase}${t.startsWith('/') ? '' : '/'}${t}` : featuredImage;
}

function withImageUrl<T extends Blog>(blogs: T[]): T[] {
  if (!backendBase || !blogs.length) return blogs;
  return blogs.map((blog) => ({
    ...blog,
    featured_image: resolveFeaturedImageUrl(blog.featured_image) || blog.featured_image,
  }));
}

async function getBlogs() {
  const blogs = await query<Blog[]>(
    `SELECT b.*, u.name as author_name
     FROM blogs b
     LEFT JOIN users u ON b.author_id = u.id
     WHERE b.status = 'published'
     ORDER BY b.published_at DESC, b.created_at DESC`
  );
  return NextResponse.json({ status: 'success', message: 'Blogs retrieved successfully', blogs: withImageUrl(blogs) });
}

export async function GET() {
  try {
    return await getBlogs();
  } catch (error) {
    console.error('Blogs GET API error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body?.action;

    if (action === 'get_blogs') {
      return await getBlogs();
    }

    if (action === 'get_blog_by_slug') {
      const slug = String(body?.slug || '').trim();
      if (!slug) return NextResponse.json({ status: 'error', message: 'Slug is required' }, { status: 400 });
      const rows = await query<Blog[]>(
        `SELECT b.*, u.name as author_name, u.email as author_email
         FROM blogs b
         LEFT JOIN users u ON b.author_id = u.id
         WHERE b.slug = ? AND b.status = 'published'
         LIMIT 1`,
        [slug]
      );
      if (!rows[0]) return NextResponse.json({ status: 'error', message: 'Blog not found' }, { status: 404 });
      const blog = withImageUrl(rows)[0];
      return NextResponse.json({ status: 'success', message: 'Blog retrieved successfully', blog });
    }

    if (action === 'get_related_blogs') {
      const slug = String(body?.slug || '').trim();
      if (!slug) return NextResponse.json({ status: 'error', message: 'Slug is required' }, { status: 400 });
      const current = await query<Array<{ category: string }>>(
        "SELECT category FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1",
        [slug]
      );
      if (!current[0]) return NextResponse.json({ status: 'error', message: 'Current blog not found' }, { status: 404 });
      const blogs = await query<Blog[]>(
        `SELECT b.*, u.name as author_name
         FROM blogs b
         LEFT JOIN users u ON b.author_id = u.id
         WHERE b.category = ? AND b.slug != ? AND b.status = 'published'
         ORDER BY b.published_at DESC
         LIMIT 3`,
        [current[0].category, slug]
      );
      return NextResponse.json({ status: 'success', message: 'Related blogs retrieved successfully', blogs: withImageUrl(blogs) });
    }

    if (action === 'get_blog_comments') {
      const slug = String(body?.slug || '').trim();
      if (!slug) return NextResponse.json({ status: 'error', message: 'Slug is required' }, { status: 400 });
      const blog = await query<Array<{ id: number }>>("SELECT id FROM blogs WHERE slug = ? LIMIT 1", [slug]);
      if (!blog[0]) return NextResponse.json({ status: 'error', message: 'Blog not found' }, { status: 404 });
      const comments = await query<BlogComment[]>(
        "SELECT * FROM blog_comments WHERE blog_id = ? AND status = 'approved' ORDER BY created_at DESC",
        [blog[0].id]
      );
      return NextResponse.json({ status: 'success', message: 'Comments retrieved successfully', comments });
    }

    if (action === 'add_comment') {
      const blogId = Number(body?.blog_id);
      const name = String(body?.name || '').trim();
      const email = String(body?.email || '').trim();
      const content = String(body?.content || '').trim();
      if (!blogId || !name || !email || !content) {
        return NextResponse.json({ status: 'error', message: 'Required fields missing' }, { status: 400 });
      }
      await execute(
        "INSERT INTO blog_comments (blog_id, name, email, content, status) VALUES (?, ?, ?, ?, 'approved')",
        [blogId, name, email, content]
      );
      return NextResponse.json({ status: 'success', message: 'Comment added successfully' });
    }

    if (action === 'increment_view') {
      const blogId = Number(body?.blog_id);
      if (!blogId) return NextResponse.json({ status: 'error', message: 'Blog ID is required' }, { status: 400 });
      await execute('UPDATE blogs SET view_count = view_count + 1 WHERE id = ?', [blogId]);
      return NextResponse.json({ status: 'success', message: 'View count incremented' });
    }

    return NextResponse.json({ status: 'error', message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Blogs POST API error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
