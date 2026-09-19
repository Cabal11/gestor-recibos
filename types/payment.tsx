export type Payment = {
  id: number;
  tipo: string;
  fecha: string;
  monto: number | undefined;
  estado: string | undefined;
};
