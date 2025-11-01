# Quick Start Guide

## ✅ Status Setup

- ✅ Environment variables sudah dikonfigurasi (.env.local)
- ⚠️ **PENTING: Database perlu di-setup di Supabase Dashboard**

## 🚀 Langkah Cepat

### 1. Setup Database di Supabase

1. Buka: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **SQL Editor** di sidebar kiri
4. Klik **New query**
5. Copy **semua isi** file `supabase/migrations/001_create_todos_table.sql`
6. Paste ke SQL Editor
7. Klik **Run** (atau Ctrl+Enter)
8. Pastikan muncul pesan sukses

### 2. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser: **http://localhost:3000**

### 3. Test Aplikasi

1. Daftar akun baru di halaman `/register`
2. Atau login jika sudah punya akun di `/login`
3. Buat todo pertama Anda!

## 🔧 Troubleshooting

**Error: Table "todos" tidak ditemukan**
- Pastikan SQL migration sudah dijalankan di Supabase Dashboard

**Error: Permission denied / RLS policy**
- Pastikan semua policies sudah dibuat dengan benar
- Cek di Supabase Dashboard > Authentication > Policies

**Error: Authentication failed**
- Pastikan Email provider sudah enabled di Supabase Dashboard > Authentication > Providers

## 📝 Catatan

- Verifikasi email bisa di-disable untuk testing di: Authentication > Settings > Email Auth
- Semua data akan tersimpan di Supabase database
- Setiap user hanya bisa melihat dan mengelola todos mereka sendiri (RLS)

