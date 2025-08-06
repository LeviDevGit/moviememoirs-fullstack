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
  Nome: string[]
  Tipo: string[]
  'Ano de lançamento': string[]
  Duração: string[]
  'Diretor(a)': string[]
  Data: string[]
  'Id do imdb': string[]
  commentary?: string[]
  value: string[]
}

interface latestQueryProps {
  img: string
}

// CREATE /api/create
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const publicDir = path.join(process.cwd(), 'public', 'posters')

  const latestQuery = await prisma.media.findFirst({
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

  const viewDate = convertToDate(fields.Data![0])

  const result = await prisma.media.create({
    data: {
      name: fields.Nome![0],
      year: fields['Ano de lançamento']![0],
      time: fields.Duração![0],
      creator: fields['Diretor(a)']![0],
      img: '',
      views: {
        create: {
          rating: Number(fields.value![0]),
          date: new Date(viewDate),
          commentary: fields.commentary![0],
        },
      },
      category: {
        connect: {
          name: fields.Tipo![0],
        },
      },
    },
  })

  if (files.file) {
    const publicUrl = `/posters/${path.basename(files.file[0].filepath)}`

    const addition = await prisma.media.update({
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
