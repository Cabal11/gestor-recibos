import {z} from "zod"

export const contratoIdSchema = z.number({error: "El ID debe ser number"}).int().positive()

export const contratoSchema = z.object({
  tipo: z
    .string({ error: "El tipo debe ser una cadena de caracteres" })
    .min(1, { error: "Ingresa un tipo de contrato, servicio o pago" }),
  numero: z.string().min(1, { error: "Ingrese un numero de contrato" }),
});