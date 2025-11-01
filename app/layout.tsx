import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo List App',
  description: 'Aplikasi TODO list dengan Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}

