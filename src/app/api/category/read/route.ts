import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = withPrismaError(async () => {
  const result = await prisma.category.findMany()
  return NextResponse.json(result)
})
