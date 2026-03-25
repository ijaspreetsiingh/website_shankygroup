import type { MetadataRoute } from 'next';
import { getSiteUrl } from './lib/site-url';

const STATIC_PATHS: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/company', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/vendor', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/who-we-are/about-us', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/who-we-are/mission-vision', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/who-we-are/leadership', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/who-we-are/compliance', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/company/shanky-financial-pvt-ltd', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/company/vms-hub', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/company/shanky-corporate-training', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/company/shanky-smart-tech', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/company/shanky-buildtech-pvt-ltd', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/company/shanky-metals-pvt-ltd', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/company/shanky-financial-services', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/company/shanky-electronics-hub', changeFrequency: 'monthly', priority: 0.7 },
];

async function publishedBlogEntries(base: string): Promise<MetadataRoute.Sitemap> {
  try {
    const { query } = await import('@/app/lib/db');
    const rows = await query<Array<{ slug: string; updated_at: string | Date | null }>>(
      'SELECT slug, updated_at FROM blogs WHERE status = ?',
      ['published']
    );
    return rows.map((row) => ({
      url: `${base}/blog/${encodeURIComponent(row.slug)}`,
      lastModified: row.updated_at ? new Date(row.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogEntries = await publishedBlogEntries(base);

  return [...staticEntries, ...blogEntries];
}
