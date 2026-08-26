"use client";
import { DataTable } from "../components/data-table";
import { columns, Payment } from "../components/columns";

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

function HistorialPage() {
  const historial: Payment[] = [
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
  ];
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
                <BreadcrumbPage>Historial de recibos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* <div className="bg-cyan-500 flex h-16 items-start justify-around rounded-b-lg mb-10">
        <div className=" text-lg font-semibold mt-4">Historial de recibos</div>
        
      </div> */}
      <section className="bg-gray-100 sm:w-sm lg:w-lg mx-auto rounded-xl mt-10 p-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Historial de recibos
        </label>
        <div className="container mx-auto py-6">
          <DataTable columns={columns} data={historial} mostrarEdit={true} />
        </div>
      </section>
    </>
  );
}

export default HistorialPage;
