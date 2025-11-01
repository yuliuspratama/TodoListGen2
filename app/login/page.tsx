import AuthForm from '@/components/AuthForm'
import Link from 'next/link'
import ThemeSelector from '@/components/ThemeSelector'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div>
      <div className="max-w-md w-full bg-surface rounded-lg shadow-md border border-border p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-text">Masuk</h1>
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-text-secondary">
          Belum punya akun?{' '}
          <Link href="/register" className="text-primary hover:opacity-80">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

