# Konfigurasi Vercel Deployment

## 🚀 Environment Variables di Vercel

Untuk aplikasi yang di-deploy di Vercel, environment variables perlu dikonfigurasi di **Vercel Dashboard**:

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project Anda (`todo-list-gen2`)
3. Pergi ke **Settings > Environment Variables**
4. Tambahkan environment variables berikut:

### Environment Variables yang Diperlukan:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://todo-list-gen2.vercel.app
```

**⚠️ PENTING**: Pastikan `NEXT_PUBLIC_SITE_URL` di-set dengan URL production Anda (`https://todo-list-gen2.vercel.app`)

5. Pilih environment: **Production**, **Preview**, dan **Development**
6. Klik **Save**
7. **Redeploy** aplikasi agar perubahan environment variable berlaku

## 🔐 Konfigurasi Supabase Dashboard

Agar fitur reset password bekerja dengan benar di production:

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **Authentication > URL Configuration**
4. Di bagian **Redirect URLs**, tambahkan URL berikut:
   - **Production**: `https://todo-list-gen2.vercel.app/reset-password`
   - **Development** (opsional): `http://localhost:3000/reset-password`
5. Klik **Save**

**⚠️ PENTING**: 
- Pastikan URL `https://todo-list-gen2.vercel.app/reset-password` sudah ditambahkan
- Tanpa konfigurasi ini, link reset password akan menggunakan hash fragment yang tidak akan di-redirect dengan benar

## ✅ Verifikasi

Setelah konfigurasi selesai:

1. **Redeploy aplikasi di Vercel** agar environment variables baru diterapkan
2. Test fitur "Lupa Password":
   - Buka `https://todo-list-gen2.vercel.app/login`
   - Klik "Lupa password?"
   - Masukkan email
   - Cek email yang masuk
   - Link reset password seharusnya mengarah ke `https://todo-list-gen2.vercel.app/reset-password` (bukan hash fragment)

## 🔄 Redeploy di Vercel

Setelah mengubah environment variables:

1. Buka Vercel Dashboard > Project Anda
2. Pergi ke tab **Deployments**
3. Klik **⋮** (tiga titik) pada deployment terbaru
4. Pilih **Redeploy**
5. Atau buat commit baru dan push ke repository (akan trigger auto-deploy)

