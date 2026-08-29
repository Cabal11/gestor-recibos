"use client";
import { useState } from "react";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  VisibilityState,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete?: (id: number) => void;
  onEdit?: (data: TData) => void;
  mostrarEdit: boolean;
}

//Recibe parametros de tipo generico TData y TValue, que representan el tipo de datos y el tipo de valor de las columnas de la tabla. Esto permite que la tabla sea reutilizable para diferentes tipos de datos y valores.
export function DataTable<TData, TValue>({
  data,
  columns,
  mostrarEdit,
}: DataTableProps<TData, TValue>) {
  //Hacer visible el boton editar si mostrarEdit es true
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    actions: mostrarEdit,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay recibos recientes.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
