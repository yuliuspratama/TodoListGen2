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
   - **Tambahkan `NEXT_PUBLIC_SITE_URL`** dengan URL deployment Anda (untuk fitur reset password)
     - Development: `http://localhost:3000`
     - Production: URL deployment Anda (misalnya: `https://your-domain.com`)

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
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   
   **Untuk Production**, ganti `NEXT_PUBLIC_SITE_URL` dengan URL deployment Anda:
   ```env
   NEXT_PUBLIC_SITE_URL=https://todo-list-gen2.vercel.app
   ```
   
   **⚠️ PENTING untuk Vercel**: Jika aplikasi Anda di-deploy di Vercel, Anda **HARUS** menambahkan environment variables di Vercel Dashboard juga:
   - Buka Vercel Dashboard > Settings > Environment Variables
   - Tambahkan `NEXT_PUBLIC_SITE_URL=https://todo-list-gen2.vercel.app`
   - Redeploy aplikasi agar perubahan berlaku
   - Lihat file `VERCEL_DEPLOYMENT.md` untuk instruksi lengkap
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

## 🔐 Konfigurasi Supabase Dashboard (Untuk Reset Password)

Agar fitur reset password bekerja dengan benar, **WAJIB** konfigurasi URL redirect di Supabase Dashboard:

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **Authentication > URL Configuration**
4. Di bagian **Redirect URLs**, tambahkan URL berikut:
   - Development: `http://localhost:3000/reset-password`
   - Production: `https://todo-list-gen2.vercel.app/reset-password`
5. Klik **Save**

**⚠️ PENTING**: Jika URL tidak dikonfigurasi di Supabase Dashboard, link reset password akan menggunakan hash fragment (`#access_token=...`) yang tidak akan di-redirect dengan benar.

## 📝 Catatan

- File `.env.local` ada di `.gitignore` sehingga tidak akan di-commit ke git
- **JANGAN** commit file `.env.local` atau hardcode credentials di kode
- Untuk production, gunakan environment variables yang aman
- File `.env.example` adalah template yang aman untuk di-commit
- Pastikan URL di `NEXT_PUBLIC_SITE_URL` sama dengan yang dikonfigurasi di Supabase Dashboard

