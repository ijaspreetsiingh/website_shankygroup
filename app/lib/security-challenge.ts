import crypto from 'crypto';

// Secret key for HMAC signing
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || process.env.NEXTAUTH_SECRET || 'shanky-group-secure-math-salt-2026';

// Cache for single-use token replay prevention (expires in 15 minutes)
const usedTokens = new Map<string, number>();

// Clean up expired used tokens every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, timestamp] of usedTokens.entries()) {
    if (now - timestamp > 15 * 60 * 1000) {
      usedTokens.delete(token);
    }
  }
}, 5 * 60 * 1000);

export interface CaptchaChallenge {
  token: string;
  svg: string;
  expiresAt: number;
}

/**
 * Generate a random math problem with numbers between 1 and 10 (+ or -),
 * formatted as an anti-bot distorted SVG graphic with HMAC signed token.
 */
export function generateCaptchaChallenge(): CaptchaChallenge {
  // Generate numbers between 1 and 10
  const isAddition = Math.random() > 0.45; // slightly favor addition for ease
  const operator = isAddition ? '+' : '-';
  
  let num1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
  let num2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
  
  // Ensure subtraction doesn't result in negative numbers (easy for humans)
  if (!isAddition && num1 < num2) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }
  
  const answer = isAddition ? (num1 + num2) : (num1 - num2);
  const timestamp = Date.now();
  const salt = crypto.randomBytes(4).toString('hex');
  
  // Create secure HMAC signature of answer + timestamp + salt
  const hmac = crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(`${answer}:${timestamp}:${salt}`)
    .digest('hex');
    
  const token = `${timestamp}.${salt}.${hmac}`;
  
  // Generate distorted SVG image
  const svg = createDistortedSvg(num1, operator, num2);
  
  return {
    token,
    svg,
    expiresAt: timestamp + 10 * 60 * 1000, // 10 minutes
  };
}

/**
 * Creates an obfuscated SVG image of the math problem
 * using random rotations, overlapping noise curves, dots, and varied fonts.
 */
function createDistortedSvg(num1: number, operator: string, num2: number): string {
  const width = 180;
  const height = 48;
  
  const characters = [
    String(num1),
    operator,
    String(num2),
    '=',
    '?'
  ];
  
  const fontFamilies = [
    'Arial, sans-serif',
    'Verdana, sans-serif',
    'Trebuchet MS, sans-serif',
    'Georgia, serif',
    'Courier New, monospace'
  ];
  
  const vibrantColors = [
    '#ffffff',
    '#facc15', // amber
    '#38bdf8', // sky
    '#4ade80', // green
    '#f472b6', // pink
    '#fb923c', // orange
    '#a78bfa'  // purple
  ];

  // Random noise lines across the image
  let noiseLines = '';
  for (let i = 0; i < 5; i++) {
    const x1 = Math.floor(Math.random() * 20);
    const y1 = Math.floor(Math.random() * height);
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const x2 = Math.floor(width - Math.random() * 20);
    const y2 = Math.floor(Math.random() * height);
    const strokeColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    const opacity = (0.25 + Math.random() * 0.35).toFixed(2);
    const strokeWidth = (1.2 + Math.random() * 1.3).toFixed(1);
    
    noiseLines += `<path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}" />`;
  }
  
  // Random noise dots
  let noiseDots = '';
  for (let i = 0; i < 28; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const r = (1 + Math.random() * 1.5).toFixed(1);
    const fill = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    const opacity = (0.2 + Math.random() * 0.4).toFixed(2);
    noiseDots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}" />`;
  }
  
  // Render each character with random rotation, jitter and font
  let charElements = '';
  const totalSlots = characters.length;
  const slotWidth = width / (totalSlots + 0.6);
  
  characters.forEach((char, index) => {
    const x = Math.floor(slotWidth * (index + 0.5) + (Math.random() * 6 - 3));
    const y = Math.floor(height / 2 + 7 + (Math.random() * 6 - 3));
    const rotation = Math.floor(Math.random() * 24 - 12); // -12 to +12 deg
    const font = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
    const color = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    const fontSize = char === '=' || char === '?' ? 22 : 25 + Math.floor(Math.random() * 4);
    
    charElements += `
      <text
        x="${x}"
        y="${y}"
        font-family="${font}"
        font-size="${fontSize}px"
        font-weight="bold"
        fill="${color}"
        text-anchor="middle"
        transform="rotate(${rotation}, ${x}, ${y})"
        style="user-select: none; pointer-events: none;"
      >${char}</text>
    `;
  });
  
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181b" />
          <stop offset="100%" stop-color="#27272a" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" rx="10" fill="url(#bgGrad)" stroke="#3f3f46" stroke-width="1" />
      ${noiseLines}
      ${noiseDots}
      ${charElements}
    </svg>
  `.trim();
  
  const base64 = Buffer.from(svgContent).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Verify user answer against the HMAC token.
 */
export function verifyCaptchaChallenge(
  token: string | undefined | null,
  userAnswer: string | number | undefined | null
): { valid: boolean; message?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false, message: 'Security verification required. Please solve the calculation.' };
  }
  
  if (userAnswer === undefined || userAnswer === null || String(userAnswer).trim() === '') {
    return { valid: false, message: 'Please enter the answer to the security calculation.' };
  }
  
  const parsedAnswer = parseInt(String(userAnswer).trim(), 10);
  if (isNaN(parsedAnswer)) {
    return { valid: false, message: 'Invalid answer. Please enter a valid number.' };
  }
  
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, message: 'Invalid security token format. Please reload the captcha.' };
  }
  
  const [timestampStr, salt, hash] = parts;
  const timestamp = parseInt(timestampStr, 10);
  
  if (isNaN(timestamp)) {
    return { valid: false, message: 'Corrupted security token timestamp.' };
  }
  
  const now = Date.now();
  
  // Check if token expired (10 minutes)
  if (now - timestamp > 10 * 60 * 1000) {
    return { valid: false, message: 'Security verification expired. Please solve the new calculation.' };
  }
  
  // Check for future timestamp spoofing
  if (timestamp > now + 60 * 1000) {
    return { valid: false, message: 'Invalid security timestamp.' };
  }
  
  // Check if token was already used (replay attack prevention)
  if (usedTokens.has(token)) {
    return { valid: false, message: 'This security verification was already used. Please solve the new one.' };
  }
  
  // Calculate expected HMAC
  const expectedHash = crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(`${parsedAnswer}:${timestamp}:${salt}`)
    .digest('hex');
    
  // Secure timing comparison
  const hashBuf = Buffer.from(hash, 'hex');
  const expectedBuf = Buffer.from(expectedHash, 'hex');
  
  if (hashBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(hashBuf, expectedBuf)) {
    return { valid: false, message: 'Incorrect security answer. Please solve the calculation again.' };
  }
  
  // Mark token as used
  usedTokens.set(token, now);
  
  return { valid: true };
}
