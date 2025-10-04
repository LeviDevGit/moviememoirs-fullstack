import { Prisma } from '@prisma/client'
import type { NextApiHandler } from 'next'

export function withPrismaError(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      return await handler(req, res)
    } catch (error) {
      console.error('Erro capturado:', error)

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ error: handlePrismaKnownError(error) })
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(422).json({ error: 'Dados inválidos enviados.' })
      }

      if (error instanceof Prisma.PrismaClientInitializationError) {
        return res
          .status(503)
          .json({ error: 'Erro ao inicializar o banco de dados.' })
      }

      if (error instanceof Prisma.PrismaClientRustPanicError) {
        return res.status(500).json({ error: 'Falha interna do Prisma.' })
      }

      return res
        .status(500)
        .json({ error: 'Ocorreu um erro interno no servidor.' })
    }
  }
}

function handlePrismaKnownError(error: Prisma.PrismaClientKnownRequestError) {
  switch (error.code) {
    case 'P2002':
      return 'Registro já existe no banco de dados.'
    case 'P2025':
      return 'Registro não encontrado.'
    default:
      return `Erro no banco de dados: ${error.message}`
  }
}
