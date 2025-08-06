import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'
import { withPrismaError } from '@/lib/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId, movieImagePath } = req.body

  await prisma.media.delete({
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
}

export default withPrismaError(handler)
