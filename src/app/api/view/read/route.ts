import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const start = Number(searchParams.get('start')) || 0

  const TAKE_LIMIT = 8

  const whereCondition = {
    media: {
      name: {
        contains: searchParams.get('name') || '',
      },
      creator: searchParams.get('director')
        ? { contains: searchParams.get('director') as string }
        : undefined,
      year:
        searchParams.get('year') && searchParams.get('year') !== ''
          ? (searchParams.get('year') as string)
          : undefined,
      value: searchParams.get('value')
        ? Number(searchParams.get('value'))
        : undefined,
    },
  }

  const totalItems = await prisma.view.count({
    where: whereCondition,
  })

  let items = await prisma.view.findMany({
    where: whereCondition,
    include: {
      media: true,
    },
    orderBy: {
      date: 'desc',
    },
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
