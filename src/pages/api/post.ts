import { NextApiRequest, NextApiResponse } from 'next'
import { Files, IncomingForm } from 'formidable'
import prisma from '@/lib/prisma'
import path from 'path'
import { Prisma } from '@prisma/client'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface FormFields {
  movieDate: string[]
  direction: string[]
  name: string[]
  time: string[]
  type: string[]
  movieValue: string[]
  viewDate: string[]
  commentary?: string[]
}

// CREATE /api/post
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'uploads')

    const { fields, files }: { fields: FormFields; files: Files } =
      await new Promise((resolve, reject) => {
        const form = new IncomingForm({
          uploadDir: publicDir,
          keepExtensions: true,
        })

        form.parse(req, (err, fields, files) => {
          if (err) {
            return reject(err)
          }
          resolve({ fields: fields as unknown as FormFields, files })
        })
      })

    const file = files.file

    const publicUrl = `/public/uploads/${path.basename(file![0].filepath)}`

    function convertToDate(dateString: string): string {
      const [day, month, year] = dateString.split('/')
      return `${year}-${month}-${day}`
    }

    const viewDate = convertToDate(fields.viewDate![0])
    const commentaryValidated =
      fields.commentary && fields.commentary[0] !== ''
        ? fields.commentary[0]
        : null

    const result = await prisma.movie.create({
      data: {
        date: fields.movieDate![0],
        direction: fields.direction![0],
        img: publicUrl,
        name: fields.name![0],
        time: fields.time![0],
        type: fields.type![0],
        value: Number(fields.movieValue![0]),
        views: {
          create: {
            date: new Date(viewDate),
            commentary: commentaryValidated,
          },
        },
      },
    })

    res.status(200).json(result)
  } catch (error) {
    console.error('Error:', error) // Log para depuração

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email',
        )
      }
      res.status(500).json({
        error: 'Prisma error',
        message: error.message,
        code: error.code,
      })
    }
  }
}
