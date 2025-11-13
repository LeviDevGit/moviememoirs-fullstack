import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface createCategoryProps {
  name: string
}

export const PATCH = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const categoryId = searchParams.get('categoryId')

  if (!categoryId) {
    return NextResponse.json({ error: 'categoryId inválido' }, { status: 400 })
  }

  const { name } = (await req.json()) as createCategoryProps

  if (!name?.trim())
    return NextResponse.json({ error: 'Nome inválido' }, { status: 400 })

  const result = await prisma.category.update({
    where: {
      id: Number(categoryId),
    },
    data: {
      name,
    },
  })

  return NextResponse.json(result)
})
