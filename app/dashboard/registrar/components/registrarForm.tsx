"use client";
import React from "react";
import { useState } from "react";
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
import ErrorMessage from "../../components/error-message";
import { Input } from "@/components/ui/input";

import { Payment } from "@/types/payment";
import { PaymentForm } from "@/shared/pago.schema";

import { PagosPost } from "@/app/services/registrar/pagos";
import { pagoSchema } from "@/shared/pago.schema";


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
    estado: "pagado",
  });

  const estados = ["pagado", "pendiente", "vencido"];

  const [newRecibo, setNewRecibo] = useState<Payment>(empty());
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentForm, string>>>(
    {},
  );

  const handleSave = async (recibo: Payment) => {
    try {
      const result = pagoSchema.safeParse(recibo);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors({
          id: fieldErrors.id?.[0],
          tipo: fieldErrors.tipo?.[0],
          monto: fieldErrors.monto?.[0],
          fecha: fieldErrors.fecha?.[0],
        });

        return;
      }
      console.log(result.data);
      await PagosPost(result.data);
      onNuevoRegistro(result.data);
      setNewRecibo(empty());
    } catch (error) {
      alert(`No se pudo guardar el pago: ${error}`);
    }
  };

  const handleChange = <K extends keyof Payment>(
    field: K,
    value: Payment[K],
  ) => {
    setNewRecibo((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
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
                  value={newRecibo.tipo}
                  onChange={(e) => handleChange("tipo", e.currentTarget.value)}
                />
                <ErrorMessage message={errors.tipo} />
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
                  onChange={(e) => handleChange("fecha", e.currentTarget.value)}
                />
                <ErrorMessage message={errors.fecha} />
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
                  customInput={Input}
                  allowNegative={false}
                  fixedDecimalScale
                  placeholder="0"
                  min="0"
                  step="0.01"
                  value={newRecibo.monto}
                  onValueChange={(values) => {
                    handleChange("id", id);
                    setNewRecibo((prev) => ({
                      ...prev,
                      monto: values.floatValue,
                    }));
                    if (values.floatValue !== undefined) {
                      setErrors((prev) => ({ ...prev, monto: undefined }));
                    }
                  }}
                />
                <ErrorMessage message={errors.monto} />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="estado"
                >
                  Estado
                </label>

                <Combobox
                  items={estados}
                  value={newRecibo.estado}
                  onValueChange={(value) =>
                    handleChange("estado", value ?? "pagado")
                  }
                >
                  <ComboboxInput
                    className="h-10 w-full shadow appearance-none border rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Seleccionar estado"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>Elementos no encontrados</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <ErrorMessage message={errors.estado} />
              </div>
              <Button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600 col-span-full lg:justify-self-end"
              >
                Registrar
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegistrarForm;
