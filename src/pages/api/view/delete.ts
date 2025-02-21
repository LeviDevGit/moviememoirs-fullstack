import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import updateRating from '@/lib/updateRating'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { viewId } = req.query

  const result = await prisma.view.delete({
    where: {
      id: Number(viewId),
    },
  })

  await updateRating(result.movieId)

  const viewsLeft = await prisma.view.findUnique({
    where: {
      id: Number(viewId),
    },
    select: {
      movieId: true,
    },
  })

  if (!viewsLeft) {
    await prisma.movie.delete({
      where: { id: result.movieId },
    })
  }

  return res.json(result)
}

export default withPrismaError(handle)
