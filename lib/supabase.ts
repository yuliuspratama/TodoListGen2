import { createClient } from '@supabase/supabase-js'

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Environment variables tidak ditemukan!')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Ada' : '❌ Kosong')
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Ada' : '❌ Kosong')
  console.error('\n📝 Solusi:')
  console.error('   1. Pastikan file .env.local ada di root project')
  console.error('   2. Isi dengan format (TANPA tanda kutip):')
  console.error('      NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co')
  console.error('      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key')
  console.error('   3. Restart development server')
  console.error('   4. Hapus cache: rm -rf .next (Linux/Mac) atau Remove-Item -Recurse -Force .next (Windows)')
  
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

