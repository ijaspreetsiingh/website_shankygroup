# Vercel par Deploy kaise karein

## Pehle samajh lo: Build kahan chalegi?

| Tum kya karte ho | Build kahan chalegi |
|------------------|---------------------|
| **Vercel pe deploy** | **Vercel ke servers pe** – tumhe locally `npm run build` chalane ki zaroorat **nahi**. Bas code GitHub pe push karo, Vercel par "Deploy" click karo – Vercel khud `npm install` + `npm run build` chala lega. |
| **Local test** (check karna ki build pass ho rahi hai) | **Apne PC pe** – project folder mein terminal kholo, `npm run build` chalao. |

**Summary:** Vercel pe dalne ke liye sirf **code push + Deploy** karo. Build Vercel pe hi chalegi.

---

## Step 1: Code GitHub par push karein

Agar abhi nahi kiya:

```bash
git add .
git commit -m "Ready for Vercel"
git push origin main
```

## Step 2: Vercel par project add karein

1. **https://vercel.com** par jao (login/signup – GitHub se sign in kar sakte ho)
2. **"Add New..." → "Project"** par click karo
3. **"Import Git Repository"** se apna **shankygroup** repo select karo
4. **"Import"** par click karo

## Step 3: Build settings (auto ho jayega)

Vercel Next.js ko khud detect kar leta hai. Ye already set ho chuka hai:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** (Next.js default – change mat karo)
- **Install Command:** `npm install`

Kuch change karna ho to **"Override"** se kar sakte ho.

## Step 4: Environment Variables (agar chahiye)

Agar app mein `.env` / API keys use karte ho:

- Project settings → **Settings → Environment Variables**
- Name aur Value add karo (e.g. `NEXT_PUBLIC_API_URL`, etc.)
- **Save** karo

## Step 5: Deploy

- **"Deploy"** par click karo
- 1–2 minute mein build complete hoga
- Live URL milega jaise: `https://shankygroup-xxx.vercel.app`

## Baad mein updates

Jab bhi `git push` karoge (main branch par), Vercel automatically nayi deploy kar dega (Preview + Production).

---

**India region:** `vercel.json` mein `"regions": ["bom1"]` hai – Mumbai server use hoga, fast response India ke liye.
