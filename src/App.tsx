import './App.css'
import { useState } from 'react'

import { Gatetes } from './features/gatete/components/Gatetes'
import { Perretes } from './features/perrete/components/Perretes'
import { Adopciones } from './features/adopciones/components/Adopciones'

type Tab = 'perretes' | 'gatetes' | 'adopciones'

const DEFAULT_TAB = 'perretes'

function App() {
  const [tab, setTab] = useState<Tab>(DEFAULT_TAB)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => {
            setTab('perretes')
          }}
        >
          Perretes
        </button>
        <button
          onClick={() => {
            setTab('gatetes')
          }}
        >
          Gatetes
        </button>
        <button
          onClick={() => {
            setTab('adopciones')
          }}
        >
          Adopciones
        </button>
      </div>
      {tab === 'perretes' && <Perretes />}
      {tab === 'gatetes' && <Gatetes />}
      {tab === 'adopciones' && <Adopciones />}
    </div>
  )
}

export default App
