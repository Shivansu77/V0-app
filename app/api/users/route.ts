import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 }
    )
  }

  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
  })

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 500 }
    )
  }

  const body = (await request.json()) as { name?: string; email?: string }
  const name = body.name?.trim()
  const email = body.email?.trim()

  if (!email) {
    return NextResponse.json(
      { error: 'email is required' },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'A user with that email already exists' },
        { status: 409 }
      )
    }

    throw error
  }
}
