import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const averageResult = await prisma.view.aggregate({
    _avg: {
      rating: true,
    },
  })

  return res.status(200).json({ average: averageResult._avg.rating })
}

export default withPrismaError(handle)
