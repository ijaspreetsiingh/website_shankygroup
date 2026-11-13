import { NextResponse } from 'next/server';
import { generateCaptchaChallenge } from '@/app/lib/security-challenge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const challenge = generateCaptchaChallenge();
    return NextResponse.json(
      {
        success: true,
        token: challenge.token,
        svg: challenge.svg,
        expiresAt: challenge.expiresAt,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Failed to generate captcha:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate security challenge' },
      { status: 500 }
    );
  }
}
