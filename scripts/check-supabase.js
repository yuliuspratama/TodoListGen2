/**
 * Script untuk mengecek koneksi ke Supabase
 * Jalankan dengan: node scripts/check-supabase.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env.local file manually (no dotenv dependency)
const envPath = path.join(__dirname, '..', '.env.local')
let supabaseUrl, supabaseKey

try {
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envLines = envContent.split('\n')
  
  for (const line of envLines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim()
        if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
          supabaseUrl = value
        } else if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
          supabaseKey = value
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Error membaca file .env.local:', error.message)
  process.exit(1)
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Environment variables tidak ditemukan!')
  console.error('Pastikan file .env.local sudah ada dan berisi:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL=...')
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY=...')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkConnection() {
  console.log('🔍 Mengecek koneksi ke Supabase...')
  console.log(`📍 URL: ${supabaseUrl}`)
  console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...`)
  
  try {
    // Test query untuk check table todos
    const { data, error } = await supabase
      .from('todos')
      .select('count')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.error('❌ Error: Table "todos" belum ada!')
        console.error('   Silakan jalankan SQL migration di Supabase Dashboard')
        console.error('   File: supabase/migrations/001_create_todos_table.sql')
      } else {
        console.error('❌ Error:', error.message)
      }
      process.exit(1)
    }
    
    console.log('✅ Koneksi berhasil!')
    console.log('✅ Table "todos" sudah ada dan dapat diakses')
    
  } catch (err) {
    console.error('❌ Error koneksi:', err.message)
    process.exit(1)
  }
}

checkConnection()

