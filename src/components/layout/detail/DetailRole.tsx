import ImageWithFallback from '@/components/features/media-info/ImageFallback'
import { UserRoundIcon } from 'lucide-react'

interface DetailRoleProps {
  roles?: {
    name: {
      display_name: string
      avatars?: { url: string }[]
    }
    characters?: string[]
  }
}

function DetailRole({ roles }: DetailRoleProps) {
  if (!roles) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <h1>Elenco e Equipe</h1>
      <div className="w-full overflow-x-auto whitespace-nowrap py-2 pb-6">
        <div className="flex w-max gap-10">
          <div className="flex w-[120px] flex-col items-center gap-1">
            {roles.name.avatars && roles.name.avatars[0].url ? (
              <ImageWithFallback src={roles.name.avatars[0].url} />
            ) : (
              <div className="flex h-[169px] w-[113px] items-center justify-center rounded-lg bg-[#e5e5e5]">
                <UserRoundIcon className="h-[50px] w-[50px]" color="#cecece" />
              </div>
            )}
            <div className="flex h-[169px] w-[113px] items-center justify-center rounded-lg bg-[#e5e5e5]">
              <UserRoundIcon className="h-[50px] w-[50px]" color="#cecece" />
            </div>
            <h3 className="w-[113px] truncate text-center text-sm">
              e.name.display_name
            </h3>
            <h4 className="w-[113px] truncate text-center text-xs text-white/60">
              Como e.characters && e.characters[0]
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailRole
