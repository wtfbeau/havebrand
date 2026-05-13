import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Early Access | HaveBrand',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const cookieStore = await cookies()
  if (cookieStore.has('hb_access')) {
    const { from } = await searchParams
    redirect(from ?? '/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-bg px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 text-center">
          <span
            className="text-2xl text-ink tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            HaveBrand
          </span>
        </div>

        {/* Early Access badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 border text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              color: '#C44B5F',
              backgroundColor: 'rgba(196,75,95,0.08)',
              borderColor: 'rgba(196,75,95,0.2)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-gold"
              style={{ animation: 'pulse 2.5s ease-in-out infinite' }}
              aria-hidden="true"
            />
            Early Access
          </span>
        </div>

        {/* Card */}
        <div className="bg-white border border-cream-border rounded-2xl p-8 shadow-sm">
          <h1
            className="text-xl text-ink mb-2 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Enter your access code
          </h1>
          <p className="text-ink-mid text-sm text-center mb-6">
            HaveBrand is invite-only right now. Enter the password from your invitation.
          </p>
          <LoginForm />
        </div>

      </div>
    </div>
  )
}
