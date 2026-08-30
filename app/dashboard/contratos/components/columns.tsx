import { Pencil } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Contratos = {
  id: number;
  tipo: string;
  numero: number;
};


export const columnsContrato = (
  onEdit: (contrato: Contratos) => void,
  onDelete: (id: number) => void,
): ColumnDef<Contratos>[] => [
  {
    accessorKey: "tipo",
    header: "Tipo de contrato",
  },
  {
    accessorKey: "numero",
    header: "Número de contrato",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contrato = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              {/* <MoreHorizontal className="h-4 w-4" /> */}
              <Pencil className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(contrato.numero.toString())
              }
            >
              Copiar número de contrato
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            
            <DropdownMenuItem onClick={() => onEdit(contrato)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(contrato.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];