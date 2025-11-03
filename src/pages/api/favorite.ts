import { withPrismaError } from '@/lib/errorHandler'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const rows = await prisma.$queryRaw<
    { id: number; name: string; total_views: bigint }[]
  >`
    SELECT
      c.id,
      c.name,
      COUNT(v.id) AS total_views
    FROM "Category" AS c
    INNER JOIN "Media" AS m ON m."categoryId" = c.id
    INNER JOIN "View"  AS v ON v."mediaId"    = m.id
    GROUP BY c.id, c.name
    ORDER BY total_views DESC
    LIMIT 1;
  `

  const topRow = rows[0]

  const favoriteCategory = topRow
    ? {
        id: topRow.id,
        name: topRow.name,
        totalViews: Number(topRow.total_views),
      }
    : null

  return res.status(200).json({ favoriteCategory })
}

export default withPrismaError(handle)
