import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  const counter = await prisma.view.count({
    where: {
      media: {
        category: {
          name: getFirstOrValue(searchParams.get('categoryName') || ''),
        },
      },
    },
  })

  return NextResponse.json(counter)
})
