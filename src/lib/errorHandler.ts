import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export function withPrismaError(
  handler: (req: NextApiRequest, res: NextApiResponse) => unknown,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res)
    } catch (error) {
      console.error('Erro capturado:', error)

      // Tratamento de erros do Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ error: handlePrismaError(error) })
      }

      // Tratamento de erros genéricos
      return res
        .status(500)
        .json({ error: 'Ocorreu um erro interno no servidor.' })
    }
  }
}

/**
 * Função para formatar erros conhecidos do Prisma.
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
  switch (error.code) {
    case 'P2002':
      return 'Registro já existe no banco de dados.'
    case 'P2025':
      return 'Registro não encontrado.'
    default:
      return 'Erro no banco de dados.'
  }
}
