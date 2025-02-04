import { NextApiRequest, NextApiResponse } from 'next'
import { Files, IncomingForm } from 'formidable'
import prisma from '@/lib/prisma'
import path from 'path'
import { Prisma } from '@prisma/client'
import { withPrismaError } from '@/lib/errorHandler'

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

interface jsonArrayProps {
  id: number
  name: string
  date: string
  time: string
  direction: string
  value: number
  img: string
  type: string
}

// CREATE /api/create
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const publicDir = path.join(process.cwd(), 'public', 'uploads')

  // const latestQuery = await prisma.movie.findFirst({
  //   orderBy: {
  //     id: 'desc',
  //   },
  // })

  // function obterProximoNumero(jsonArray: jsonArrayProps) {
  //   const ultimoElemento = jsonArray
  //   const regex = /(\d+)\.jpg$/

  //   const match = ultimoElemento.img.match(regex)
  //   if (match) {
  //     const numeroAtual = parseInt(match[1], 10)
  //     return numeroAtual + 1
  //   }
  //   throw new Error('Caminho inválido no último elemento do JSON')
  // }

  const { fields, files }: { fields: FormFields; files: Files } =
    await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        // uploadDir: publicDir,
        // keepExtensions: true,
        // filename: (name, ext, part) => {
        //   if (latestQuery) {
        //     const novoNumero = obterProximoNumero(latestQuery)
        //     return `${novoNumero}${ext}`
        //   } else {
        //     return part.originalFilename || `unknown-file${ext}`
        //   }
        // },
      })

      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err)
        }
        resolve({ fields: fields as unknown as FormFields, files })
      })
    })

  // const file = files.file

  // const publicUrl = `/uploads/${path.basename(file![0].filepath)}`

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
      // img: publicUrl,
      img: 'Teste/uploads',
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
}

export default withPrismaError(handler)
