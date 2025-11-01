import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import ThemeSelector from '@/components/ThemeSelector'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div>
      <div className="max-w-md w-full bg-surface rounded-lg shadow-md border border-border p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-text">Lupa Password</h1>
        <p className="text-sm text-text-secondary text-center mb-6">
          Masukkan email Anda dan kami akan mengirimkan link untuk mereset password Anda.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

