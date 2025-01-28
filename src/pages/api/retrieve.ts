import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { mediaId } = req.query

  const result = await prisma.movie.findUniqueOrThrow({
    where: {
      id: Number(mediaId),
    },
    include: {
      views: true,
    },
  })

  return res.json(result)
}
