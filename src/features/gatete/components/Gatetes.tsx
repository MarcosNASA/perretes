import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGatete } from '../api'
import { Gatete } from '../Gatete'
import { useGatetes } from '../queries'

export const Gatetes = () => {
  const queryClient = useQueryClient()

  const {
    data: gatetes = [],
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGatetes()

  const { mutateAsync: addGatete, isPending } = useMutation({
    mutationKey: ['gatetes'],
    mutationFn: createGatete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['gatetes'],
      })
    },
  })

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <header>
        <h1 className="font-bold text-9xl">Gatetes</h1>
      </header>

      <form
        onSubmit={(event) => {
          const form = event.target
          if (!(form instanceof HTMLFormElement)) return
          const formData = new FormData(form)
          const name = String(formData.get('cat-name'))
          const color = String(formData.get('cat-color'))
          const gatete = Gatete.create(name, color)
          addGatete(gatete)

          event.preventDefault()
        }}
        className="flex flex-col gap-2 text-black"
      >
        <label>
          Nombre:
          <input name="cat-name" placeholder="Introduce un nombre..." />
        </label>
        <label>
          Color:
          <input name="cat-color" placeholder="Introduce un color..." />
        </label>
        <button disabled={isPending}>
          {isPending && 'Añadiendo...'}
          {!isPending && 'Añadir gatete'}
        </button>
      </form>

      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && (
        <ul className="flex flex-col gap-4 list-disc">
          {gatetes.map((gatete) => (
            <li key={gatete.id} className="flex flex-col gap-2">
              <span className="text-4xl">{gatete.name}</span>
              <span className="text-2xl text-gray-600">{gatete.color}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
