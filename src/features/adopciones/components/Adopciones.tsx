import { useGatetes } from '../../gatete/queries'
import { Spinner } from '../../timer/Spinner'
import { Adoption, AdoptionSchema } from '../Adopcion'
import { createAdoption } from '../api'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gatete } from '../../gatete/Gatete'

export const Adopciones = () => {
  const {
    data: gatetes = [],
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGatetes()

  const form = useForm<Adoption>({
    mode: 'onSubmit', // antes de la primera validación
    reValidateMode: 'onChange', // después de la primera validación
    resolver: zodResolver(AdoptionSchema),
    defaultValues: Adoption.default(),
  })
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = form

  const fieldArray = useFieldArray({ control, name: 'adoptees' })
  const { fields: adoptees, append, remove } = fieldArray

  const sendAdoption = handleSubmit(
    (data) => {
      console.log(data)
      createAdoption(data)
    },
    (errors) => {
      console.log(errors)
      console.log(getValues())
    },
  )

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
          Email:
          <Controller
            control={control}
            name="adopter.email"
            render={({ field }) => (
              <input {...field} placeholder="Introduce tu email..." />
            )}
          />
        </label>
        <label>
          Selecciona el animal que te interesa:
          {isLoading && <Spinner />}
          {isError && <p>Error: {error.message}</p>}
          {isSuccess && (
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  append(Gatete.default())
                }}
              >
                Añadir
              </button>
              {adoptees.map((adoptee, index) => (
                <div key={adoptee.id} className="flex gap-4">
                  <Controller
                    name={`adoptees.${index}`}
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        value={field.value?.id}
                        onChange={(event) => {
                          const id = event.target.value
                          const gatete = gatetes.find((gato) => gato.id === id)
                          if (!gatete) return
                          setValue(
                            `adoptees.${index}`,
                            Gatete.create(gatete.name, gatete.color),
                          )
                        }}
                      >
                        {gatetes.map((gatete) => (
                          <option key={gatete.id} value={gatete.id}>
                            {gatete.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      remove(index)
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <p className="text-red-300">{errors.adoptees?.root?.message}</p>
            </div>
          )}
        </label>
        <button>Enviar solicitud</button>
      </form>
    </div>
  )
}
