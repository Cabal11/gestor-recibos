"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Payment } from "../../components/columns";

interface EditRecibo {
  payment: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPayment: Payment) => void;
}

const estados = ["pagado", "pendiente", "vencido"];

export function EditModal({ payment, open, onOpenChange, onSave }: EditRecibo) {
  const [selectedTipo, setSelectedTipo] = useState(payment.tipo);
  const [newMonto, setMonto] = useState<number | undefined>();
  const [selectedEstado, setSelectedEstado] = useState(
    payment.estado,
  );
  const [selectedFecha, setSelectedFecha] = useState(
    payment.fecha,
  );

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      // Carga los datos del recibo seleccionado cada vez que se abre el modal.
      setSelectedTipo(payment.tipo);
      setMonto(payment.monto);
      setSelectedEstado(payment.estado);
      setSelectedFecha(payment.fecha);
    } else {
      // Limpia los cambios temporales al cancelar o cerrar el modal.
      setMonto(undefined);
    }
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSave(
              payment,
              selectedTipo,
              selectedFecha,
              newMonto ?? payment?.monto ?? 0,
              selectedEstado,
              onSave,
            );
          }}
        >
          <DialogHeader>
            <DialogTitle>Editar recibo</DialogTitle>
            <DialogDescription>
              Realiza los cambios necesarios en el recibo y haz clic en guardar
              cuando hayas terminado.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            {/* Tipo de recibo */}
            <Field>
              <Label htmlFor="tipo-1">Tipo</Label>
              <Input
                id="tipo-1"
                name="tipo"
                value={selectedTipo}
                onChange={(event) => setSelectedTipo(event.currentTarget.value)}
              />
            </Field>
            {/* Fecha del recibo */}
            <Field>
              <Label htmlFor="fecha-1">Fecha</Label>
              <Input
                id="fecha-1"
                name="fecha"
                type="date"
                value={selectedFecha}
                onChange={(event) =>
                  setSelectedFecha(event.currentTarget.value)
                }
              />
            </Field>
            {/* Monto numérico: NumericFormat guarda floatValue como number */}
            <Field>
              <Label htmlFor="monto-1">Monto</Label>
              <NumericFormat
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="monto"
                name="monto"
                prefix="₡"
                thousandSeparator=","
                placeholder="0"
                min="0"
                step="0.01"
                value={newMonto ?? payment?.monto ?? 0}
                onValueChange={(values) => setMonto(values.floatValue ?? 0)}
              />
            </Field>
            {/* Estado del recibo */}
            <Field>
              <FieldLabel htmlFor="estado-1">Estado</FieldLabel>
              <Select
                name="estado"
                value={selectedEstado}
                onValueChange={(value) => setSelectedEstado(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {estados.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function handleSave(
  payment: Payment,
  selectedTipo: string,
  selectedFecha: string,
  newMonto: number,
  selectedEstado: string,
  onSave: (updatedPayment: Payment) => void,
) {
  const updatedPayment: Payment = {
    id: payment.id || 0,
    tipo: selectedTipo,
    fecha: selectedFecha,
    monto: newMonto,
    estado: selectedEstado,
  };
  onSave(updatedPayment);
}
