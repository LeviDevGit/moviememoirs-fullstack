import { PlusIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  getAvailableOptions,
  handleAddSelect,
  handleChangeSelect,
  handleRemoveSelect,
} from './category-section'
import createCategory from '@/api/Category/create'
import readCategory from '@/api/Category/read'
import { MediaType } from '@/types/interfaces'
import { ProportionType } from '../../../../../prisma/seed'
import Datalist from '@/components/ui/Datalist'
import Divider from '@/components/ui/Divider'
import Select from '@/components/ui/Select'
import RadioGroup from '@/components/ui/RadioGroup'

const OPTIONS = ['Sinopse', 'Tags', 'Elenco']

export interface CategoryBody {
  name: string
  proportion: ProportionType
  sectionName: string[]
}

function FormCategoryCreate() {
  const [sectionOptions, setSectionOptions] = useState<string[]>([])
  const [resultCategory, setResultCategory] = useState()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log('8999')
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const name = formData.get('categoryName') as string
    const proportion = formData.get('categoryProportion') as ProportionType
    const sectionNameList = sectionOptions.map((_, index) => {
      const value = formData.get(index.toString())
      if (typeof value !== 'string') {
        throw new Error(`Valor inválido no select de índice ${index}`)
      }
      return value
    })

    console.log('8992', name, proportion)

    if (name && proportion) {
      const categoryBody: CategoryBody = {
        name,
        proportion,
        sectionName: sectionNameList,
      }

      console.log(categoryBody)
      const result = await createCategory(categoryBody)
      setResultCategory(result)
      console.log(result)
      console.log(resultCategory)
    }
  }
  // useEffect(() => {
  // }, [sectionOptions, resultCategory])

  const [inputValue, setInputValue] = useState('')

  const [categories, setCategories] = useState<MediaType[]>([])

  const [preExistedInput, setPreExistedInput] = useState<MediaType | string>('')

  useEffect(() => {
    const match = categories.find((item) => item.name === inputValue)
    setPreExistedInput(match || '')
  }, [inputValue, categories])

  useEffect(() => {
    async function handleReadCategory() {
      setCategories(await readCategory())
    }
    handleReadCategory()
  }, [])

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Datalist
          placeholder="Inserir nome"
          name="categoryName"
          text="Nome categoria"
          options={categories}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Divider>Extras seções</Divider>
        {sectionOptions.map((value, index) => (
          <div className="flex items-center gap-4" key={index}>
            <Select
              className="w-full"
              name={index.toString()}
              onChange={(e) =>
                handleChangeSelect(
                  e.target.value,
                  index,
                  sectionOptions,
                  setSectionOptions,
                )
              }
              value={value}
            >
              <option key={value} value={value}>
                {value}
              </option>
              {getAvailableOptions(OPTIONS, sectionOptions).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {sectionOptions.length > 0 && (
              <button
                className="mt-0.5 h-full w-fit rounded text-white shadow-sm sm:text-sm"
                type="button"
                onClick={() =>
                  handleRemoveSelect(value, sectionOptions, setSectionOptions)
                }
              >
                <XIcon />
              </button>
            )}
          </div>
        ))}
        {sectionOptions.length < OPTIONS.length && (
          <button
            className="mt-0.5 flex w-fit items-center gap-2 rounded bg-transparent text-start text-white shadow-sm sm:text-sm"
            type="button"
            onClick={() =>
              handleAddSelect(sectionOptions, setSectionOptions, OPTIONS)
            }
          >
            <PlusIcon />
            <span>Adicionar</span>
          </button>
        )}
        <Divider>Proporção</Divider>
        <fieldset className="flex gap-4">
          <RadioGroup
            value="RECTANGLE"
            name="categoryProportion"
            checked={
              preExistedInput !== '' &&
              (preExistedInput as MediaType).proportion === 'RECTANGLE'
            }
          >
            <p className="text-gray-700 dark:text-gray-200">2:3</p>
            <p className="text-gray-900 dark:text-white">Retangular</p>
          </RadioGroup>
          <RadioGroup
            value="SQUARE"
            name="categoryProportion"
            checked={
              preExistedInput !== '' &&
              (preExistedInput as MediaType).proportion === 'SQUARE'
            }
          >
            <p className="text-gray-700 dark:text-gray-200">Quadrada</p>
            <p className="text-gray-900 dark:text-white">1:1</p>
          </RadioGroup>
        </fieldset>
        <footer className="mt-6 flex justify-between">
          {preExistedInput !== '' && (
            <button className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-500">
              Deletar
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </footer>
      </form>
    </div>
  )
}

export default FormCategoryCreate
