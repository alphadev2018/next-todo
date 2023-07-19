/* Core */
import { NextResponse } from 'next/server'

/* Instruments */
import * as db from '@/lib/db'


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page')) || 0
  const pageSize = Number(searchParams.get('pageSize')) || 10

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  const items = db.get()

  return NextResponse.json({
    data: items.slice(page * pageSize, (page + 1) * pageSize),
    hasMore: (page + 1) * pageSize < items.length
  })
}

export async function POST(req: Request) {
  const body = await req.json()

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  const data = db.insert(body)

  return NextResponse.json({ data })
}
