import { NextResponse } from 'next/server';

// Sirf contact_api.php se jobs – wahi DB use karo (shankygroup)
const phpApiUrl = (process.env.NEXT_PUBLIC_PHP_API_URL || 'http://localhost/contact_api.php').replace(/\/$/, '');

export async function GET() {
  const urls = [phpApiUrl];
  if (phpApiUrl.includes('localhost')) {
    urls.push(phpApiUrl.replace('localhost', '127.0.0.1'));
  }
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_jobs' }),
        cache: 'no-store'
      });
      const text = await res.text();
      if (!res.ok) continue;
      const data = JSON.parse(text);
      const jobs = Array.isArray(data?.jobs) ? data.jobs : [];
      return NextResponse.json({ status: 'success', jobs });
    } catch {
      continue;
    }
  }
  return NextResponse.json({ status: 'success', jobs: [] });
}
