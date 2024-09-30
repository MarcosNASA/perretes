import { Adoption } from './Adopcion'

export const getAdoptions = (): Promise<Adoption[]> =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/adoptions`).then((response) =>
    response.json(),
  )

export const createAdoption = (adoption: Adoption): Promise<Adoption[]> =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/adoptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adoption),
  }).then(async (response) => {
    return response.json()
  })
