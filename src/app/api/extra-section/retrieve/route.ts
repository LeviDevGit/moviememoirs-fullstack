import prisma from '@/lib/prisma'
import { withPrismaError } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const CategoryId = searchParams.get('CategoryId')

  if (!CategoryId) {
    return NextResponse.json({ error: 'Id não identificado' }, { status: 400 })
  }

  const result = await prisma.extraSection.findMany({
    where: {
      categoryId: Number(CategoryId),
    },
  })

  if (result.length === 0 || !result) {
    return NextResponse.json({ error: 'Sem extras seções' }, { status: 404 })
  }

  return NextResponse.json(result)
})
