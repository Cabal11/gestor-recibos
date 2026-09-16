import type { Request, Response, NextFunction } from "express";

// Crear nuevo registro
export const crearContrato = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    console.log(data);

    res.send(data);
  } catch (error) {
    res.status(400).send({ message: "No se registro el contrato" });
  }
};

// Obtener todos los registros
export const obtenerContratos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Aquí posteriormente consultarás la base de datos

    res.send("Lista de contratos");
  } catch (error) {
    res.status(400).send({ message: "No se obtuvieron los contratos" });
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

    console.log(id);

    // Aquí posteriormente buscarás el contrato en la base de datos

    res.send({ id });
  } catch (error) {
    res.status(400).send({ message: "No se obtuvo el contrato" });
  }
};

// Editar registro
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

    // Aquí posteriormente actualizarás el contrato en la base de datos

    res.send({
      id,
      data,
    });
  } catch (error) {
    res.status(400).send({ message: "No se edito el contrato" });
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

    // Aquí posteriormente eliminarás el contrato de la base de datos

    res.send({ id });
  } catch (error) {
    res.status(400).send({ message: "No se elimino el contrato" });
  }
};
