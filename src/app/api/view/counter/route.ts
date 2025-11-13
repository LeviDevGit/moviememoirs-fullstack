import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = withPrismaError(async () => {
  const counter = await prisma.view.count()
  return NextResponse.json(counter)
})
