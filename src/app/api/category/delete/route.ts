import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const CategoryId = searchParams.get('CategoryId')

  await prisma.category.delete({
    where: { id: Number(CategoryId) },
  })

  return NextResponse.json({ message: 'Categoria deletada com sucesso' })
})
