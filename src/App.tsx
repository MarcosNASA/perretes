import { useEffect, useState } from 'react'
import './App.css'
import { Perrete } from './domain/Perrete'

function App() {
  const [perretes, setPerretes] = useState<Perrete[]>([])

  useEffect(() => {
    console.log(import.meta.env.VITE_API_BASE_URL)
    fetch(`${import.meta.env.VITE_API_BASE_URL}/perretes`)
      .then((response) => response.json())
      .then(setPerretes)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <header>
        <h1 className="text-9xl font-bold">Perretes</h1>
      </header>
      <ul className="flex flex-col gap-4 list-disc">
        {perretes.map((perrete) => (
          <li key={perrete.id} className="text-4xl">
            {perrete.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
