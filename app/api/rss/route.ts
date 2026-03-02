import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch blogs from PHP API
    const response = await fetch('http://localhost/contact_api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'get_blogs' })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const blogs = data.blogs || [];

    // Generate RSS XML
    const rssXml = generateRSSXML(blogs);

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('RSS Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateRSSXML(blogs: any[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shankygroup.com';
  const currentDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shanky Group Blog</title>
    <description>Latest insights, news, and updates from Shanky Group</description>
    <link>${siteUrl}/blog</link>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()} Shanky Group</copyright>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <generator>Shanky Group Blog RSS Feed</generator>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    
    ${blogs.map(blog => `
    <item>
      <title><![CDATA[${escapeXml(blog.title)}]]></title>
      <description><![CDATA[${escapeXml(blog.excerpt || stripHtml(blog.content).substring(0, 300))}]]></description>
      <content:encoded><![CDATA[${blog.content}]]></content:encoded>
      <link>${siteUrl}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${blog.slug}</guid>
      <dc:creator><![CDATA[${escapeXml(blog.author_name || 'Shanky Group')}]]></dc:creator>
      <pubDate>${new Date(blog.published_at || blog.created_at).toUTCString()}</pubDate>
      ${blog.featured_image ? `<image>${escapeXml(blog.featured_image)}</image>` : ''}
      ${blog.category ? `<category><![CDATA[${escapeXml(blog.category)}]]></category>` : ''}
      ${blog.tags ? blog.tags.split(',').map((tag: string) => `<category><![CDATA[${escapeXml(tag.trim())}]]></category>`).join('') : ''}
    </item>`).join('')}
    
  </channel>
</rss>`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
