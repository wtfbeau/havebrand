'use client'

import { useActionState } from 'react'
import { loginAction } from './actions'

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: '' })

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm text-ink-mid mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter access password"
          className="w-full rounded-xl border border-cream-border bg-cream-bg px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-light focus:border-gold focus:ring-2 focus:ring-gold/15"
        />
      </div>

      {state?.error && (
        <p
          className="text-sm rounded-lg px-3 py-2"
          style={{
            color: '#D94F3D',
            backgroundColor: 'rgba(217,79,61,0.08)',
            border: '1px solid rgba(217,79,61,0.2)',
          }}
          role="alert"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 text-white font-medium px-5 py-3 rounded-xl text-sm transition-colors duration-150 cursor-pointer"
        style={{ boxShadow: '0 0 22px rgba(196,75,95,0.3), 0 2px 8px rgba(0,0,0,0.12)' }}
      >
        {pending ? 'Checking…' : 'Access Dashboard'}
      </button>
    </form>
  )
}
