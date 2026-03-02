# Shanky Group — Vercel pe Live Kaise Karein

## 1. Build check (pehle local pe verify karo)

```bash
npm install
npm run build
```

Agar build error aaye to pehle fix karo.

---

## 2. Vercel pe deploy karna

### Option A: Vercel CLI se (terminal se)

1. **Vercel CLI install karo:**
   ```bash
   npm i -g vercel
   ```

2. **Login karo:**
   ```bash
   vercel login
   ```
   Browser khulega, GitHub/Email se login karo.

3. **Project folder mein jao aur deploy karo:**
   ```bash
   cd c:\Users\ijasp\OneDrive\Desktop\shankygroup
   vercel
   ```
   - Pehli baar: "Set up and deploy?" → **Y** (Yes)
   - "Which scope?" → apna account choose karo
   - "Link to existing project?" → **N** (No)
   - Project name → **shankygroup** (ya jo naam chaho)
   - Directory → **./** (current folder)
   - Override settings? → **N**

4. **Live production deploy:**
   ```bash
   vercel --prod
   ```
   Deploy ke baad tumhe ek URL milega jaise: `https://shankygroup.vercel.app`

---

### Option B: Vercel Website se (bina CLI)

1. **https://vercel.com** pe jao → **Sign Up** / **Login** (GitHub se best hai).

2. **"Add New Project"** pe click karo.

3. **GitHub repo connect karo:**
   - Pehle project ko GitHub pe push karo:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/shankygroup.git
     git push -u origin main
     ```
   - Vercel dashboard pe "Import Git Repository" → apna repo select karo.

4. **Ya "Import" se upload karo:**  
   "Import" → "Browse" se `shankygroup` folder select karo (zip bana ke bhi upload kar sakte ho, but Git better hai).

5. **Environment Variables add karo (bahut important):**  
   Project settings → **Settings** → **Environment Variables**  
   Ye add karo (values apni .env.local se copy karo):

   | Name              | Value        | Environment |
   |-------------------|-------------|-------------|
   | GEMINI_API_KEY    | (tumhari key) | Production, Preview |
   | OPENROUTER_API_KEY| (tumhari key) | Production, Preview |
   | GROQ_API_KEY      | (tumhari key) | Production, Preview |
   | USE_CHATBOT_1     | true        | Production, Preview |
   | USE_CHATBOT_2     | true        | Production, Preview |
   | USE_CHATBOT_3     | true        | Production, Preview |

6. **Deploy** pe click karo. Build complete hone ke baad live URL mil jayega.

---

## 3. Important baatein

- **API keys:** `.env.local` sirf local ke liye hai. Vercel pe **Settings → Environment Variables** mein daalni zaroori hain, warna Gemini/OpenRouter/GROQ APIs kaam nahi karengi.
- **Git:** Agar GitHub connect kiya hai to har `git push` pe automatic redeploy ho sakta hai (Vercel default).
- **Custom domain:** Vercel project → Settings → Domains se apna domain add kar sakte ho.

---

## 4. Build file / config

- **Build command:** `npm run build` (already `package.json` mein hai)
- **Vercel config:** `vercel.json` — framework `nextjs` set hai, Vercel automatically `next build` use karega

Koi step fail ho to error message bhejna, fix bata denge.
