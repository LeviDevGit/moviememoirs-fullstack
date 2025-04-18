import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import updateRating from '@/lib/updateRating'
import { IncomingForm } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'

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

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { mediaid } = req.query

  const { fields }: { fields: FormFields } = await new Promise(
    (resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields) => {
        if (err) {
          return reject(err)
        }
        resolve({ fields: fields as unknown as FormFields })
      })
    },
  )

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
    await prisma.movie.update({
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

  const result = await prisma.movie.update({
    where: {
      id: Number(mediaid),
    },
    include: {
      views: true,
    },
    data: {
      name: validateFieldsOrUndefined(fields.name),
      direction: validateFieldsOrUndefined(fields.direction),
      imdb: validateFieldsOrUndefined(fields.imdb),
      time: validateFieldsOrUndefined(fields.time),
      year: validateFieldsOrUndefined(fields.year),
      type: validateFieldsOrUndefined(fields.type),
    },
  })

  await updateRating(result.id)

  return res.json(result)
}

export default withPrismaError(handle)
