import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)

  const names = searchParams.get('categoryName')?.split(',') || []

  if (names.length === 0) return NextResponse.json({})

  const counts = await Promise.all(
    names.map(async (name) => {
      const totalViews = await prisma.view.count({
        where: {
          media: {
            category: {
              name,
            },
          },
        },
      })
      return { name, total: totalViews }
    }),
  )

  return NextResponse.json(counts)
})
