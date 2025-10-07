import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import updateRating from '@/lib/updateRating'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { viewId } = req.query

  if (viewId === undefined || Array.isArray(viewId)) {
    return res.status(400).json({ error: 'Invalid viewId' })
  }

  const body = req.body as {
    Comentário?: string
    value?: string
    Data?: string
  }

  // Aqui você pode adicionar validações adicionais, se necessário
  function convertToDate(dateString: string): string {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  const viewDate = body.Data && convertToDate(body.Data)

  // Atualiza o comentário da visualização no banco de dados
  const updatedView = await prisma.view.update({
    where: { id: Number(viewId) },
    data: {
      commentary: body.Comentário,
      rating: body.value ? Number(body.value) : undefined,
      date: viewDate ? new Date(viewDate) : undefined,
    },
  })

  updateRating(updatedView.mediaId)

  return res.json(updatedView)
}
export default withPrismaError(handle)
