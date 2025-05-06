import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET /api/read
async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { start } = req.query

  const TAKE_LIMIT = 10

  const whereCondition = {
    movie: {
      name: {
        contains: req.query.name ? req.query.name.toString() : '',
      },
      direction: req.query.director
        ? { contains: req.query.director as string }
        : undefined,
      year:
        req.query.year && req.query.year !== ''
          ? req.query.year.toString()
          : undefined,
      value: req.query.value ? Number(req.query.value) : undefined,
    },
  }

  const totalItems = await prisma.view.count({
    where: whereCondition,
  })

  let items = await prisma.view.findMany({
    where: whereCondition,
    include: {
      movie: true,
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
        movie: true,
      },
      orderBy: {
        date: 'asc',
      },
    })
    if (extraItems) items = [extraItems, ...items]
  }

  if (Number(start) + TAKE_LIMIT > totalItems && totalItems > 1) {
    const extraItems = await prisma.view.findMany({
      where: whereCondition,
      take: (Number(start) + TAKE_LIMIT) % totalItems,
      include: {
        movie: true,
      },
      orderBy: {
        date: 'desc',
      },
    })
    items = [...items, ...extraItems]
  }

  return res.json({ items, totalItems })
}

export default withPrismaError(handle)
