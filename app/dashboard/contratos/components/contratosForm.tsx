"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Contratos } from "@/types/contrato";

import { columnsContrato } from "../components/columns";
import { DataTable } from "../../components/data-table";
import { ContratoForm, contratoSchema } from "@/shared/contrato.schema";
import ErrorMessage from "../../components/error-message";
import { CreateContrato } from "@/app/services/contratos/contratos";
import { EditModal } from "../components/modal";

import React from "react";

interface Props {
  onNuevoContrato: (contrato: Contratos) => void;
  idContrato: number;
}

export default function ContratosForm({ onNuevoContrato, idContrato }: Props) {
  const emptyContrato = (): Contratos => ({
    id: 0,
    tipo: "",
    numero: "",
  });
  const [formData, setFormData] = useState<Contratos>(emptyContrato);

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContratoForm, string>>
  >({});

  const handleChange = <K extends keyof Contratos>(
    field: K,
    value: Contratos[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSave = async (contrato: Contratos) => {
    try {
      const result = contratoSchema.safeParse(contrato);
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors({
          id: fieldErrors.id?.[0],
          tipo: fieldErrors.tipo?.[0],
          numero: fieldErrors.numero?.[0],
        });

        return;
      }
      CreateContrato(contrato);
      onNuevoContrato(contrato);
      setFormData(emptyContrato());
    } catch (error) {
      alert(`No se pudo guardar el pago: ${error}`);
    }
  };

  return (
    <>
      <section className="bg-gray-100 max-sm:w-sm lg:w-lg mx-auto mt-5 rounded-xl p-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Agregar contratos, planes, NISE, otros..
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              console.log("id", idContrato);
              handleChange("id", idContrato);
              handleSave(formData);
            }}
            className="flex flex-col gap-1 items-center"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tipo"
              >
                Tipo de contrato
              </label>
              <Input
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tipo"
                type="text"
                placeholder="Agua, luz, etc."
                value={formData.tipo}
                onChange={(e) => handleChange("tipo", e.currentTarget.value)}
              />
              <ErrorMessage message={errors.tipo} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="numero"
              >
                Numero contrato
              </label>
              <Input
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numero"
                placeholder="0"
                value={formData.numero}
                onChange={(e) => {
                  handleChange("numero", e.currentTarget.value);
                }}
              />
              <ErrorMessage message={errors.numero} />
            </div>
            <Button
              type="submit"
              className="bg-green-500 text-white hover:bg-green-600 mt-6"
            >
              Guardar
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
