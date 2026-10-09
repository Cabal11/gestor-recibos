import type { Request, Response, NextFunction } from "express";
import {
  contratoSchema,
  contratoIdSchema,
} from "../validators/contrato.validator.ts";
import { error } from "node:console";

// Obtener todos los registros
export const obtenerContratos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
export const obtenerContrato = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const resultId = contratoIdSchema.safeParse(id);
    if (!resultId.success) {
      return res.status(400).send({
        message: "El ID es invalido",
        error: resultId.error.flatten().fieldErrors,
      });
    }
    console.log(resultId.data);

    // Aquí posteriormente buscarás el contrato en la base de datos

    res.send({ id: resultId.data });
  } catch (error) {
    console.error("Error al obtener el contrato", error);
    return res.status(500).send({ message: "Problema al obtener el contrato" });
  }
};

// Crear nuevo registro
export const crearContrato = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = contratoSchema.safeParse(data);

    if (!result.success) {
      return res.status(400).send({
        message: "Error de validacion",
        error: result.error.flatten().fieldErrors,
      });
    }

    res.status(201).send({ message: "Contrato creado", data: result.data });
  } catch (error) {
    console.error("Error al registrar el contrato", error);
    return res
      .status(500)
      .send({ message: "Problema al registrar el contrato" });
  }
};

// Editar contrato
export const editarContrato = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log(id);
    console.log(data);
    const idResult = contratoIdSchema.safeParse(id);
    const result = contratoSchema.safeParse(data);

    if (!idResult.success) {
      return res.status(400).json({
        message: "El ID del contrato no es válido",
        error: idResult.error.flatten().fieldErrors,
      });
    }

    if (!result.success) {
      return res
        .status(400)
        .send({
          message: "Error de validacion",
          error: result.error.flatten().fieldErrors,
        });
    }

    // Aquí posteriormente actualizarás el contrato en la base de datos

    res.status(200).send({
      message: "Actualizado correctamente",
      id,
      data: result.data,
    });
  } catch (error) {
    console.log("Error al editar el contrato", error);
    return res.status(500).send({ message: "Problema al editar el contrato" });
  }
};

// Eliminar registro
export const eliminarContrato = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    console.log(id);
    const idResult = contratoIdSchema.safeParse(id);

    if (!idResult.success) {
      return res.status(400).json({
        message: "El ID del contrato no es válido",
        error: idResult.error.flatten().fieldErrors,
      });
    }
    // Aquí posteriormente eliminarás el contrato de la base de datos

    res.status(204).send({ message: "Eliminado correctamente", id });
  } catch (error) {
    console.error("Error al eliminar el contrato", error);
    return res
      .status(500)
      .send({ message: "Problema al eliminar el contrato" });
  }
};
