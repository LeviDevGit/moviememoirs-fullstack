import { withPrismaError } from '@/lib/errorHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Allow', ['GET'])

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method não permitido' })
  }

  const result = await prisma.category.findMany()

  res.status(200).json(result)
}

export default withPrismaError(handler)
