import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { SectionType } from '../../../../../prisma/seed'
import { NextRequest, NextResponse } from 'next/server'
import { CategoryBody } from '@/components/features/profile/forms/FormCategoryCreate'

export const POST = withPrismaError(async (req: NextRequest) => {
  const body = (await req.json()) as CategoryBody

  const result = await prisma.category.create({
    data: {
      name: body.name,
      proportion: body.proportion,
    },
  })

  for (const name of body.sectionName) {
    const existing = await prisma.extraSection.findFirst({
      where: {
        name,
      },
    })
    let type: SectionType

    if (name === 'Sinopse') {
      type = SectionType.PARAGRAPH
    } else if (name === 'Tags') {
      type = SectionType.TAG
    } else if (name === 'Elenco') {
      type = SectionType.IMAGE
    } else {
      type = SectionType.PARAGRAPH
    }

    if (!existing) {
      await prisma.extraSection.create({
        data: {
          name,
          type,
          categoryId: result.id,
        },
      })
    }
  }
  return NextResponse.json(result)
})
