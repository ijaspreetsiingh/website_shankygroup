import type { MetadataRoute } from 'next';
import { getSiteUrl } from './lib/site-url';

const STATIC_PATHS: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/blog', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/careers', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/contact', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about-us', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/leadership', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/mission-vision', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/vendor', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/who-we-are', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/who-we-are/about-us', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/who-we-are/mission-vision', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/who-we-are/leadership', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/who-we-are/compliance', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/shanky-financial-pvt-ltd', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/vms-hub', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/shanky-corporate-training', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/shanky-smart-tech', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/shanky-buildtech-pvt-ltd', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/shanky-metals-pvt-ltd', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/shanky-financial-services', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company/shanky-electronics-hub', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/company-turnover', changeFrequency: 'daily', priority: 1.0 },
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
