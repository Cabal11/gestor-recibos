import {z} from "zod"

export const pagoSchema = z.object({
    id: z.int(),
    tipo: z.coerce.string().min(1, "Ingresa un nombre"),
    fecha: z.string(),
    monto: z.number({error: "El monto es requerido"}),
    estado: z.enum(["pagado", "vencido","pendiente"], {error: "Seleccione un estado"})

})

export type PaymentForm = z.infer<typeof pagoSchema>