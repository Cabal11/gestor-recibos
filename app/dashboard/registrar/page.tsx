"use client";
import { columnsRegistrar, Payment } from "./components/columns";
import { DataTable } from "../components/data-table";
import { NumericFormat } from "react-number-format";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Link from "next/link";

const estados = ["pagado", "pendiente", "vencido"];

function RegistrarPage() {
  const fechaReciente = new Date();
  const opciones = { day: "numeric", month: "long", year: "numeric" } as const;
  const fechaCorta = fechaReciente.toLocaleDateString("es-ES", opciones);
  const today = new Date();
  const [fecha, setFecha] = useState("");
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const fechaActual = `${year}-${month}-${day}`;

  const [count, setCount] = useState(0);
  const [tipo, setTipo] = useState("");
  const [monto, setMonto] = useState(0);
  const [estado, setEstado] = useState("");

  const [recibo, setRecibo] = useState({
    id: 0,
    tipo: "",
    fecha: "",
    monto: 0,
    estado: "",
  });

  const [recibos, setRecibos] = useState<Payment[]>([]);

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
      {/* <div className="bg-cyan-500 flex h-16 items-start justify-around rounded-b-lg mb-20">
        <div className=" text-lg font-semibold mt-4">Registrar recibos</div>
      </div> */}

      <section className="bg-gray-100 max-sm:w-sm lg:w-lg mx-auto mt-5 rounded-xl p-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Formulario de registro
          </h2>
          <form className="flex flex-col gap-1 items-center">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tipo"
              >
                Tipo de recibo
              </label>
              <Input
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tipo"
                type="text"
                placeholder="agua, luz, etc."
                value={recibo.tipo}
                onChange={(e) =>
                  setRecibo({
                    ...recibo,
                    tipo: e.target.value,
                    id: recibo.id + 1,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fecha"
              >
                Fecha
              </label>
              <Input
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha"
                type="date"
                value={recibo.fecha}
                onChange={(e) =>
                  setRecibo({ ...recibo, fecha: e.target.value })
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
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="monto"
                prefix="₡"
                thousandSeparator=","
                placeholder="0"
                min="0"
                step="0.01"
                // value={recibo.monto || ""}
                onValueChange={(values) =>
                  setRecibo({ ...recibo, monto: values.floatValue ?? 0 })
                }
              />
              {/* <Input
                className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="monto"
                type="number"
                placeholder="0"
                min="0"
                step="0.01"
                value={recibo.monto || ""}
                onChange={(e) =>
                  setRecibo({ ...recibo, monto: parseFloat(e.target.value) })
                }
              /> */}
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
                  className="shadow appearance-none border rounded max-w-80 min-w-60 py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Seleccionar estado"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem
                        key={item}
                        value={item}
                        onClick={() => setRecibo({ ...recibo, estado: item })}
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
              className="bg-green-500 text-white hover:bg-green-600 mt-6"
              onClick={(e) => {
                e.preventDefault();
                setRecibos((prev) => [...prev, recibo]);
              }}
            >
              Registrar recibo
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-gray-100 sm:w-sm lg:w-lg mx-auto rounded-xl p-4 mt-10">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Recibos recientes
        </label>
        <div className="container mx-auto py-6">
          <DataTable
            columns={columnsRegistrar}
            data={recibos}
            mostrarEdit={false}
          />
        </div>
      </section>
    </>
  );
}

export default RegistrarPage;
