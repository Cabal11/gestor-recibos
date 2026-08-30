import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: number;
  tipo: string;
  fecha: string;
  monto: number;
  estado: string;
};

export const columnsRegistrar: ColumnDef<Payment>[] = [
  {
    accessorKey: "tipo",
    header: "Tipo de recibo",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "monto",
    header: () => <div>Monto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("monto"));
      const formatted = Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
];
