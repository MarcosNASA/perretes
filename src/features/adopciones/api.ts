import { Timer } from '../timer/Timer'
import { Adoption } from './Adopcion'

export const createAdoption = (adoption: Adoption): Promise<Adoption[]> =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/adoptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adoption),
  }).then(async (response) => {
    await Timer.sleep(3000)
    return response.json()
  })
