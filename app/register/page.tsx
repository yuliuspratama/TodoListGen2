import AuthForm from '@/components/AuthForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Daftar</h1>
        <AuthForm mode="register" />
        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

