export default function ModalForm() {
  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      console.log(formData)

      const response = await fetch('/api/post', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      console.log(data)
    } catch (error) {
      console.log('Erro dentro da requisição')
      console.error(error)
    }
  }

  return (
    <div className="p-5">
      <form
        action=""
        className="flex flex-col gap-3 border border-black p-2"
        onSubmit={submitContact}
      >
        <input type="text" name="name" id="" placeholder="Nome" required />
        <label htmlFor="">Tipo</label>
        <select name="type" required>
          <option value="MOVIE">Filme</option>
          <option value="SERIES">Série</option>
          <option value="DOCUMENTARY">Documentário</option>
          <option value="SHORT FILM">Curta</option>
        </select>
        <input type="text" name="movieDate" placeholder="Lançado em" required />
        <input type="text" name="time" placeholder="Duração" required />
        <input
          type="text"
          name="direction"
          placeholder="Dirigido por"
          required
        />
        <input type="text" name="viewDate" placeholder="Visto em" required />
        <div className="flex flex-col">
          <label htmlFor="">Poster</label>
          <input type="file" name="file" accept=".jpg" required />
        </div>
        <input type="text" name="movieValue" placeholder="Nota" required />
        <input
          type="text"
          name="commentary"
          placeholder="Comentário (opcional)"
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  )
}
