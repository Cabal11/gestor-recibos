import type { Request, Response, NextFunction } from "express";
import {
  contratoSchema,
  contratoIdSchema,
} from "../validators/contrato.validator.ts";

// Obtener todos los registros
export const obtenerContratos = async (req: Request, res: Response) => {
  try {
    // Aquí posteriormente consultarás la base de datos

    res.status(200).send("Lista de contratos");
  } catch (error) {
    console.error("Error al obtener los contratos", error);
    return res
      .status(500)
      .send({ message: "Problema al obtener los contratos" });
  }
};

// Obtener un registro
export const obtenerContrato = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    console.log(id);

    // Aquí posteriormente buscarás el contrato en la base de datos

    res.send({ id: id, data: "dato" });
  } catch (error) {
    console.error("Error al obtener el contrato", error);
    return res.status(500).send({ message: "Problema al obtener el contrato" });
  }
};

// Crear nuevo registro
export const crearContrato = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = req.body;

    res.status(201).send({ message: "Contrato creado", data: data });
  } catch (error) {
    console.error("Error al registrar el contrato", error);
    return res
      .status(500)
      .send({ message: "Problema al registrar el contrato" });
  }
};

// Editar contrato
export const editarContrato = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log(id);
    console.log(data);

    // Aquí posteriormente actualizarás el contrato en la base de datos

    res.status(200).send({
      message: "Actualizado correctamente",
      id: id,
      data: data,
    });
  } catch (error) {
    console.log("Error al editar el contrato", error);
    return res.status(500).send({ message: "Problema al editar el contrato" });
  }
};

// Eliminar registro
export const eliminarContrato = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    console.log(id);

    // Aquí posteriormente eliminarás el contrato de la base de datos

    res.status(204).send({ message: "Eliminado correctamente", id: id });
  } catch (error) {
    console.error("Error al eliminar el contrato", error);
    return res
      .status(500)
      .send({ message: "Problema al eliminar el contrato" });
  }
};
