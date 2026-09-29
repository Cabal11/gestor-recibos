"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import ErrorMessage from "../../components/error-message";
import { Contratos } from "@/types/contrato";
import { ContratoForm, contratoSchema } from "@/shared/contrato.schema";

import { EditContrato } from "@/app/services/contratos/contratos";
import ContratosForm from "./contratosForm";

interface EditContrato {
  contrato: Contratos;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedContrato: Contratos) => void;
}

export function EditModal({
  contrato,
  open,
  onOpenChange,
  onSave,
}: EditContrato) {
  const [formData, setFormData] = useState<Contratos>({
    id: contrato.id,
    tipo: contrato.tipo,
    numero: contrato.numero,
  });

  const [error, setError] = useState<
    Partial<Record<keyof ContratoForm, string>>
  >({});

  const handleChange = <K extends keyof Contratos>(
    field: K,
    value: Contratos[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setError((prev) => ({ ...prev, [field]: undefined }));
  };

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setFormData({
        id: 0,
        tipo: "",
        numero: "",
      });
      setError({});
    }

    onOpenChange(nextOpen);
  }

  const handleSave = (
    contrato: Contratos,
    onSave: (updatedContrato: Contratos) => void,
  ) => {
    const updatedContrato: Contratos = {
      id: contrato.id,
      tipo: formData.tipo,
      numero: formData.numero,
    };

    const result = contratoSchema.safeParse(updatedContrato);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        id: fieldErrors.id?.[0],
        tipo: fieldErrors.tipo?.[0],
        numero: fieldErrors.numero?.[0],
      });
      return;
    }
    EditContrato(updatedContrato);
    onSave(updatedContrato);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSave(contrato, onSave);
          }}
        >
          <DialogHeader>
            <DialogTitle>Editar contrato</DialogTitle>
            <DialogDescription>
              Realiza los cambios necesarios en el contrato y haz clic en
              guardar cuando hayas terminado.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            {/* Tipo de contrato */}
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
              <ErrorMessage message={error.tipo} />
            </Field>

            {/* Numero del contrato */}
            <Field>
              <Label htmlFor="numero-1">Numero</Label>
              <Input
                id="numero"
                name="numero"
                type="text"
                value={formData.numero}
                onChange={(e) => handleChange("numero", e.currentTarget.value)}
              />
              <ErrorMessage message={error.numero} />
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
