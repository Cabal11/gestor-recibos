import { ColumnDef } from "@tanstack/react-table";
import {Payment} from "@/types/payment"

export const columnsRegistrar: ColumnDef<Payment>[] = [
  {
    accessorKey: "tipo",
    header: "Concepto",
  },
  {
    accessorKey: "fecha",
    header: "Fecha de pago",
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
