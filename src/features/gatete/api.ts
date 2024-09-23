import { Timer } from '../timer/Timer'
import { Gatete } from './Gatete'

export const getGatetes = (): Promise<Gatete[]> =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/gatetes`).then(
    async (response) => {
      await Timer.sleep(3000)
      return response.json()
    },
  )

export const createGatete = (gatete: Gatete): Promise<Gatete[]> =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/gatetes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gatete),
  }).then(async (response) => {
    await Timer.sleep(3000)
    return response.json()
  })
