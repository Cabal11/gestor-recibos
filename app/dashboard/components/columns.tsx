"use client";
import { Pencil } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  tipo: string;
  fecha: string;
  monto: number;
  estado: string;
};

export type Contratos = {
  id: number;
  tipo: string;
  numero: number;
};

//Usar para actualizar en el historial
//https://ui.shadcn.com/docs/components/radix/field

export const columnsContrato: ColumnDef<Contratos>[] = [
  {
    accessorKey: "tipo",
    header: "Tipo de contrato",
  },
  {
    accessorKey: "numero",
    header: "Número de contrato",
  },
];

export const columns: ColumnDef<Payment>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
                navigator.clipboard.writeText(payment.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const columnsHistorial = (
  onEdit: (payment: Payment) => void,
  onDelete: (id: number) => void,
): ColumnDef<Payment>[] => [
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
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
                navigator.clipboard.writeText(payment.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            
            <DropdownMenuItem onClick={() => onEdit(payment)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(payment.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
