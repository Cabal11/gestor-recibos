"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ContratosForm from "./components/contratosForm";

import { columnsContrato } from "./components/columns";
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

import { DeleteContrato } from "@/app/services/contratos/contratos";
import { Contratos } from "@/types/contrato";

function ContratosPage() {
  const emptyContrato = (): Contratos => ({
    id: 0,
    tipo: "",
    numero: "",
  });

  const [newContrato, setNewContrato] = useState<Contratos>(emptyContrato());
  const [modalOpen, setModalOpen] = useState(false);
  const [contratos, setContratos] = useState<Contratos[]>([]);
  const [selectedContrato, setSelectedContrato] = useState<Contratos | null>(
    null,
  );

  function handleSave(contrato: Contratos) {
    setContratos([...contratos, contrato]);
    setNewContrato(emptyContrato());
    setSelectedContrato(null);
  }

  function handleSaveEdit(updatedContrato: Contratos) {
    setContratos((datos) =>
      datos.map((item) =>
        item.id == updatedContrato.id ? updatedContrato : item,
      ),
    );
    console.log(contratos);
    setNewContrato(emptyContrato());
    setSelectedContrato(null);
    setModalOpen(false);
  }

  function handleEdit(contrato: Contratos) {
    setSelectedContrato(contrato);
    setModalOpen(true);
  }

  function handleDelete(id: number) {
    DeleteContrato(id);
    setContratos((contratos) => contratos.filter((item) => item.id != id))

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

      {/* Formulario para agregar nuevos contratos */}
      <ContratosForm
        onNuevoContrato={handleSave}
        idContrato={contratos.length + 1}
      />

      <section className="bg-gray-100 sm:w-sm lg:w-lg mx-auto rounded-xl p-4 mt-10">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contratos registrados
        </label>

        {/* Modal componente para editar */}
        {selectedContrato && (
          <EditModal
            key={selectedContrato.id}
            open={modalOpen}
            onOpenChange={setModalOpen}
            contrato={selectedContrato}
            onSave={handleSaveEdit}
          />
        )}

        {/* Tabla de contratos */}
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
