import { NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || '';
const phpApiUrl = (process.env.NEXT_PUBLIC_PHP_API_URL || 'http://localhost/contact_api.php').replace(/\/$/, '');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const body = new FormData();
    formData.forEach((value, key) => {
      if (value instanceof File) {
        body.append(key, value, value.name || 'resume');
      } else {
        body.append(key, String(value));
      }
    });

    if (backendUrl) {
      const res = await fetch(`${backendUrl}/api/career-applications`, { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(data || { message: 'Submission failed' }, { status: res.status });
      }
      return NextResponse.json(data);
    }

    // No Node backend: send to PHP (contact_api.php) – same DB so dashboard will show applications
    body.set('action', 'submit_career_application');
    const res = await fetch(phpApiUrl, { method: 'POST', body });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(data || { message: 'Submission failed' }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Career application API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
