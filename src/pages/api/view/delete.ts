import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
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

  return res.json(result)
}

export default withPrismaError(handle)
