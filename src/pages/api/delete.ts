import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { movieId, movieImagePath } = req.body

    await prisma.movie.delete({
      where: {
        id: Number(movieId),
      },
    })

    const absolutePath = path.join(process.cwd(), 'public', movieImagePath)

    try {
      await fs.unlink(absolutePath)
      console.log(`Imagem ${absolutePath} deletada com sucesso`)
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`Erro ao deletar imagem: ${error.message}`)
      }
    }

    res.status(204).end()
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
