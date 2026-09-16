import express from "express"
import * as contratoController from "../controllers/contrato.controller.ts"

const router = express.Router()

router.get("/contratos", contratoController.obtenerContratos)
router.post("/contratos", contratoController.crearContrato)
router.put("/contratos/:id", contratoController.editarContrato)
router.delete("/contratos/:id", contratoController.eliminarContrato)

export default router;