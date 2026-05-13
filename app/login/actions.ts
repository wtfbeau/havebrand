'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHmac, timingSafeEqual } from 'crypto'

function makeToken(password: string): string {
  const secret = process.env.EARLY_ACCESS_SECRET ?? 'fallback-dev-secret'
  return createHmac('sha256', secret).update(password).digest('hex')
}

export async function loginAction(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get('password')?.toString().trim() ?? ''
  const expected = process.env.EARLY_ACCESS_PASSWORD

  if (!expected) {
    return { error: 'Auth is not configured.' }
  }

  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  const match = a.length === b.length && timingSafeEqual(a, b)

  if (!match) {
    return { error: 'Wrong password. Try again.' }
  }

  const cookieStore = await cookies()
  cookieStore.set('hb_access', makeToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  redirect('/dashboard')
}
