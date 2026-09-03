"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { columnsRegistrar, Payment } from "./components/columns";
import { DataTable } from "../components/data-table";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";

function RegistrarPage() {
  const estados = ["pagado", "pendiente", "vencido"];
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

  const [newRecibo, setNewRecibo] = useState<Payment>(empty());
  const [recibosRecientes, setRecibosRecientes] = useState<Payment[]>([]);

  function handleSave(recibo: Payment) {
    setRecibosRecientes([...recibosRecientes, recibo]);
    setNewRecibo(empty());
  }

  useEffect(() => {
    console.log(recibosRecientes);
  }, [recibosRecientes]);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>
                  <Link href="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Registrar recibos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Seccion de guardar recibos
      max-sm:w-sm lg:w-lg */}

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
                    onChange={(e) =>
                      setNewRecibo({
                        ...newRecibo,
                        id: recibosRecientes.length + 1,
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

        <section className="bg-gray-100 w-full mx-auto rounded-xl p-4 mt-10">
          <label className="block text-gray-700 text-sm font-bold">
            Recibos recientes
          </label>
          <div className="">
            <DataTable
              columns={columnsRegistrar}
              data={recibosRecientes}
              mostrarEdit={false}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default RegistrarPage;
