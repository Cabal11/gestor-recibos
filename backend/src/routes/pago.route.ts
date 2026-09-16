import express from 'express';
import * as pagoController from "../controllers/pago.controller.ts"

const router = express.Router();

router.get("/pagos", pagoController.getPagos)
router.post("/pagos", pagoController.crearPago)
router.put("/pagos/:id", pagoController.editarPago)
router.delete("/pagos/:id", pagoController.eliminarPagos)

export default router;