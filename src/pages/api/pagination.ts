import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { page, filter } = req.query

  const pageNumber = Array.isArray(page) ? Number(page[0]) : Number(page)

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  const result = await prisma.view.findMany({
    skip: (pageNumber - 1) * 6,
    take: 6,
    orderBy: {
      date: 'desc',
    },
    include: {
      movie: true,
    },
    where: {
      movie: {
        name: {
          contains: getFirstOrValue(filter),
        },
      },
    },
  })

  return res.json(result)
}

export default withPrismaError(handle)
