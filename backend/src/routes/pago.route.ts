import express from 'express';
import * as userControlller from "../controllers/pago.controller.ts"

const router = express.Router();

router.get("/pagos", userControlller.getPagos)
router.post("/pagos", userControlller.crearPago)

export default router;