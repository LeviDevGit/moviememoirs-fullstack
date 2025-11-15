import { NextRequest, NextResponse } from 'next/server'
import { withPrismaError } from '@/lib/errorHandler'
import updateRating from '@/lib/updateRating'
import prisma from '@/lib/prisma'

export const DELETE = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const viewId = searchParams.get('viewId')

  if (!viewId) {
    return NextResponse.json({ error: 'viewId é obrigatório' }, { status: 400 })
  }

  const result = await prisma.view.delete({
    where: {
      id: Number(viewId),
    },
  })

  await updateRating(result.mediaId)

  const viewsLeft = await prisma.view.findUnique({
    where: {
      id: Number(viewId),
    },
    select: {
      mediaId: true,
    },
  })

  if (!viewsLeft) {
    await prisma.media.delete({
      where: { id: result.mediaId },
    })
  }

  return NextResponse.json(result)
})
