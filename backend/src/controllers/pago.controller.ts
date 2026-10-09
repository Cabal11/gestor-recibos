import type { Response, Request, NextFunction } from "express";
import { pagosSchema, pagosIdSchema } from "../validators/pagos.validator.ts";
import { error } from "node:console";

//Obtener todos los datos
export const getPagos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = [
      {
        name: "Neymar",
      },
    ];

    res.json(data).status(200);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Problema al obtener los pagos" });
  }
};

//Obtener pago
export const getPago = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const resultId = pagosIdSchema.safeParse(id);

    if (!resultId.success) {
      return res.status(400).send({
        message: "Error de validacion ID",
        error: resultId.error.flatten().fieldErrors,
      });
    }

    console.log(resultId.data);

    res.send({ id: resultId.data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al obtener el pago" });
  }
};

//Crear nuevo registro
export const crearPago = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    console.log(data);

    const result = pagosSchema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        message: "Error de validacion",
        error: result.error.flatten().fieldErrors,
      });
    }

    res
      .send({ message: "Guardado correctamente", data: result.data })
      .status(201);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al crear el pago" });
  }
};

// Editar pago
export const editarPago = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const resultId = pagosIdSchema.safeParse(id);
    const result = pagosSchema.safeParse(data)

    if (!resultId.success) {
      return res.status(400).send({
        message: "El ID del pago no es valido",
        error: resultId.error.flatten().fieldErrors,
      });
    }

    if (!result.success) {
      return res.status(400).send({
        message: "Error de validacion",
        error: result.error.flatten().fieldErrors,
      });
    }

    console.log(id);
    console.log(data);

    // Aquí posteriormente actualizarás el pago en la base de datos

    res.send({
      id: resultId.data,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al actualizar el pago" });
  }
};

// Eliminar pago
export const eliminarPagos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    console.log(id);
    const resultId = pagosIdSchema.safeParse(id);

    if (!resultId.success) {
      return res
        .status(400)
        .send({
          message: "El ID del pago es invalido",
          error: resultId.error.flatten().fieldErrors,
        });
    }

    // Aquí posteriormente eliminarás el pago de la base de datos

    res.status(204).send({ id: resultId.data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al eliminar el pago" });
  }
};
