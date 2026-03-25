import type { Metadata } from 'next';
import { query } from '@/app/lib/db';
import { getSiteUrl } from '@/app/lib/site-url';

type BlogMetaRow = {
  title: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image: string | null;
};

type MetadataParams = {
  params: Promise<{ slug: string }> | { slug: string };
};

function normalizeImageUrl(imagePath: string | null, base: string): string | undefined {
  if (!imagePath) return undefined;
  const t = imagePath.trim();
  if (!t) return undefined;
  if (t.startsWith('http://') || t.startsWith('https://')) return t;
  return `${base}${t.startsWith('/') ? '' : '/'}${t}`;
}

export async function generateMetadata({ params }: MetadataParams): Promise<Metadata> {
  const resolved = await params;
  const slug = decodeURIComponent(resolved.slug || '');
  const base = getSiteUrl();

  if (!slug) {
    return {
      title: 'Blog',
      alternates: { canonical: '/blog' },
    };
  }

  try {
    const rows = await query<BlogMetaRow[]>(
      `SELECT title, excerpt, meta_title, meta_description, featured_image
       FROM blogs
       WHERE slug = ? AND status = 'published'
       LIMIT 1`,
      [slug]
    );

    const blog = rows[0];
    if (!blog) {
      return {
        title: 'Blog',
        alternates: { canonical: `/blog/${encodeURIComponent(slug)}` },
      };
    }

    const title = (blog.meta_title || blog.title || 'Blog').trim();
    const description = (
      blog.meta_description ||
      blog.excerpt ||
      'Read the latest article from Shanky Group.'
    ).trim();
    const imageUrl = normalizeImageUrl(blog.featured_image, base);
    const canonical = `/blog/${encodeURIComponent(slug)}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'article',
        images: imageUrl ? [{ url: imageUrl, alt: title }] : undefined,
      },
      twitter: {
        card: imageUrl ? 'summary_large_image' : 'summary',
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: 'Blog',
      alternates: { canonical: `/blog/${encodeURIComponent(slug)}` },
    };
  }
}

export default function BlogSlugLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
