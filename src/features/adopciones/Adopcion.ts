import { z } from 'zod'
import { GateteSchema } from '../gatete/Gatete'
import { PerreteSchema } from '../perrete/Perrete'

export const AdopterSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  description: z.string(),
})
export type Adopter = z.infer<typeof AdopterSchema>

export const AdopteeSchema = z.union([PerreteSchema, GateteSchema])
export type Adoptee = z.infer<typeof AdopteeSchema>

export const AdoptionSchema = z.object({
  id: z.string().uuid(),
  adopter: AdopterSchema,
  adoptees: z
    .array(AdopteeSchema)
    .min(2, { message: 'Eres un soso, adopta por lo menos a 2 gatetes' }),
  isFirstTimeAdopter: z.boolean(),
})
export type Adoption = z.infer<typeof AdoptionSchema>

export const Adoption = {
  default: () => {
    return {
      id: crypto.randomUUID(),
      adopter: {
        id: crypto.randomUUID(),
        firstName: '',
        lastName: '',
        age: 0,
        phone: '',
        email: '',
        address: '',
        description: '',
      },
      adoptees: [],
      isFirstTimeAdopter: false,
    } as const satisfies Adoption
  },
}
