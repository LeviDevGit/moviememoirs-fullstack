import { PrismaClient } from '@prisma/client'

// Inicialize o Prisma Client
const prisma = new PrismaClient()

async function main() {
  // Importa o JSON diretamente
  const { movies } = await import('./movies.json')

  // Itera sobre os filmes no JSON e insere no banco de dados
  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        name: movie.name,
        date: movie.date,
        time: movie.time,
        direction: movie.direction,
        value: movie.value,
        img: movie.img,
        type: movie.type,
        views: {
          create: movie.view.map((viewDate: string) => ({
            // Converte o formato "Dia/Mês/Ano" para DateTime
            date: convertToDate(viewDate),
          })),
        },
      },
    })
  }
  console.log('Seed concluído com sucesso!')
}

// Função para converter "Dia/Mês/Ano" para DateTime
function convertToDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day) // O mês é 0-based no objeto Date
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Erro ao executar o seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
