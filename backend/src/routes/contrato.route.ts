import express from "express";
import * as contratoController from "../controllers/contrato.controller.ts";
import { validate } from "../middleware/validate.ts";
import {
  contratoSchema,
  contratoIdSchema,
} from "../validators/contrato.validator.ts";
const router = express.Router();

//GET
router.get("/contratos", contratoController.obtenerContratos);
//POST
router.post(
  "/contratos",
  validate(contratoSchema, "body"),
  contratoController.crearContrato,
);
//PUT
router.put(
  "/contratos/:id",
  validate(contratoIdSchema, "params"),
  validate(contratoSchema, "body"),
  contratoController.editarContrato,
);
//DELETE
router.delete(
  "/contratos/:id",
  validate(contratoIdSchema, "params"),
  contratoController.eliminarContrato,
);

export default router;
