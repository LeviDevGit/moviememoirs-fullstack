import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { page, filter } = req.query

  const pageNumber = Array.isArray(page) ? Number(page[0]) : Number(page)

  function getFirstOrValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
  }

  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email',
        )
      }
      res.status(500).json({
        error: 'Prisma error',
        message: error.message,
        code: error.code,
      })
    }
  }
}
