"use server";

import { Payment } from "@/types/payment";

export async function PagosPost(pago: Payment) {
  const respuesta = await fetch(`${process.env.API_URL_DEV}/api/pagos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pago)
  });

  if(!respuesta.ok){
    console.log("No se guardo el pago")
  }

  return await respuesta.json()
}
