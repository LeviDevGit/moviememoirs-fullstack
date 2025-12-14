import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import updateRating from '@/lib/updateRating'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const mediaId = searchParams.get('mediaId')

  if (!mediaId) {
    return NextResponse.json({ error: 'Invalid mediaId' }, { status: 400 })
  }

  const body = (await req.json()) as {
    Comentário: string
    value: string
    Data: string
  }

  // Aqui você pode adicionar validações adicionais, se necessário
  function convertToDate(dateString: string): string {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  const viewDate = convertToDate(body.Data)

  // Cria a nova visualização no banco de dados
  const newView = await prisma.view.create({
    data: {
      mediaId: Number(mediaId),
      commentary: body.Comentário,
      rating: Number(body.value),
      date: new Date(viewDate),
    },
  })

  updateRating(newView.mediaId)

  return NextResponse.json(newView)
})
