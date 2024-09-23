import { z } from 'zod'
import { GateteSchema } from '../gatete/Gatete'
import { PerreteSchema } from '../perrete/Perrete'

export const AdopterSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  description: z.string(),
})
export type Adopter = z.infer<typeof AdopterSchema>

export const AdopteeSchema = z.union([PerreteSchema, GateteSchema])
export type Adoptee = z.infer<typeof AdopteeSchema>

export const AdoptionSchema = z.object({
  id: z.string().uuid(),
  adopter: AdopterSchema,
  adoptees: z.array(AdopteeSchema),
  isFirstTimeAdopter: z.boolean(),
})
export type Adoption = z.infer<typeof AdoptionSchema>
