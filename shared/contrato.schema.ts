import { z } from "zod";

export const contratoSchema = z.object({
  id: z.int(),
  tipo: z.coerce.string().min(1, "Ingresa un nombre"),
  monto: z.number({ error: "El numero es requerido" }),
});

export type PaymentForm = z.infer<typeof contratoSchema>;
