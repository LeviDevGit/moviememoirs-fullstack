import prisma from '@/lib/prisma'
import path from 'path'
import { withPrismaError } from '@/lib/errorHandler'
import updateRating from '@/lib/updateRating'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'

export const runtime = 'nodejs'

export const POST = withPrismaError(async (req: NextRequest) => {
  // Garante a existência da pasta /public/posters
  const postersDir = path.join(process.cwd(), 'public', 'posters')
  if (!fs.existsSync(postersDir)) {
    fs.mkdirSync(postersDir, { recursive: true })
  }

  // Busca o último registro de mídia para definir o próximo número de arquivo
  const latest = await prisma.media.findFirst({
    orderBy: { id: 'desc' },
    select: { img: true },
  })

  function getNextFileNumber(): number {
    if (!latest?.img) return 1
    const match = latest.img.match(/(\d+)\.jpg$/)
    return match ? parseInt(match[1], 10) + 1 : 1
  }

  const formData = await req.formData()

  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json(
      { error: 'Nenhum arquivo enviado' },
      { status: 400 },
    )
  }

  // Campos textuais
  const name = formData.get('Nome') as string
  const year = formData.get('Ano de lançamento') as string
  const time = formData.get('Duração') as string
  const creator = formData.get('Criador(a)') as string
  const value = Number(formData.get('value'))
  const commentary = formData.get('Comentário') as string
  const type = formData.get('Tipo') as string
  const dateStr = formData.get('Data') as string

  // Converte dd/mm/yyyy para yyyy-mm-dd
  const [day, month, yearNum] = dateStr.split('/')
  const formattedDate = `${yearNum}-${month}-${day}`

  // Cria registro inicial (sem imagem)
  const media = await prisma.media.create({
    data: {
      name,
      year,
      time,
      creator,
      img: '',
      views: {
        create: {
          rating: value,
          date: new Date(formattedDate),
          commentary,
        },
      },
      category: {
        connect: { name: type },
      },
    },
  })

  // Salva o arquivo localmente
  const ext = path.extname(file.name) || '.jpg'
  const newFileName = `${getNextFileNumber()}${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  const filePath = path.join(postersDir, newFileName)
  fs.writeFileSync(filePath, buffer)

  // Caminho público para renderização
  const publicUrl = `/posters/${newFileName}`

  // Atualiza a mídia com o caminho da imagem
  const updated = await prisma.media.update({
    where: { id: media.id },
    data: { img: publicUrl },
  })

  // Atualiza a média de avaliações (caso use)
  await updateRating(media.id)

  return NextResponse.json(updated)
})
