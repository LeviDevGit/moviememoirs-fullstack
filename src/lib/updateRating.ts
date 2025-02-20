import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateRating(movieId: number) {
  const ratings = await prisma.view.findMany({
    where: { movieId },
    select: { rating: true },
    orderBy: { rating: 'asc' },
  })

  if (ratings.length === 0) {
    await prisma.movie.update({
      where: { id: movieId },
      data: { value: null },
    })
    return
  }

  let median: number
  const middle = Math.floor(ratings.length / 2)

  if (ratings.length % 2 === 0) {
    median = (ratings[middle - 1].rating + ratings[middle].rating) / 2
  } else {
    median = ratings[middle].rating
  }

  // Atualiza a nota do filme com a mediana calculada
  await prisma.movie.update({
    where: { id: movieId },
    data: { value: median },
  })
}

export default updateRating
