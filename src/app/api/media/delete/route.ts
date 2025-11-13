import { NextRequest, NextResponse } from 'next/server'
import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

export const DELETE = withPrismaError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const media = await prisma.media.findUnique({
    where: {
      id: Number(id),
    },
    select: { img: true },
  })

  if (!media) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 })
  }

  const absolutePath = path.join(process.cwd(), 'public', media.img)

  try {
    await fs.unlink(absolutePath)
    console.log(`Imagem ${absolutePath} deletada com sucesso`)
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`Erro ao deletar imagem: ${error.message}`)
    }
  }

  await prisma.media.delete({
    where: {
      id: Number(id),
    },
  })

  return NextResponse.json({ message: 'Mídia deletada com sucesso' })
})
