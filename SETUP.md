# Setup Instruksi

## ✅ Langkah 1: Environment Variables

1. Buat file `.env.local` di root project (gunakan `.env.example` sebagai template)
2. Isi dengan credentials Supabase Anda:
   - Dapatkan `NEXT_PUBLIC_SUPABASE_URL` dari Supabase Dashboard > Settings > API
   - Dapatkan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari Supabase Dashboard > Settings > API

## ⚠️ Langkah 2: Setup Database (PENTING!)

Anda perlu menjalankan SQL migration di Supabase Dashboard:

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **SQL Editor**
4. Copy paste semua isi dari file `supabase/migrations/001_create_todos_table.sql`
5. Klik **Run** untuk menjalankan migration

**Atau langsung copy SQL berikut:**

```sql
-- Create todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium' NOT NULL,
  category TEXT,
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own todos
CREATE POLICY "Users can view own todos"
  ON todos FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert own todos
CREATE POLICY "Users can insert own todos"
  ON todos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update own todos
CREATE POLICY "Users can update own todos"
  ON todos FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy: Users can delete own todos
CREATE POLICY "Users can delete own todos"
  ON todos FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON todos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## ✅ Langkah 3: Jalankan Aplikasi

Setelah database setup selesai, jalankan:

```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000

## Catatan

- Pastikan Authentication di Supabase sudah enabled untuk Email provider
- Verifikasi email bisa di-disable untuk testing di Authentication > Settings
- Jika ada error, pastikan RLS policies sudah dibuat dengan benar

