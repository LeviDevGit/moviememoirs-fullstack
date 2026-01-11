import {
  FilterIcon,
  LayersIcon,
  SortAscIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import RadioGroup from '@/components/ui/RadioGroup'
import { useContext, useEffect, useState } from 'react'
import readCategory from '@/api/Category/read'
import {
  GlobalContext,
  initialFilterContent,
  MediaFilters,
} from '@/providers/global'
import { useModal } from '@/components/ui/Modal/ModalRoot'

type Category = {
  id: string
  name: string
  proportion: number
}

function FilterMenu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [draftFilter, setDraftFilter] =
    useState<MediaFilters>(initialFilterContent)

  useEffect(() => {
    async function load() {
      const data = await readCategory()
      setCategories(data)
    }

    load()
  }, [])

  const global = useContext(GlobalContext)

  if (!global) {
    throw new Error('GlobalContext is undefined')
  }

  const { setFilterContent, setDirection, filterContent } = global

  const { setOpen } = useModal()

  useEffect(() => {
    setDraftFilter(filterContent)
  }, [filterContent])

  return (
    <div className="flex w-[600px] flex-col justify-between gap-4 rounded border-gray-600 text-sm">
      <div className="flex w-full items-center gap-2 border-b-[1px] border-gray-600/50 pb-4">
        <div className="rounded-lg bg-[#8B5CF6]/10 p-2 text-[#8B5CF6]">
          <FilterIcon size={20} />
        </div>
        <div>
          <h2 className="text-xl font-medium">Filtros & Ordernar</h2>
          <p className="text-xs text-text-muted">
            Refine sua busca na biblioteca
          </p>
        </div>
      </div>
      <form
        className="flex flex-col gap-8 border-b-[1px] border-gray-600/50 pb-4"
        id="form-filters-media"
        onSubmit={(e) => {
          e.preventDefault()

          setFilterContent(draftFilter)

          setDirection(0)

          setOpen(false)
        }}
      >
        <section className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-text-muted">
            <LayersIcon size={14} /> CATEGORIAS
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <RadioGroup
              value="Todas"
              name="category"
              checked={draftFilter.category === 'Todas'}
              onChange={() => {
                setDraftFilter((prev) => ({ ...prev, category: 'Todas' }))
              }}
            >
              <div>
                <span>Todas as Mídias</span>
              </div>
            </RadioGroup>
            {categories &&
              categories.map((category) => (
                <RadioGroup
                  key={category.id}
                  value={category.name}
                  name="category"
                  onChange={() => {
                    setDraftFilter((prev) => ({
                      ...prev,
                      category: category.name,
                    }))
                  }}
                  checked={draftFilter.category === category.name}
                >
                  <div>
                    <span>{category.name}</span>
                  </div>
                </RadioGroup>
              ))}
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-text-muted">
            <SortAscIcon size={14} /> ORDENAÇÃO
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <RadioGroup
              value="recent"
              name="order"
              spacing="gap"
              checked={draftFilter.order === 'recent'}
              onChange={() => {
                setDraftFilter((prev) => ({ ...prev, order: 'recent' }))
              }}
            >
              <span>
                <ClockIcon size={16} />
              </span>
              <p>Adicionado Recentemente</p>
            </RadioGroup>
            <RadioGroup
              value="release"
              name="order"
              spacing="gap"
              checked={draftFilter.order === 'release'}
              onChange={() => {
                setDraftFilter((prev) => ({ ...prev, order: 'release' }))
              }}
            >
              <CalendarIcon size={16} />
              <p>Data de Lançamento</p>
            </RadioGroup>
            <RadioGroup
              value="rating_desc"
              name="order"
              spacing="gap"
              checked={draftFilter.order === 'rating_desc'}
              onChange={() => {
                setDraftFilter((prev) => ({ ...prev, order: 'rating_desc' }))
              }}
            >
              <StarIcon size={16} />
              <p>Maior Nota</p>
            </RadioGroup>
            <RadioGroup
              value="rating_asc"
              name="order"
              spacing="gap"
              checked={draftFilter.order === 'rating_asc'}
              onChange={() => {
                setDraftFilter((prev) => ({ ...prev, order: 'rating_asc' }))
              }}
            >
              <StarIcon size={16} />
              <p>Menor Nota</p>
            </RadioGroup>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-text-muted">
            <FilterIcon size={14} /> ESPECIFICAÇÕES
          </h3>
          <span className="text-xs">Diretor / Criador</span>
          <Input
            placeholder="Ex: Christopher Nolan"
            background="modal"
            icon={<UserIcon size={16} color="#9CA3AF" />}
            text="creator"
            withoutLabel
            value={draftFilter.creator}
            onChange={(e) =>
              setDraftFilter((prev) => ({ ...prev, creator: e.target.value }))
            }
          />
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs">Ano de Lançamento</span>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="De"
                  icon={<CalendarIcon size={16} color="#9CA3AF" />}
                  text="fromYear"
                  withoutLabel
                  background="modal"
                  value={draftFilter.fromYear}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({
                      ...prev,
                      fromYear: e.target.value,
                    }))
                  }
                />
                <span>-</span>
                <Input
                  placeholder="Até"
                  text="toYear"
                  withoutLabel
                  background="modal"
                  value={draftFilter.toYear}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({
                      ...prev,
                      toYear: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-2">
              <label
                htmlFor="minRating"
                className="flex justify-between text-xs"
              >
                <span className="">Nota Mínima</span>
                <span className="bg-primary/20 px-2 text-primary">
                  {draftFilter.minRating}/5
                </span>
              </label>
              <div className="flex h-full items-center justify-center gap-4 rounded-lg border border-gray-600 bg-background shadow-sm">
                <StarIcon size={16} className="text-yellow-400" />
                <input
                  type="range"
                  id="minRating"
                  name="minRating"
                  min="0"
                  max="5"
                  step="0.5"
                  value={draftFilter.minRating}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({
                      ...prev,
                      minRating: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default FilterMenu
