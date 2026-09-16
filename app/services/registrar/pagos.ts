"use server";

import { Payment } from "@/types/payment";

//Guardar pago
export async function PagosPost(pago: Payment) {
  const respuesta = await fetch(`${process.env.API_URL_DEV}/api/pagos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pago),
  });

  if (!respuesta.ok) {
    console.log("No se guardo el pago");
  }

  return await respuesta.json();
}

//Obtener pagos
export async function ObtenerPagos() {
  const respuesta = await fetch(`${process.env.API_URL_DEV}/api/pagos`);

  if (!respuesta.ok) {
    throw Error("No se obtuvieron los datos");
  }

  return respuesta.json();
}

//Editar Pagos
export async function EditPagos(pago: Payment) {
  const respuesta = await fetch(
    `${process.env.API_URL_DEV}/api/pagos/${pago.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(pago),
    },
  );

  if (!respuesta.ok) {
    throw Error("No se editaron los datos");
  }

  return respuesta.json();
}

// Eliminar Pagos

export async function DeletePagos(id: number) {
  const respuesta = await fetch(`${process.env.API_URL_DEV}/api/pagos/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!respuesta.ok) {
    throw Error("No se eliminaron los datos");
  }

  return respuesta.json();
}
