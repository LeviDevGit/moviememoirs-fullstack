import { Input } from '../ui/Inputs'
import Select from '../ui/Select'

function FormCategory() {
  return (
    <div className="rounded-lg bg-background p-5">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-xl font-medium">
          Adicionar <span className="text-primary">Categoria</span>
        </h1>
        <p className="text-xs text-text-200">
          Defina os formatos que farão parte do seu acervo.
        </p>
      </div>
      <form action="" className="flex flex-col gap-4">
        <Input disabled />
        <div className="flex items-center justify-between">
          <Input placeholder="Nome da seção" />
          <Select>
            <option value=""></option>
          </Select>
          <button className="mt-0.5 w-full rounded border-gray-600 bg-transparent text-white shadow-sm sm:text-sm">
            Salvar
          </button>
        </div>
        <button className="mt-0.5 w-full rounded border border-gray-600 bg-transparent text-white shadow-sm sm:text-sm">
          Adicionar nova seção
        </button>
        <span className="flex items-center">
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
          <span className="shrink-0 px-4 text-gray-900 dark:text-white">
            Proporção
          </span>
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
        </span>
        <fieldset className="flex justify-between">
          <div>
            <input
              type="radio"
              name="DeliveryOption"
              value="DeliveryStandard"
              id="DeliveryStandard"
              className="peer sr-only"
            />
            <label
              htmlFor="DeliveryStandard"
              className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              <p className="text-gray-700 dark:text-gray-200">2:3</p>
              <p className="text-gray-900 dark:text-white">Retangular</p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="DeliveryOption"
              value="DeliveryPriority"
              id="DeliveryPriority"
              className="peer sr-only"
            />
            <label
              htmlFor="DeliveryPriority"
              className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              <p className="text-gray-700 dark:text-gray-200">Quadrada</p>
              <p className="text-gray-900 dark:text-white">1:1</p>
            </label>
          </div>
        </fieldset>
        <footer className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Done
          </button>
        </footer>
      </form>
    </div>
  )
}

export default FormCategory
