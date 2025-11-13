import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type RouteHandler = (req: NextRequest) => Promise<NextResponse>

export function withPrismaError(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req)
    } catch (error) {
      console.error('Erro capturado:', error)

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: handlePrismaKnownError(error) },
          { status: 400 },
        )
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        return NextResponse.json(
          { error: 'Dados inválidos enviados.' },
          { status: 422 },
        )
      }

      if (error instanceof Prisma.PrismaClientInitializationError) {
        return NextResponse.json(
          { error: 'Erro ao inicializar o banco de dados.' },
          { status: 503 },
        )
      }

      if (error instanceof Prisma.PrismaClientRustPanicError) {
        return NextResponse.json(
          { error: 'Falha interna do Prisma.' },
          { status: 500 },
        )
      }
    }

    return NextResponse.json(
      { error: 'Ocorreu um erro interno no servidor.' },
      { status: 500 },
    )
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
