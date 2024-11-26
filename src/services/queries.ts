import prisma from '@/lib/prisma'

const readMovie = async () => {
  'use server'

  const start = await prisma.view.findMany({
    take: 5,

    include: {
      movie: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  const post = await prisma.view.findFirst({
    where: {
      movieId: 1,
    },
    include: {
      movie: true,
    },
  })

  const combinedResults = [post!, ...start]

  return combinedResults
}

const createMovie = async () => {
  'use server'

  //   await prisma.movie.create({
  //     data: {
  //       id: movie.id,
  //       name: movie.name,
  //       date: movie.date,
  //       time: movie.time,
  //       direction: movie.direction,
  //       value: movie.value,
  //       img: movie.img,
  //       type: movie.type.toUpperCase(),
  //     },
  //   })
  // }

  // for (const movie of movies.movies) {
  //   for (const view of movie.view) {
  //     const [day, month, year] = view.split('/').map(Number)
  //     const dateObject = new Date(year, month - 1, day)

  //     await prisma.view.create({
  //       data: {
  //         commentary: '',
  //         movieId: movie.id,
  //         date: dateObject,
  //       },
  //     })
  //   }
  // }

  console.log('Terminando...')
}
// const updateMovie = async () => {
//   'use server'

//   const { default: movies } = await import('../utils/movies.json')

//   for (const movie of movies.movies) {
//     await prisma.view.update({
//       where: {
//         movieId: movie.id,
//       },
//       data: {
//         date: movie.view,
//       },
//     })
//   }
// }

// const deleteMovie = async () => {
//   'use server'

//   await prisma.view.deleteMany()
// }

// export { createMovie, deleteMovie, readMovie, updateMovie }

export { createMovie, readMovie }
