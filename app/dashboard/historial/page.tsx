"use client";
import { DataTable } from "../components/data-table";
import { columns, columnsHistorial, Payment } from "../components/columns";

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditModal } from "./components/modal";

function HistorialPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [data, setData] = useState<Payment[]>([]);

  const [historial, setHistorial] = useState<Payment[]>([
    {
      id: 1,
      tipo: "Agua",
      fecha: "2023-11-11",
      monto: 100,
      estado: "pagado",
    },
    {
      id: 2,
      tipo: "Luz",
      fecha: "2023-11-12",
      monto: 200,
      estado: "pendiente",
    },
    {
      id: 3,
      tipo: "Internet",
      fecha: "2023-11-13",
      monto: 150,
      estado: "vencido",
    },
  ]);

  function handleDelete(id: number) {
    setHistorial((datos) => datos.filter((item) => item.id !== id));
  }

  function handleEdit(payment: Payment) {
    if (payment === null) {
      setSelectedPayment(null);
      setIsModalOpen(false);
      return;
    }
    setSelectedPayment(payment);
    setIsModalOpen(true);

    console.log(`Editar recibo con ID: ${payment.id}`);
  }

  function handleSave(updatedPayment: Payment) {
    setHistorial((prevData) =>
      prevData.map((item) =>
        item.id === updatedPayment.id ? updatedPayment : item,
      ),
    );
    setSelectedPayment(null);
    setIsModalOpen(false);
  }

  return (
    <>
      {/* Encabezado de la página con el breadcrumb y el trigger del sidebar */}
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
                <BreadcrumbPage>Historial de pagos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Contenido principal */}
      <section className="bg-gray-100 sm:w-sm lg:w-lg mx-auto rounded-xl mt-10 p-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Historial de pagos realizados
        </label>

        {/* Modal para editar recibo */}
        {selectedPayment && (
          <EditModal
            payment={selectedPayment}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onSave={handleSave}
          />
        )}

        {/* Tabla de datos y botones */}
        <div className="container mx-auto py-6">
          <DataTable
            columns={columnsHistorial(handleEdit, handleDelete)}
            data={historial}
            mostrarEdit={true}
          />
        </div>
      </section>
    </>
  );
}

export default HistorialPage;
