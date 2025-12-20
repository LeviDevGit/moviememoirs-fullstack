import createView from '@/api/View/create'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Rater from '@/components/shared/Rater'

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
      <h1>Criar Comentário Extra</h1>
      <div className="flex items-center gap-4">
        <h2>Minha nota:</h2>
        <Rater />
      </div>
      <div className="flex items-center gap-4">
        <h2>Assistido em:</h2>
        <Input text="Data" type="date" useTodayDate withoutLabel />
      </div>
      <Textarea
        text="Comentário"
        placeholder="Digite um comentário"
        withoutLabel
      />
    </form>
  )
}
