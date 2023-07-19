/* Core */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const TEST_ACCOUNT = {
  email: 'tester@kangaroohealth.com',
  password: '123456'
}

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  if (email === TEST_ACCOUNT.email && password === TEST_ACCOUNT.password) {
    cookies().set('user', email)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Invalid Email or Password'
    },
    { status: 403 }
  )
}
