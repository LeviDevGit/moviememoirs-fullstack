import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const counter = await prisma.view.count()

    return res.json(counter)
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

export default handle
