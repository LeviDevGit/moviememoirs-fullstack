import prisma from '@/lib/prisma'
import updateRating from '@/lib/updateRating'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const viewId = searchParams.get('viewId')

  if (!viewId) {
    return NextResponse.json({ error: 'Invalid viewId' }, { status: 400 })
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

  return NextResponse.json(updatedView)
}
