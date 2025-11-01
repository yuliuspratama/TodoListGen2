# Todo List App dengan Supabase

Aplikasi TODO list modern yang dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan Supabase sebagai backend database serta autentikasi.

## Fitur

- ✅ **Authentication**: Login dan registrasi dengan Supabase Auth
- ✅ **CRUD Operations**: Create, Read, Update, Delete todos
- ✅ **Filter & Sorting**: Filter berdasarkan status, prioritas, kategori, dan pencarian. Sorting berdasarkan tanggal, prioritas, dan alfabet
- ✅ **Rich Todo Fields**: Title, description, priority (low/medium/high), category, dan deadline
- ✅ **Priority System**: Visual indicator untuk prioritas tinggi, sedang, dan rendah
- ✅ **Deadline Management**: Deadline dengan warning untuk todo yang terlambat
- ✅ **Responsive Design**: Mobile-friendly dengan Tailwind CSS
- ✅ **Real-time Updates**: Auto-refresh menggunakan Supabase subscriptions

## Tech Stack

- **Frontend**: Next.js 14 (App Router) dengan TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **State Management**: React Hooks

## Setup

### 1. Clone dan Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Dapatkan URL dan Anon Key dari Settings > API
3. Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Setup Database

Jalankan SQL berikut di Supabase SQL Editor untuk membuat table `todos`:

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

### 4. Setup Authentication

Di Supabase Dashboard:
1. Buka Authentication > Providers
2. Pastikan Email provider sudah enabled
3. (Opsional) Konfigurasi email templates untuk verifikasi email

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Project

```
TodoList/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard utama
│   ├── login/              # Halaman login
│   └── register/           # Halaman registrasi
├── components/
│   ├── AuthForm.tsx        # Form authentication
│   ├── TodoList.tsx        # Komponen daftar todos
│   ├── TodoItem.tsx        # Item todo individual
│   ├── TodoForm.tsx        # Form create/edit todo
│   └── TodoFilter.tsx      # Filter & sorting
├── hooks/
│   ├── useAuth.ts          # Hook untuk authentication
│   └── useTodos.ts         # Hook untuk CRUD operations
└── lib/
    ├── supabase.ts         # Supabase client
    └── types.ts            # TypeScript types
```

## Fitur Detail

### Filter & Sorting

- **Status**: Semua, Aktif, Selesai
- **Prioritas**: Semua, Tinggi, Sedang, Rendah
- **Kategori**: Semua atau kategori tertentu
- **Pencarian**: Cari berdasarkan judul atau deskripsi
- **Sorting**: Terbaru, Terlama, Deadline, Prioritas, Alfabet

### Todo Fields

- **Title**: Wajib diisi
- **Description**: Opsional
- **Priority**: Low, Medium, High (default: Medium)
- **Category**: Opsional (contoh: Kerja, Pribadi)
- **Deadline**: Opsional, dengan warning jika terlambat

## Production Build

```bash
npm run build
npm start
```

## License

ISC

