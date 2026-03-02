'use client';

import { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Link from 'next/link';

export default function PhotoToExcelPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backendOk, setBackendOk] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dusre device (phone) se backend reachable hai ya nahi — ye check karo
  useEffect(() => {
    let cancelled = false;
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => { if (!cancelled && d?.ok) setBackendOk(true); })
      .catch(() => { if (!cancelled) setBackendOk(false); });
    return () => { cancelled = true; };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setSuccess(null);
    if (!file) {
      setImagePreview(null);
      setImageFile(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)');
      setImagePreview(null);
      setImageFile(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  // Resize/compress image so API body size is under control (avoid 500)
  const getResizedBase64 = (): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      if (!imagePreview || !imageFile) {
        reject(new Error('No image'));
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const maxW = 1200;
        const maxH = 1200;
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (w > maxW || h > maxH) {
          if (w > h) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          } else {
            w = Math.round((w * maxH) / h);
            h = maxH;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const base64 = imagePreview.split(',')[1];
          resolve({ base64: base64 || '', mimeType: imageFile.type || 'image/jpeg' });
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const mime = imageFile.type || 'image/jpeg';
        const q = mime === 'image/png' ? 0.85 : 0.82;
        try {
          const dataUrl = canvas.toDataURL(mime, q);
          const base64 = dataUrl.split(',')[1] || '';
          resolve({ base64, mimeType: mime });
        } catch {
          const base64 = imagePreview.split(',')[1];
          resolve({ base64: base64 || '', mimeType: mime });
        }
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = imagePreview;
    });
  };

  const handleExtractToExcel = async () => {
    if (!imageFile || !imagePreview) {
      setError('Pehle ek photo select karo');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { base64, mimeType } = await getResizedBase64();
      const res = await fetch('/api/photo-to-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      });
      const raw = await res.text();
      let data: { error?: string; rows?: string[][] };
      try {
        data = JSON.parse(raw);
      } catch {
        data = { error: res.ok ? 'Invalid response' : raw.slice(0, 300) || `Error ${res.status}` };
      }
      if (!res.ok) {
        setError(data.error || `Error ${res.status}`);
        return;
      }
      const { rows } = data as { rows: string[][] };
      if (!rows?.length) {
        setError('Koi table data nahi mila.');
        return;
      }
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const fileName = `table-${Date.now()}.xlsx`;
      XLSX.writeFile(wb, fileName);
      setSuccess(`Excel file "${fileName}" download ho gayi!`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const isNetworkErr = msg.includes('fetch') || msg.includes('Failed to fetch') || msg.includes('NetworkError');
      setError(
        isNetworkErr
          ? 'Backend tak pahunch nahi paye. Same WiFi check karo, PC pe "npm run dev" chal raha hai confirm karo.'
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline mb-6"
        >
          ← Home
        </Link>
        <h1 className="text-2xl font-bold mb-2">Photo se Excel</h1>
        <p className="text-[var(--text-secondary)] mb-6">
          Table wali photo upload karo — usme jo bhi rows/columns ka data hai, wo Excel file mein
          convert ho jayega.
        </p>

        <p className="text-sm text-[var(--text-secondary)] mb-4">
          <Link href="/image-and-gemini" className="text-[var(--accent)] hover:underline">
            Gemini wala page (Image + Gemini)
          </Link>
        </p>

        {backendOk === false && (
          <div className="mb-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm">
            Backend connect nahi ho paya. Same WiFi pe ho? PC pe <code className="bg-black/10 px-1 rounded">npm run dev</code> chal raha hai?
          </div>
        )}
        {backendOk === true && (
          <p className="mb-4 text-sm text-green-600 dark:text-green-400">✓ Backend connected</p>
        )}

        <div
          className="border-2 border-dashed border-[var(--card-border)] rounded-xl p-8 text-center bg-[var(--card-bg)]"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          {!imagePreview ? (
            <>
              <p className="text-[var(--text-secondary)] mb-2">
                Yahan click karke photo choose karo ya camera se click karo
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                JPG, PNG — table/ list wali image best kaam karegi
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg object-contain border border-[var(--card-border)]"
              />
              <p className="text-sm text-[var(--text-secondary)]">{imageFile?.name}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] hover:bg-[var(--card-border)] transition"
                >
                  Nayi photo
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleExtractToExcel(); }}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-60 transition"
                >
                  {loading ? 'Extract ho raha hai…' : 'Excel mein convert karo'}
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
