import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { page, filter, size, order } = req.query

  const pageNumber = Array.isArray(page) ? Number(page[0]) : Number(page)

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  const result = await prisma.view.findMany({
    orderBy: {
      date: getFirstOrValue(order) === 'asc' ? 'asc' : 'desc',
    },
    skip: (pageNumber && (pageNumber - 1) * 6) || 0,
    take: Number(getFirstOrValue(size)) || 6,
    include: {
      media: {
        include: {
          category: true,
        },
      },
    },
    where: {
      media: {
        name: {
          contains: filter ? getFirstOrValue(filter) : '',
        },
      },
    },
    distinct: ['mediaId'],
  })

  return res.json(result)
}

export default withPrismaError(handle)
