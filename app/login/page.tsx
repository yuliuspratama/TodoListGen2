import AuthForm from '@/components/AuthForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Masuk</h1>
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-800">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

