import express from "express";
import * as pagoController from "../controllers/pago.controller.ts";
import { validate } from "../middleware/validate.ts";
import { pagosSchema, pagosIdSchema } from "../validators/pagos.validator.ts";

const router = express.Router();

//GET
router.get("/pagos", pagoController.getPagos);
//POST
router.post("/pagos", validate(pagosSchema, "body"), pagoController.crearPago);
//PUT
router.put(
  "/pagos/:id",
  validate(pagosIdSchema, "params"),
  validate(pagosSchema, "body"),
  pagoController.editarPago,
);
//DELETE
router.delete(
  "/pagos/:id",
  validate(pagosIdSchema, "params"),
  pagoController.eliminarPagos,
);

export default router;
