import { z } from 'zod'

export const PerreteSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  breed: z.string(),
})
export type Perrete = z.infer<typeof PerreteSchema>

export const Perrete = {
  create: (name: string, breed: string): Perrete => ({
    id: crypto.randomUUID(),
    name,
    breed,
  }),
}
