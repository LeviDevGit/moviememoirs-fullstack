import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method não permitido' })
  }

  const { CategoryId } = req.query

  await prisma.category.delete({
    where: { id: Number(CategoryId) },
  })

  res.status(200).json({ message: 'Categoria deletada com sucesso' })
}

export default withPrismaError(handler)
