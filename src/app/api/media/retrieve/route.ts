import { NextRequest, NextResponse } from 'next/server'
import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const mediaId = searchParams.get('mediaId')

  const result = await prisma.media.findUniqueOrThrow({
    where: {
      id: Number(mediaId),
    },
    include: {
      views: true,
    },
  })

  return NextResponse.json(result)
})
