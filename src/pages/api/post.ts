import { NextApiRequest, NextApiResponse } from 'next'
import { Fields, Files, IncomingForm } from 'formidable'
import path from 'path'
// import prisma from '@/lib/prisma'

export const config = {
  api: {
    bodyParser: false,
  },
}

// POST /api/read
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const publicDir = path.join(process.cwd(), 'public')

    const { files }: { fields: Fields; files: Files } = await new Promise(
      (resolve, reject) => {
        const form = new IncomingForm({
          uploadDir: publicDir,
          keepExtensions: true,
        })

        form.parse(req, (err, fields, files) => {
          if (err) {
            return reject(err)
          }
          resolve({ fields, files })
        })
      },
    )

    const file = files.file

    const publicUrl = `/uploads/${path.basename(file![0].filepath)}`

    res.status(200).json(publicUrl)
  } catch (error) {
    console.error(error)
    res.status(405).json({ error: 'Method Not Allowed' })
  }

  // const result = await prisma.movie.create({
  //   data: {
  //     date: '',
  //     direction: '',
  //     img: '',
  //     name: '',
  //     time: '',
  //     type: '',
  //     value: 2,
  //     views: {
  //       create: {
  //         date: '21',
  //         commentary: '',
  //       },
  //     },
  //   },
  // })

  // return res.json(result)
}
