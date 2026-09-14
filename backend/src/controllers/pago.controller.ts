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

//Crear nuevo registro
export const crearPago = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
console.log(data)
    res.send(data)
  } catch (error) {
    res.status(400).send({ message: "No se registro el pago" });
  }
};
