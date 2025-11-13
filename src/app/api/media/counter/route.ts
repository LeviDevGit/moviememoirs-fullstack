import { NextRequest, NextResponse } from 'next/server'
import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter')

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  const counter = await prisma.media.count({
    where: {
      name: {
        contains: getFirstOrValue(filter || undefined),
      },
    },
  })

  return NextResponse.json(counter)
})
