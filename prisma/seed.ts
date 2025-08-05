import { PrismaClient } from '@prisma/client'

// Inicialize o Prisma Client
const prisma = new PrismaClient()

export enum ProportionType {
  SQUARE = 'SQUARE',
  RECTANGLE = 'RECTANGLE',
}

export enum SectionType {
  PARAGRAPH = 'PARAGRAPH',
  TAG = 'TAG',
  IMAGE = 'IMAGE',
}

async function main() {
  // Importa o JSON diretamente
  const { default: movies } = await import('./Movie.json')
  const { default: views } = await import('./View.json')

  const categoryCache = new Map<string, number>()

  // Itera sobre os filmes no JSON e insere no banco de dados
  for (const movie of movies) {
    let categoryId: number

    if (categoryCache.has(movie.type.toLowerCase())) {
      categoryId = categoryCache.get(movie.type.toLowerCase())!
    } else {
      // Verifica se categoria já existe no banco
      let category = await prisma.category.findUnique({
        where: {
          name: movie.type.toLowerCase(),
        },
      })

      // Se não existir, cria com todas as seções do enum
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: movie.type.toLowerCase(),
            proportion: ProportionType.RECTANGLE,
            sections: {
              create: Object.values(SectionType).map((section) => ({
                name: section.charAt(0) + section.slice(1).toLowerCase(),
                type: section as SectionType,
              })),
            },
          },
        })
      }

      categoryId = category.id
      categoryCache.set(movie.type, categoryId)
    }

    await prisma.media.create({
      data: {
        id: movie.id,
        name: movie.name,
        year: movie.year,
        time: movie.time,
        creator: movie.direction,
        value: movie.value,
        img: movie.img,
        categoryId,
      },
    })
  }

  for (const view of views) {
    // Verifica se o media (pelo id do movie) realmente existe
    const media = await prisma.media.findUnique({
      where: { id: view.movieId },
    })

    if (!media) {
      console.warn(
        `Media com id ${view.movieId} não encontrado para a view ${view.id}`,
      )
      continue
    }

    await prisma.view.create({
      data: {
        date: new Date(view.date), // date é timestamp
        commentary: view.commentary || null,
        rating: view.rating,
        mediaId: view.movieId,
      },
    })
  }
  console.log('Seed concluído com sucesso!')
}

// Função para converter "Dia/Mês/Ano" para DateTime
// function convertToDate(dateStr: Date): Date {
//   const [day, month, year] = dateStr.split('/').map(Number)
//   return new Date(year, month - 1, day) // O mês é 0-based no objeto Date
// }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Erro ao executar o seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
