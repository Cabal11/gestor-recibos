import type { Response, Request, NextFunction } from "express";

//Obtener todos los datos
export const getPagos = async (
  req: Request,
  res: Response,
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
    return res.status(500).send({ message: "Problema al obtener los pagos" });
  }
};

//Obtener pago
export const getPago = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    //Enviar dato

    res.send({ id: id, data: "dato" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al obtener el pago" });
  }
};

//Crear nuevo registro
export const crearPago = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);

    res.send({ message: "Guardado correctamente", data: data }).status(201);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al crear el pago" });
  }
};

// Editar pago
export const editarPago = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log(id);
    console.log(data);

    // Aquí posteriormente actualizarás el pago en la base de datos

    res.send({
      id: id,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al actualizar el pago" });
  }
};

// Eliminar pago
export const eliminarPagos = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Aquí posteriormente eliminarás el pago de la base de datos
    console.log(id);
    res.status(204).send({ id: id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Problema al eliminar el pago" });
  }
};
