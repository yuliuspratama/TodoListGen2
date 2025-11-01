import AuthForm from '@/components/AuthForm'
import Link from 'next/link'
import ThemeSelector from '@/components/ThemeSelector'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div>
      <div className="max-w-md w-full bg-surface rounded-lg shadow-md border border-border p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-text">Daftar</h1>
        <AuthForm mode="register" />
        <p className="mt-4 text-center text-sm text-text-secondary">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-primary hover:opacity-80">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

