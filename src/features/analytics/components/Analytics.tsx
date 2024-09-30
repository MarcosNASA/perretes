import { useAdoptions } from '../../adopciones/queries'

export const Analytics = () => {
  const { data: adoptions = [] } = useAdoptions()

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <header>
        <h1 className="font-bold text-9xl">Analytics</h1>
      </header>

      {adoptions.map((adoption) => (
        <div key={adoption.id}>
          <p>
            {adoption.adopter.firstName} {adoption.adopter.lastName}
          </p>
          <p>{adoption.adopter.age}</p>
          <p>{adoption.adopter.phone}</p>
          <p>{adoption.adopter.email}</p>
          <p>{adoption.adopter.address}</p>
          <p>{adoption.adopter.description}</p>
        </div>
      ))}
    </div>
  )
}
