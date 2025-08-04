import Visualization from './Visualization'
import { Trash } from 'lucide-react'
import Rater from '@/components/shared/Rater'
import Image from 'next/image'
import { useState } from 'react'
import Select from '../../ui/Select'
import Input from '../../ui/Input'

interface dataProps {
  id: number
  year: string
  name: string
  time: string
  direction: string
  value: number
  img: string
  type: string
  imdb: string
  views: {
    id: number
    date: Date
    commentary: string | null
    rating: number
    movieId: number
  }[]
}

interface LastProp {
  id: number
  date: Date
  commentary: string | null

  rating: number
  movieId: number
}

interface ModifyProps {
  data: dataProps
  last: LastProp | undefined
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean
}

async function deleteView(
  id: number,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  refresh: boolean,
) {
  try {
    await fetch(`/api/view/delete?viewId=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    setRefresh(!refresh)
  } catch (error) {
    console.log(error)
  }
}

interface confirmModalComponentProps {
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  id: number
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean
}

function ConfirmModalComponent({
  setConfirmModal,
  id,
  setRefresh,
  refresh,
}: confirmModalComponentProps) {
  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-black/90">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col gap-6 rounded-lg bg-[#27272a] p-8">
          <div className="flex flex-col items-center gap-4">
            <Trash className="h-[50px] w-[50px]" />
            <p className="text-lg text-white/90">
              Você quer realmente apagar essa visualização?
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-10">
            <button
              onClick={() => {
                setConfirmModal(false)
              }}
              className="rounded-lg border px-4 py-2 text-sm font-bold"
            >
              Não, cancelar
            </button>
            <button
              onClick={() => {
                deleteView(id, setRefresh, refresh)
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold"
            >
              Sim, quero apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Modify({ data, last, setRefresh, refresh }: ModifyProps) {
  const [confirmModal, setConfirmModal] = useState(false)

  return (
    <div className="relative flex w-full gap-3">
      <div className="flex w-[500px] flex-col items-center rounded-lg bg-[#18181B] p-4">
        <div className="mb-5 flex w-full items-center justify-between gap-2">
          <div className="h-[330px] w-[220px] self-start shadow-cardShadow">
            <Image
              alt="Poster"
              src={data.img}
              width={220}
              height={330}
              priority
              className="h-[330px] w-[220px] rounded-md object-cover object-center shadow-imageShadow"
            />
          </div>
          <div className="flex max-h-[330px] flex-1 flex-col items-center gap-1">
            <h2 className="w-full text-center text-base">Último comentário</h2>
            <hr className="w-full border border-[#ffffff4d]" />
            {last && (
              <div
                key={last.id}
                className="flex w-full items-center justify-between gap-6"
              >
                {confirmModal && (
                  <ConfirmModalComponent
                    setConfirmModal={setConfirmModal}
                    id={last.id}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )}
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col gap-1 bg-[#18181B] p-1">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <h3 className="w-[160px] truncate">{data.name}</h3>
                        <h4 className="text-white/70">{data.year}</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmModal(true)
                        }}
                      >
                        <Trash className="w-[1.5em]" />
                      </button>
                    </div>
                    <Rater
                      defaultValue={data.value}
                      width="w-[100px] mb-3"
                      readonly={true}
                    />
                    <h2 className="text-white/50">
                      Assistido em{' '}
                      {new Date(last.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </h2>
                    <div className="overflow-y-scroll pr-3">
                      <p className="trucante max-h-[150px] text-white/90">
                        {last.commentary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full rounded-lg bg-[#18181B] p-2">
          <h2 className="text-lg">Histórico</h2>
          <hr className="w-full border border-[#ffffff4d]" />
          <div className="flex h-[100px] flex-col overflow-y-auto">
            {data.views
              .map((e) => (
                <div
                  key={`${e.id}`}
                  className="flex w-full items-center justify-between gap-6"
                >
                  {confirmModal && (
                    <ConfirmModalComponent
                      setConfirmModal={setConfirmModal}
                      id={e.id}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  )}
                  <div className="flex w-full flex-col gap-2 py-5 pr-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-white/60">
                        Assistido em{' '}
                        {new Date(e.date).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmModal(true)
                        }}
                      >
                        <Trash className="w-[1.5em]" />
                      </button>
                    </div>
                    <Rater
                      defaultValue={e.rating}
                      width="w-[80px]"
                      readonly={true}
                    />
                    <div>
                      <p>{e.commentary}</p>
                    </div>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Input text="Nome" placeholder={data.name} />
        <div className="flex items-center justify-between gap-6">
          <Select defaultValue={data.type} text="Tipo">
            <option value="MOVIE">Filme</option>
            <option value="SERIES">Série</option>
            <option value="DOCUMENTARY">Documentário</option>
            <option value="SHORT FILM">Curta</option>
          </Select>
          <Input text="Lançamento" placeholder={data.year} />
        </div>
        <div className="flex items-center justify-between gap-6">
          <Input text="Duração" placeholder={data.time} />
          <Input text="Diretor(a)" placeholder={data.direction} />
        </div>
        <div className="flex items-center justify-between gap-6">
          <Input text="Id" placeholder={data.imdb} />
        </div>
        <Visualization />
      </div>
    </div>
  )
}

export default Modify
