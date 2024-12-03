import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET /api/read
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { searchString, directorString, yearString, valueString } = req.query

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  const result = await prisma.view.findMany({
    where: {
      movie: {
        name: {
          contains: getFirstOrValue(searchString),
        },
        direction: {
          contains: getFirstOrValue(directorString),
        },
        date: getFirstOrValue(yearString),
        value:
          valueString && !isNaN(Number(valueString))
            ? {
                equals: Number(valueString),
              }
            : undefined,
      },
    },
    include: {
      movie: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  return res.json(result)
}
