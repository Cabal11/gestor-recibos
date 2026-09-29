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
import ErrorMessage from "../../components/error-message";
import { Payment } from "@/types/payment"
import { pagoSchema, PaymentForm } from "@/shared/pago.schema";

interface EditRecibo {
  payment: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPayment: Payment) => void;
}

const estados = ["pagado", "pendiente", "vencido"];

export function EditModal({ payment, open, onOpenChange, onSave }: EditRecibo) {
  const [formData, setFormData] = useState<Payment>({
    id: payment.id,
    tipo: payment.tipo,
    fecha: payment.fecha,
    monto: payment.monto,
    estado: payment.estado,
  });

  const [error, setError] = useState<
    Partial<Record<keyof PaymentForm, string>>
  >({});

  const handleChange = <K extends keyof Payment>(
    field: K,
    value: Payment[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setError((prev) => ({ ...prev, [field]: undefined }));
  };

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setFormData({
        id: 0,
        tipo: "",
        fecha: "",
        monto: 0,
        estado: "",
      });

      setError({});
    }
    onOpenChange(nextOpen);
  }

  const handleSave = (
    payment: Payment,

    onSave: (updatedPayment: Payment) => void,
  ) => {
    setError({});

    const updatedPayment: Payment = {
      id: payment.id || 0,
      tipo: formData.tipo,
      fecha: formData.fecha,
      monto: formData.monto,
      estado: formData.estado,
    };

    const result = pagoSchema.safeParse(updatedPayment);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        tipo: fieldErrors.tipo?.[0],
        monto: fieldErrors.monto?.[0],
        fecha: fieldErrors.fecha?.[0],
        estado: fieldErrors.estado?.[0],
      });
      return;
    }

    onSave(updatedPayment);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSave(payment, onSave);
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
                value={formData.tipo}
                onChange={(event) =>
                  handleChange("tipo", event.currentTarget.value)
                }
              />
              {/* Mensaje de error */}
              <ErrorMessage message={error.tipo} />
            </Field>
            {/* Fecha del recibo */}
            <Field>
              <Label htmlFor="fecha-1">Fecha</Label>
              <Input
                id="fecha-1"
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={(event) =>
                  handleChange("fecha", event.currentTarget.value)
                }
              />
              {/* Mensaje de error */}
              <ErrorMessage message={error.fecha} />
            </Field>
            {/* Campo para el monto */}
            <Field>
              <Label htmlFor="monto-1">Monto</Label>
              <NumericFormat
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="monto"
                name="monto"
                prefix="₡"
                customInput={Input}
                allowNegative={false}
                thousandSeparator=","
                placeholder="0"
                min="0"
                step="0.01"
                value={formData.monto ?? 0}
                onValueChange={(values) => {
                  handleChange("monto", values.floatValue);
                }}
              />
              {/* Mensaje de error */}
              <ErrorMessage message={error.monto} />
            </Field>
            {/* Estado del recibo */}
            <Field>
              <FieldLabel htmlFor="estado-1">Estado</FieldLabel>
              <Select
                name="estado"
                value={formData.estado}
                onValueChange={(value) => handleChange("estado", value)}
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
              {/* Mensaje de error */}
              <ErrorMessage message={error.estado} />
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
