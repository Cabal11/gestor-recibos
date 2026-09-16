"use client";
import React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Payment } from "@/types/payment";

import { PagosPost } from "@/app/services/registrar/pagos";

interface Props {
  onNuevoRegistro: (recibo: Payment) => void;
  id: number;
}

function RegistrarForm({ onNuevoRegistro, id }: Props) {
  const today = new Date();
  const fechaActual = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const empty = (): Payment => ({
    id: 0,
    tipo: "",
    fecha: fechaActual,
    monto: 0,
    estado: "",
  });

  const estados = ["pagado", "pendiente", "vencido"];

  const [newRecibo, setNewRecibo] = useState<Payment>(empty());

  const handleSave = async (recibo: Payment) => {
    try {
      await PagosPost(recibo);
      onNuevoRegistro(recibo);
      setNewRecibo(empty());
      
    } catch (error) {
      alert(`No se pudo guardar el pago: ${error}`);
    }
  };

  return (
    <>
      <section className="bg-gray-100 mx-auto mt-5 rounded-xl p-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Formulario de registro
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(newRecibo);
            }}
            className="w-full"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tipo"
                >
                  ¿Qué pagaste?
                </label>
                <Input
                  className="h-10 w-full shadow appearance-none border rounded w- py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tipo"
                  type="text"
                  placeholder="Ej: agua, luz, etc."
                  required
                  value={newRecibo.tipo}
                  onChange={(e) =>
                    setNewRecibo({
                      ...newRecibo,
                      id: id,
                      tipo: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fecha"
                >
                  Fecha de pago
                </label>
                <Input
                  className="w-full h-10 shadow appearance-none border rounded py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fecha"
                  type="date"
                  value={newRecibo.fecha}
                  onChange={(e) =>
                    setNewRecibo({
                      ...newRecibo,
                      fecha: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="monto"
                >
                  Monto
                </label>
                {/* <span className="text-gray-700 text-lg font-bold absolute ml-2 mt-0.5">
                ₡
              </span> */}
                <NumericFormat
                  className="h-10 w-full shadow appearance-none border rounded py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="monto"
                  prefix="₡"
                  thousandSeparator=","
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                  value={newRecibo.monto}
                  onValueChange={(values) =>
                    setNewRecibo({
                      ...newRecibo,
                      monto: values.floatValue ?? 0,
                    })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="estado"
                >
                  Estado
                </label>
                <Combobox items={estados}>
                  <ComboboxInput
                    className="h-10 w-full shadow appearance-none border rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Seleccionar estado"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>Elementos no encontrados</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem
                          key={item}
                          value={item}
                          onClick={() =>
                            setNewRecibo({ ...newRecibo, estado: item })
                          }
                        >
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
              <Button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600 col-span-full lg:justify-self-end"
              >
                Registrar recibo
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegistrarForm;
