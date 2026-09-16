import type { Response, Request, NextFunction } from "express";

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
    res.json({ message: "No se obtuvieron los datos" }).status(400);
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

    console.log(id);

    res.send({ id });
  } catch (error) {
    res.status(400).send({ message: "No se obtuvo el pago" });
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
    res.send(data);
  } catch (error) {
    res.status(400).send({ message: "No se registro el pago" });
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

    console.log(id);
    console.log(data);

    // Aquí posteriormente actualizarás el pago en la base de datos

    res.send({
      id,
      data,
    });
  } catch (error) {
    res.status(400).send({ message: "No se edito el pago" });
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

    // Aquí posteriormente eliminarás el pago de la base de datos

    res.send({ id });
  } catch (error) {
    res.status(400).send({ message: "No se elimino el pago" });
  }
};
