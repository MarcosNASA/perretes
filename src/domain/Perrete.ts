export type Perrete = {
  id: string
  name: string
  breed: string
}

export const Perrete = {
  create: (name: string, breed: string): Perrete => ({
    id: crypto.randomUUID(),
    name,
    breed,
  }),
}
