import { z } from "zod";

export const contratoSchema = z.object({
  id: z.int(),
  tipo: z.coerce.string().min(1, "Ingresa un tipo de contrato o servicio"),
  numero: z.string().min(1, "Ingrese un numero de contrato o servicio"),
});


export type ContratoForm = z.infer<typeof contratoSchema>;
