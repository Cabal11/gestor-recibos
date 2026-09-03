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

import { columnsRegistrar } from "./components/columns";
import RegistrarForm from "./components/registrarForm";
import { DataTable } from "../components/data-table";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Payment } from "@/types/payment";
import Link from "next/link";

function RegistrarPage() {
  // Variebles
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

  // Estados
  const [newRecibo, setNewRecibo] = useState<Payment>(empty());
  const [recibosRecientes, setRecibosRecientes] = useState<Payment[]>([]);

  // Funciones
  const handleSave = (recibo: Payment) => {
    setRecibosRecientes([...recibosRecientes, recibo]);
    setNewRecibo(empty());
  };

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
                <BreadcrumbPage>Registrar pagos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Formulario de guardar recibos */}
        <RegistrarForm
          onNuevoRegistro={handleSave}
          id={recibosRecientes.length + 1}
        />

        <section className="bg-gray-100 w-full mx-auto rounded-xl p-4 mt-10">
          <label className="block text-gray-700 text-sm font-bold">
            Pagos recientes
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
