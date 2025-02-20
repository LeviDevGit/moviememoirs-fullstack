import { NextApiRequest, NextApiResponse } from 'next'
import { Files, IncomingForm } from 'formidable'
import prisma from '@/lib/prisma'
import path from 'path'
import { withPrismaError } from '@/lib/errorHandler'
import updateRating from '@/lib/updateRating'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface FormFields {
  year: string[]
  direction: string[]
  name: string[]
  time: string[]
  type: string[]
  value: string[]
  date: string[]
  imdb: string[]
  commentary?: string[]
}

interface latestQueryProps {
  img: string
}

// CREATE /api/create
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const publicDir = path.join(process.cwd(), 'public', 'uploads')

  const latestQuery = await prisma.movie.findFirst({
    orderBy: {
      id: 'desc',
    },
    select: {
      img: true,
    },
  })

  function obterProximoNumero(jsonArray: latestQueryProps) {
    const ultimoElemento = jsonArray
    const regex = /(\d+)\.jpg$/

    const match = ultimoElemento.img.match(regex)
    if (match) {
      const numeroAtual = parseInt(match[1], 10)
      return numeroAtual + 1
    }
    throw new Error('Caminho inválido no último elemento do JSON')
  }

  const { fields, files }: { fields: FormFields; files: Files } =
    await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        uploadDir: publicDir,
        keepExtensions: true,
        filename: (_, ext) => {
          const novoNumero = latestQuery ? obterProximoNumero(latestQuery) : 1
          return `${novoNumero}${ext}`
        },
      })

      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err)
        }
        resolve({ fields: fields as unknown as FormFields, files })
      })
    })

  function convertToDate(dateString: string): string {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  const viewDate = convertToDate(fields.date![0])

  const result = await prisma.movie.create({
    data: {
      name: fields.name![0],
      type: fields.type![0],
      year: fields.year![0],
      time: fields.time![0],
      direction: fields.direction![0],
      imdb: fields.imdb[0],
      img: '',
      views: {
        create: {
          rating: Number(fields.value![0]),
          date: new Date(viewDate),
          commentary: fields.commentary![0],
        },
      },
    },
  })

  if (files.file) {
    const publicUrl = `/uploads/${path.basename(files.file[0].filepath)}`

    const addition = await prisma.movie.update({
      where: {
        id: result.id,
      },
      data: {
        img: publicUrl,
      },
    })

    await updateRating(result.id)

    res.status(200).json(addition)
  }
}

export default withPrismaError(handler)
