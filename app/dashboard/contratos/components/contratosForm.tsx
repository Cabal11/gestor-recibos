"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Contratos } from "@/types/contrato";

import { columnsContrato } from "../components/columns";
import { DataTable } from "../../components/data-table";

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
    numero: 0,
  });

  const [newContrato, setNewContrato] = useState<Contratos>(emptyContrato());

  const handleSave = (contrato: Contratos) => {
    CreateContrato(contrato);
    onNuevoContrato(contrato);
    setNewContrato(emptyContrato());
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
              handleSave(newContrato);
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
                required
                type="text"
                placeholder="Agua, luz, etc."
                value={newContrato.tipo}
                onChange={(e) =>
                  setNewContrato({
                    ...newContrato,
                    id: idContrato,
                    tipo: e.currentTarget.value,
                  })
                }
              />
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
                required
                value={newContrato.numero}
                onChange={(e) => {
                  const num = e.currentTarget.value;

                  setNewContrato({
                    ...newContrato,
                    numero: num === "" ? 0 : Number(num),
                  });
                }}
              />
            </div>
            <Button
              type="submit"
              className="bg-green-500 text-white hover:bg-green-600 mt-6"
            >
              Registrar contrato
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function isNan(num: string) {
  let newNum = 0;

  if (!Number.isNaN) {
    newNum = parseInt(num);
  }
  return newNum;
}
