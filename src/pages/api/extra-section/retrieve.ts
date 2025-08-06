import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { withPrismaError } from '@/lib/errorHandler'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { CategoryId } = req.query

  if (!CategoryId) {
    return res.status(400).json({ error: 'Id não identificado' })
  }

  const result = await prisma.extraSection.findMany({
    where: {
      categoryId: Number(CategoryId),
    },
  })

  if (result.length === 0) {
    return res.status(404).json({ error: 'Sem extras seções' })
  }

  return res.status(200).json(result)
}

export default withPrismaError(handler)
