import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
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

  const result = await prisma.movie.update({
    where: {
      id: Number(mediaid),
    },
    include: {
      views: true,
    },
    data: {
      name: fields.name![0],
    },
  })

  return res.json(result)
}

export default withPrismaError(handle)
