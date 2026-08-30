"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { columnsContrato, Contratos } from "../components/columns";
import { DataTable } from "../components/data-table";

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
import Link from "next/link";

function ContratosPage() {
  const [contrato, setContrato] = useState({ id: 0, tipo: "", numero: 0 });

  const [contratos, setContratos] = useState<Contratos[]>([]);
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
                <BreadcrumbPage>Contratos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* <div className="bg-cyan-500 flex h-16 items-start justify-around rounded-b-lg mb-10">
        <div className=" text-lg font-semibold mt-4">Estadisticas</div>
      </div> */}
      <section className="bg-gray-100 max-sm:w-sm lg:w-lg mx-auto mt-5 rounded-xl p-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Agregar contratos, planes, NISE, otros..
          </h2>
          <form className="flex flex-col gap-1 items-center">
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
                placeholder="agua, luz, etc."
                value={contrato.tipo}
                onChange={(e) =>
                  setContrato({
                    ...contrato,
                    id: contrato.id + 1,
                    tipo: e.target.value,
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
                value={contrato.numero}
                onChange={(e) =>
                  setContrato({ ...contrato, numero: parseInt(e.target.value) })
                }
              />
            </div>
            <Button
              type="submit"
              className="bg-green-500 text-white hover:bg-green-600 mt-6"
              onClick={(e) => {
                e.preventDefault();
                setContratos((prev) => {
                  const contratosNuevos = [...prev, contrato];
                  console.log(
                    "Contratos registrados:",
                    contratosNuevos.map((c) => `${c.tipo} - ${c.numero}`),
                  );
                  setContrato({ id: contrato.id + 1, tipo: "", numero: 0 });
                  return contratosNuevos;
                });
              }}
            >
              Registrar contrato
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-gray-100 sm:w-sm lg:w-lg mx-auto rounded-xl p-4 mt-10">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contratos registrados
        </label>
        <div className="container mx-auto py-6">
          <DataTable
            columns={columnsContrato}
            data={contratos}
            mostrarEdit={false}
          />
        </div>
      </section>
    </>
  );
}

export default ContratosPage;


