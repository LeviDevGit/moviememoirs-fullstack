import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = withPrismaError(async () => {
  const averageResult = await prisma.view.aggregate({
    _avg: {
      rating: true,
    },
  })

  return NextResponse.json({ average: averageResult._avg.rating })
})
