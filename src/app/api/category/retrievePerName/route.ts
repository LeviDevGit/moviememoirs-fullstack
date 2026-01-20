import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const categoryName = searchParams.get('name')

  if (!categoryName) {
    return NextResponse.json(
      { error: 'Nome da categoria inválido' },
      { status: 400 },
    )
  }

  const result = await prisma.category.findFirst({
    where: {
      name: categoryName,
    },
  })

  return NextResponse.json(result)
})
