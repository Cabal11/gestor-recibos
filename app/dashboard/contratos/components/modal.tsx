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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contratos } from "./columns";

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
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedNumero, setSelectedNumero] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!open) return;

    setSelectedTipo(contrato.tipo ?? "");
    setSelectedNumero(contrato.numero ?? 0);
  }, [open, contrato.id, contrato.tipo, contrato.numero]);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSelectedTipo("");
      setSelectedNumero(undefined);
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSave(contrato, selectedTipo, selectedNumero ?? 0, onSave);
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
                value={selectedTipo}
                onChange={(event) => setSelectedTipo(event.currentTarget.value)}
              />
            </Field>

            {/* Numero del contrato */}
            <Field>
              <Label htmlFor="numero-1">Numero</Label>
              <Input
                id="numero"
                name="numero"
                type="number"
                value={selectedNumero ?? 0}
                onChange={(values) =>
                  setSelectedNumero(parseInt(values.currentTarget.value))
                }
              />
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
  contrato: Contratos,
  selectedTipo: string,
  selectedNumero: number,
  onSave: (updatedContrato: Contratos) => void,
) {
  const updatedContrato: Contratos = {
    id: contrato.id,
    tipo: selectedTipo,
    numero: selectedNumero,
  };

  onSave(updatedContrato);
}
