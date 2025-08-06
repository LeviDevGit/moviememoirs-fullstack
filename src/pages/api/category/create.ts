import { withPrismaError } from '@/lib/errorHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { CategoryBody } from '@/components/features/form-category/FormCategory'
import prisma from '@/lib/prisma'
import { SectionType } from '../../../../prisma/seed'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as CategoryBody

  res.setHeader('Allow', ['POST'])

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method não permitido' })
  }

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

    res.status(200).json(result)
  }
}

export default withPrismaError(handler)
