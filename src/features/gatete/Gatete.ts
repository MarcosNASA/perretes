import { z } from 'zod'

export const GateteSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string(),
})
export type Gatete = z.infer<typeof GateteSchema>

export const Gatete = {
  create: (name: string, color: string): Gatete => ({
    id: crypto.randomUUID(),
    name,
    color,
  }),
}
