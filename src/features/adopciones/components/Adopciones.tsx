import { FormEvent } from 'react'
import { useGatetes } from '../../gatete/queries'
import { Spinner } from '../../timer/Spinner'
import { Adoption, AdoptionSchema } from '../Adopcion'
import { createAdoption } from '../api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const Adopciones = () => {
  const {
    data: gatetes = [],
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGatetes()

  const form = useForm<Adoption>({
    mode: 'onChange', // antes de la primera validación
    reValidateMode: 'onChange', // después de la primera validación
    resolver: zodResolver(AdoptionSchema),
  })
  const { register, getValues, formState } = form

  const sendAdoption = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)

    const firstName = String(formData.get('firstName'))
    const adopteeId = String(formData.get('adoptee'))

    const adoptee = gatetes.find((gatete) => gatete.id === adopteeId)

    if (!adoptee) return

    const adoption = {
      id: crypto.randomUUID(),
      adopter: {
        id: crypto.randomUUID(),
        firstName,
        lastName: '',
        age: 20,
        phone: '',
        email: '',
        address: '',
        description: '',
      },
      adoptees: [adoptee],
      isFirstTimeAdopter: false,
    } satisfies Adoption

    createAdoption(adoption)

    event.preventDefault()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <header>
        <h1 className="font-bold text-9xl">Adopciones</h1>
      </header>
      <form onSubmit={sendAdoption} className="flex flex-col gap-4">
        <label>
          Nombre:
          <input
            {...register('adopter.firstName')}
            placeholder="Introduce tu nombre..."
          />
        </label>
        <label>
          Selecciona el animal que te interesa:
          {isLoading && <Spinner />}
          {isError && <p>Error: {error.message}</p>}
          {isSuccess && (
            <select name="adoptee">
              {gatetes.map((gatete) => (
                <option key={gatete.id} value={gatete.id}>
                  {gatete.name}
                </option>
              ))}
            </select>
          )}
        </label>
        <button>Enviar solicitud</button>
      </form>

      <div>
        <pre className="text-start">
          {JSON.stringify({ ...getValues(), ...formState }, null, 2)}
        </pre>
      </div>
    </div>
  )
}
