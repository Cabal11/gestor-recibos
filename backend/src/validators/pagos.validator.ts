import { z } from "zod";

export const pagosIdSchema = z.number({error: "El ID debe ser number"}).int().positive()

export const pagosSchema = z.object({
  tipo: z.string({error: "El tipo debe ser una cadena de caracteres"}).min(1, { error: "Se espera un tipo de pago" }),
  fecha: z.string({error: "La fecha debe ser de tipo string"}),
  monto: z
    .number({ error: "El monto debe ser un numero" })
    .positive({ error: "El monto debe ser mayor a cero" }),
  estado: z
    .string()
    .toLowerCase()
    .pipe(
      z.enum(["pagado", "pendiente", "vencido"], {
        error: "Debe seleccionar un estado: pagado, vencido o pendiente",
      }),
    ),
});
