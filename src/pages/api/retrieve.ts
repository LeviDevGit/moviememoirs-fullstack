import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { mediaId } = req.query

  const result = await prisma.media.findUniqueOrThrow({
    where: {
      id: Number(mediaId),
    },
    include: {
      views: true,
    },
  })

  return res.json(result)
}

export default withPrismaError(handle)
