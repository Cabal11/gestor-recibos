"use server"

import { Contratos } from "@/types/contrato"

const url = process.env.API_URL_DEV;

// Obtener todos los Contratos
export async function GetContratos() {

  const respuesta = await fetch(
    `${url}/api/contratos`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }
  );

  if (!respuesta.ok) {
    throw Error("No se obtuvieron los datos");
  }

  return respuesta.json();
}


// Obtener un Contrato por ID
export async function GetContrato(id: number) {

  const respuesta = await fetch(
    `${url}/api/contratos/${id}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }
  );

  if (!respuesta.ok) {
    throw Error("No se obtuvieron los datos");
  }

  return respuesta.json();
}


// Crear Contrato
export async function CreateContrato(contrato: Contratos) {

  const respuesta = await fetch(
    `${url}/api/contratos`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(contrato)
    }
  );

  if (!respuesta.ok) {
    throw Error("No se crearon los datos");
  }

  return respuesta.json();
}


// Editar Contrato
export async function EditContrato(contrato: Contratos) {

  const respuesta = await fetch(
    `${url}/api/contratos/${contrato.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(contrato)
    }
  );

  if (!respuesta.ok) {
    throw Error("No se editaron los datos");
  }

  return respuesta.json();
}


// Eliminar Contrato
export async function DeleteContrato(id: number) {

  const respuesta = await fetch(
    `${url}/api/contratos/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }
  );

  if (!respuesta.ok) {
    throw Error("No se eliminaron los datos");
  }

  return respuesta.json();
}