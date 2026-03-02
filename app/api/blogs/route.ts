import { NextResponse } from 'next/server';

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || '';

function resolveFeaturedImageUrl(featuredImage: string | null | undefined): string {
  if (!featuredImage || typeof featuredImage !== 'string') return featuredImage ?? '';
  const t = featuredImage.trim();
  if (!t || t.startsWith('http://') || t.startsWith('https://')) return featuredImage;
  return backendBase ? `${backendBase}${t.startsWith('/') ? '' : '/'}${t}` : featuredImage;
}

export async function GET() {
  try {
    const response = await fetch('http://localhost/contact_api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_blogs' })
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const blogs = Array.isArray(data.blogs) ? data.blogs : [];

    if (backendBase && blogs.length) {
      data.blogs = blogs.map((blog: { featured_image?: string }) => ({
        ...blog,
        featured_image: resolveFeaturedImageUrl(blog.featured_image) || blog.featured_image
      }));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Call PHP API with the action from the request body
    const response = await fetch('http://localhost/contact_api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to process request' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
