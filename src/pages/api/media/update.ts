import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import updateRating from '@/lib/updateRating'
import { Files, IncomingForm } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface FormFields {
  Lançamento: string[]
  direction: string[]
  name: string[]
  time: string[]
  type: string[]
  value: string[]
  date: string[]
  commentary?: string[]
}

interface latestQueryProps {
  img: string
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { mediaid } = req.query

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

  const publicDir = path.join(process.cwd(), 'public', 'posters')

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

  function convertToDate(dateString: string) {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  function validateFieldsOrUndefined(data: string[]) {
    if (data && data[0]) {
      return data[0]
    } else {
      return undefined
    }
  }

  let viewDate = ''

  if (fields.date) {
    viewDate = convertToDate(fields.date[0])
  }

  if (fields.commentary && viewDate && fields.commentary[0] !== '') {
    await prisma.media.update({
      where: {
        id: Number(mediaid),
      },
      data: {
        views: {
          create: {
            date: new Date(viewDate),
            commentary: fields.commentary[0],
            rating: Number(fields.value[0]),
          },
        },
      },
    })
  }

  const result = await prisma.media.update({
    where: {
      id: Number(mediaid),
    },
    include: {
      views: true,
    },
    data: {
      // name: validateFieldsOrUndefined(fields.name),
      // creator: validateFieldsOrUndefined(fields.direction),
      // time: validateFieldsOrUndefined(fields.time),
      year: validateFieldsOrUndefined(fields.Lançamento),
      category: {
        // connect: {
        //   name: validateFieldsOrUndefined(fields.type),
        // },
      },
    },
  })

  if (files.file) {
    const publicUrl = `/posters/${path.basename(files.file[0].filepath)}`

    await prisma.media.update({
      where: {
        id: Number(mediaid),
      },
      data: {
        img: publicUrl,
      },
    })
  }

  await updateRating(result.id)

  return res.json(result)
}

export default withPrismaError(handle)
