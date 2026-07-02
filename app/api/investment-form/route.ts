import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    console.log('Sending to Google Apps Script:', formData);

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyBpb-efEa13r4-3718cu6gydoFsas-0yLCP5fNRdJ7_xpr-yUk3-36leDJJXclpPg/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const text = await response.text();
    console.log('Google Apps Script response:', text);

    let googleResult;
    try {
      googleResult = JSON.parse(text);
    } catch (e) {
      googleResult = { rawResponse: text };
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      googleResponse: googleResult 
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
