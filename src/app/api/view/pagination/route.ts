import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = withPrismaError(async (req: Request) => {
  const { searchParams } = new URL(req.url)

  const page = searchParams.get('page')

  const pageNumber = Array.isArray(page) ? Number(page[0]) : Number(page)

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  const result = await prisma.view.findMany({
    orderBy: {
      date:
        getFirstOrValue(searchParams.get('order') || '') === 'asc'
          ? 'asc'
          : 'desc',
    },
    skip: (pageNumber && (pageNumber - 1) * 6) || 0,
    take: Number(getFirstOrValue(searchParams.get('size') || '')) || 6,
    include: {
      media: {
        include: {
          category: true,
        },
      },
    },
    where: {
      media: {
        name: {
          contains: searchParams.get('filter')
            ? getFirstOrValue(searchParams.get('filter') || '')
            : '',
        },
      },
    },
    distinct: ['mediaId'],
  })

  return NextResponse.json(result)
})
