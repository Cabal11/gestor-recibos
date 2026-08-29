"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { columnsContrato, Contratos } from "./components/columns";
import { DataTable } from "../components/data-table";
import { EditModal } from "./components/modal";

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
  const emptyContrato = (): Contratos => ({
    id: 0,
    tipo: "",
    numero: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [contratos, setContratos] = useState<Contratos[]>([]);
  const [selectedContrato, setSelectedContrato] = useState<Contratos | null>(
    null,
  );

  const [newContrato, setNewContrato] = useState<Contratos>(emptyContrato());


  function handleSave(contrato: Contratos) {
    setContratos([...contratos, contrato]);
    setNewContrato(emptyContrato());
    setSelectedContrato(null);
   
  }

  function handleSaveEdit(updatedContrato: Contratos) {
    
    setContratos((datos) => datos.map((item) => item.id == updatedContrato.id ? updatedContrato : item));
    console.log(contratos)
    setNewContrato(emptyContrato());
    setSelectedContrato(null);
    setModalOpen(false)
  }

  function handleEdit(contrato: Contratos) {
    
    setSelectedContrato(contrato);
    setModalOpen(true);
    
  }

  function handleDelete(id: number) {
    throw new Error("Function not implemented.");
  }

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
                type="text"
                placeholder="Agua, luz, etc."
                value={newContrato.tipo}
                onChange={(e) =>
                  setNewContrato({
                    ...newContrato,
                    id: contratos.length + 1,
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
                value={newContrato.numero}
                onChange={(e) =>
                  setNewContrato({
                    ...newContrato,
                    numero: parseInt(e.currentTarget.value),
                  })
                }
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

      <section className="bg-gray-100 sm:w-sm lg:w-lg mx-auto rounded-xl p-4 mt-10">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contratos registrados
        </label>

        {/* Modal componente */}
        {selectedContrato && (
          <EditModal
            key={selectedContrato.id}
            open={modalOpen}
            onOpenChange={setModalOpen}
            contrato={selectedContrato}
            onSave={handleSaveEdit}
          />
        )}

        <div className="container mx-auto py-6">
          <DataTable
            data={contratos}
            columns={columnsContrato(handleEdit, handleDelete)}
            mostrarEdit={true}
          />
        </div>
      </section>
    </>
  );
}

export default ContratosPage;
