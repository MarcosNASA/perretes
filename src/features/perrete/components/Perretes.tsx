import { useEffect, useState } from 'react'
import { Perrete } from '../Perrete'

export const Perretes = () => {
  const [perretes, setPerretes] = useState<Perrete[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/perretes`)
      .then((response) => response.json())
      .then(setPerretes)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <header>
        <h1 className="font-bold text-9xl">Perretes</h1>
      </header>
      <ul className="flex flex-col gap-4 list-disc">
        {perretes.map((perrete) => (
          <li key={perrete.id} className="flex flex-col gap-2">
            <span className="text-4xl">{perrete.name}</span>
            <span className="text-2xl text-gray-600">{perrete.breed}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
