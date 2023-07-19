/* Core */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function DELETE(req: Request) {
    // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  cookies().delete('user')
  return NextResponse.json({})
}
