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

  const result = await prisma.view.findMany({
    include: {
      movie: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  return res.json(result)
}
