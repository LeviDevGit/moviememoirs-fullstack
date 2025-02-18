import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { filter } = req.query

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  const counter = await prisma.movie.count({
    where: {
      name: {
        contains: getFirstOrValue(filter),
      },
    },
  })

  return res.json(counter)
}

export default withPrismaError(handle)
