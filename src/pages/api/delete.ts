import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'
import { withPrismaError } from '@/lib/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  const media = await prisma.media.findUnique({
    where: {
      id: Number(id),
    },
    select: { img: true },
  })

  if (!media) {
    return res.status(404).json({ error: 'Media not found' })
  }

  const absolutePath = path.join(process.cwd(), 'public', media.img)

  try {
    await fs.unlink(absolutePath)
    console.log(`Imagem ${absolutePath} deletada com sucesso`)
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`Erro ao deletar imagem: ${error.message}`)
    }
  }

  await prisma.media.delete({
    where: {
      id: Number(id),
    },
  })

  res.status(204).end()
}

export default withPrismaError(handler)
