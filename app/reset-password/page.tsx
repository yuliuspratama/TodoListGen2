'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ThemeSelector from '@/components/ThemeSelector'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    // Check if there's a valid hash in the URL
    const hash = searchParams.get('hash')
    if (!hash) {
      setError('Link reset password tidak valid atau telah kedaluwarsa.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      setLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) throw updateError

      setMessage('Password berhasil diubah! Anda akan diarahkan ke halaman login.')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengubah password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-error bg-opacity-10 border-2 border-error px-4 py-3 rounded">
          <p className="text-error font-medium">{error}</p>
        </div>
      )}

      {message && (
        <div className="bg-success bg-opacity-20 border-2 border-success px-4 py-3 rounded">
          <p className="font-medium" style={{ color: '#059669' }}>
            {message}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
          Password Baru
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Minimal 6 karakter"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-text mb-1"
        >
          Konfirmasi Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Ulangi password baru"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Memproses...' : 'Reset Password'}
      </button>

      <p className="text-center text-sm text-text-secondary">
        <Link href="/login" className="text-primary hover:opacity-80">
          Kembali ke halaman masuk
        </Link>
      </p>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div>
      <div className="max-w-md w-full bg-surface rounded-lg shadow-md border border-border p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-text">Reset Password</h1>
        <Suspense fallback={<div className="text-center text-text-secondary">Memuat...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}

