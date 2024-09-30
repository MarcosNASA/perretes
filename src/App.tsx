import './App.css'
import { useState } from 'react'

import { Gatetes } from './features/gatete/components/Gatetes'
import { Perretes } from './features/perrete/components/Perretes'
import { Adopciones } from './features/adopciones/components/Adopciones'
import { Analytics } from './features/analytics/components/Analytics'

type Tab = 'perretes' | 'gatetes' | 'adopciones' | 'analytics'

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
        <button
          onClick={() => {
            setTab('analytics')
          }}
        >
          Analytics
        </button>
      </div>
      {tab === 'perretes' && <Perretes />}
      {tab === 'gatetes' && <Gatetes />}
      {tab === 'adopciones' && <Adopciones />}
      {tab === 'analytics' && <Analytics />}
    </div>
  )
}

export default App
