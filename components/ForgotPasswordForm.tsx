'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) throw resetError

      setMessage('Link reset password telah dikirim ke email Anda. Silakan cek inbox email Anda.')
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengirim email reset')
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
        <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="nama@email.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Mengirim...' : 'Kirim Link Reset Password'}
      </button>

      <p className="text-center text-sm text-text-secondary">
        <Link href="/login" className="text-primary hover:opacity-80">
          Kembali ke halaman masuk
        </Link>
      </p>
    </form>
  )
}

