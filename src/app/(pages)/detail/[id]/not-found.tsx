import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-gray-700">
        Página não encontrada
      </h2>
      <p className="mb-6 max-w-md text-gray-500">
        A página que você está procurando pode ter sido removida, renomeada ou
        talvez nunca tenha existido.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700"
      >
        <Home className="h-5 w-5" />
        Voltar para a página inicial
      </Link>
    </div>
  )
}
