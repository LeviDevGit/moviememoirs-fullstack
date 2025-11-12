import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface createCategoryProps {
  name: string
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method não permitido' })
  }

  res.setHeader('Allow', ['PATCH'])
  const { categoryId } = req.query

  if (categoryId === undefined || Array.isArray(categoryId)) {
    return res.status(400).json({ error: 'categoryId inválido' })
  }

  const { name } = req.body as createCategoryProps

  if (!name?.trim()) return res.status(400).json({ error: 'Nome inválido' })

  const result = await prisma.category.update({
    where: {
      id: Number(categoryId),
    },
    data: {
      name,
    },
  })

  res.status(200).json(result)
}

export default withPrismaError(handler)
