import createView from '@/lib/api/View/create'
import Rater from '@/shared/components/Rater'
import Input from '@/shared/ui/Input'
import Textarea from '@/shared/ui/Textarea'

interface CreateExtraCommentaryProps {
  id: number | undefined
}

export default function CreateExtraCommentary({
  id,
}: CreateExtraCommentaryProps) {
  return (
    <form
      className="mb-4 flex flex-col gap-4"
      id="create-view-form"
      onSubmit={(e) => {
        e.preventDefault()

        console.log('Submiting form...')

        const formData = new FormData(e.currentTarget)

        console.log(id)

        if (id) {
          createView(formData, id)
        }
      }}
    >
      <Input text="Data" type="date" useTodayDate />
      <Textarea text="Comentário" placeholder="Digite um comentário" />
      <Rater />
    </form>
  )
}
