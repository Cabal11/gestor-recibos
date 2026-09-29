export type Contratos = {
    id: number;
    tipo: string | undefined;
    numero: string | undefined;
}

// placeholder="₡ 0,00"

// numero_contrato: z
//     .string()
//     .min(1, "El número de contrato es obligatorio")
//     // Permite letras, números y guiones. No permite espacios.
//     .regex(/^[a-zA-Z0-9-]+$/, "El contrato solo puede contener números, letras y guiones (sin espacios)"),


// type CreateUser = {
//   name: string;
//   email: string;
// };

// type User = {
//   id: number;
//   name: string;
//   email: string;
// };
