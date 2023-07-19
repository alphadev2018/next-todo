/* Core */
import { NextResponse } from 'next/server'

/* Instruments */
import * as db from '@/lib/db'

export async function PUT(req: Request, context: { params: { id: string } }) {
  const body = await req.json()
  const { id } = context.params;

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  const data = db.update(id, body)

  return NextResponse.json({ data })
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  db.remove(id)

  return NextResponse.json({})
}
