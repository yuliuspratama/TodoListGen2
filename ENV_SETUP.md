# Environment Variables Setup

## ✅ Status

File `.env.local` perlu dibuat dengan credentials Supabase Anda. 
Gunakan file `.env.example` sebagai template.

## 🔧 Setup Environment Variables

1. **Copy template file**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit file `.env.local`** dan isi dengan credentials Supabase Anda:
   - Dapatkan `NEXT_PUBLIC_SUPABASE_URL` dari Supabase Dashboard > Settings > API
   - Dapatkan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari Supabase Dashboard > Settings > API

## ⚠️ Penting

Jika error masih muncul:

1. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Pastikan file .env.local ada di root project**
   - Lokasi: `c:\project\TodoList\.env.local`
   - Tidak ada spasi di awal/akhir baris
   - **PENTING: TIDAK ADA tanda kutip** pada nilai environment variables

3. **Verifikasi isi file**
   ```bash
   type .env.local
   ```
   Pastikan formatnya benar (TANPA tanda kutip):
   ```env
   # ✅ BENAR (tanpa tanda kutip)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```
   ```env
   # ❌ SALAH (dengan tanda kutip - akan menyebabkan error!)
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
   ```
   **⚠️ JANGAN commit file `.env.local` ke repository!**

4. **Clear Next.js Cache** (jika masih error)
   ```bash
   rm -rf .next
   npm run dev
   ```
   Atau di Windows:
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

## 📝 Catatan

- File `.env.local` ada di `.gitignore` sehingga tidak akan di-commit ke git
- **JANGAN** commit file `.env.local` atau hardcode credentials di kode
- Untuk production, gunakan environment variables yang aman
- File `.env.example` adalah template yang aman untuk di-commit

