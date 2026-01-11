import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)

  const start = Number(searchParams.get('start')) || 0
  const order = searchParams.get('order') || 'recent'
  const category = searchParams.get('category')
  const creator = searchParams.get('creator')
  const fromYear = searchParams.get('fromYear')
  const toYear = searchParams.get('toYear')
  const minRating = Number(searchParams.get('minRating') || 0)

  const TAKE_LIMIT = 8

  const whereCondition: Prisma.ViewWhereInput = {
    media: {
      name: {
        contains: searchParams.get('filter') || '',
      },
      creator: creator ? { contains: creator as string } : undefined,
      year: {
        gte: (fromYear as string) || undefined,
        lte: (toYear as string) || undefined,
      },
      value: {
        gte: (minRating as number) || undefined,
      },
      category: category
        ? category === 'Todas'
          ? { isNot: null }
          : { name: category }
        : undefined,
    },
  }

  const totalItems = await prisma.view.count({
    where: whereCondition,
  })

  const orderBy: Prisma.ViewOrderByWithRelationInput =
    order === 'release'
      ? { media: { year: 'desc' } }
      : order === 'rating_desc'
        ? { media: { value: 'desc' } }
        : order === 'rating_asc'
          ? { media: { value: 'asc' } }
          : { date: 'desc' }

  // BASE QUERY
  let items = await prisma.view.findMany({
    where: whereCondition,
    include: {
      media: true,
    },
    orderBy,
    take: Number(start) === 0 ? TAKE_LIMIT - 1 : TAKE_LIMIT,
    skip: Number(start),
  })

  // Se o carrossel estiver no começo, buscar os últimos itens para completar a rotação
  if (Number(start) === 0 && totalItems > TAKE_LIMIT - 1) {
    const extraItems = await prisma.view.findFirst({
      where: whereCondition,
      include: {
        media: true,
      },
      orderBy: {
        date: 'asc',
      },
    })
    if (extraItems) items = [extraItems, ...items]
  }

  if (
    Number(start) + TAKE_LIMIT > totalItems &&
    totalItems > 1 &&
    totalItems >= TAKE_LIMIT
  ) {
    const extraItems = await prisma.view.findMany({
      where: whereCondition,
      take: (Number(start) + TAKE_LIMIT) % totalItems,
      include: {
        media: true,
      },
      orderBy: {
        date: 'desc',
      },
    })
    items = [...items, ...extraItems]
  }

  return NextResponse.json({ items, totalItems })
})
