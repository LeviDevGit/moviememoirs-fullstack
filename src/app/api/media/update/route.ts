import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import updateRating from '@/lib/updateRating'
import path from 'path'
import fs from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const PATCH = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const mediaId = searchParams.get('mediaid')

  const currentMedia = await prisma.media.findUnique({
    where: { id: Number(mediaId) },
    select: { img: true },
  })

  if (!currentMedia) {
    return NextResponse.json({ error: 'Mídia não encontrada' }, { status: 404 })
  }

  function convertToDate(dateString: string) {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  function getOrUndefined(key: string) {
    const v = formData.get(key)
    return v && typeof v === 'string' && v.trim() !== '' ? v : undefined
  }

  const formData = await req.formData()

  const dateRaw = formData.get('date')
  let viewDate: string | null = null

  if (typeof dateRaw === 'string' && dateRaw.trim() !== '') {
    viewDate = convertToDate(dateRaw)
  }

  const commentary = formData.get('commentary')
  const ratingRaw = formData.get('value')

  // Criação de view caso data + commentary existam
  if (
    viewDate &&
    typeof commentary === 'string' &&
    commentary.trim() !== '' &&
    typeof ratingRaw === 'string'
  ) {
    await prisma.media.update({
      where: { id: Number(mediaId) },
      data: {
        views: {
          create: {
            date: new Date(viewDate),
            commentary,
            rating: Number(ratingRaw),
          },
        },
      },
    })
  }

  const updated = await prisma.media.update({
    where: { id: Number(mediaId) },
    include: { views: true },
    data: {
      name: getOrUndefined('Título'),
      // Outros campos removidos, mas podem ser reativados:
      // creator: getOrUndefined('direction'),
      // time: getOrUndefined('time'),
      // year: getOrUndefined('Lançamento'),
    },
  })

  const file = formData.get('file')

  if (file instanceof File) {
    const publicDir = path.join(process.cwd(), 'public', 'posters')

    // Mantém o nome atual
    const existingFilename = path.basename(currentMedia.img)
    const outputPath = path.join(publicDir, existingFilename)

    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(outputPath, buffer)

    // Atualiza o caminho público (garantia)
    await prisma.media.update({
      where: { id: Number(mediaId) },
      data: {
        img: `/posters/${existingFilename}`,
      },
    })
  }

  await updateRating(Number(mediaId))

  return NextResponse.json(updated)
})
