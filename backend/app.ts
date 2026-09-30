import express from "express";
import type { Request, Response } from "express";
import pagosRoutes from "./src/routes/pago.route.ts"
import contratosRoutes from "./src/routes/contrato.route.ts"

const app = express();

app.use(express.json());
// app.use("/api/users")
app.use("/api", pagosRoutes)
app.use("/api", contratosRoutes)

app.get("/api", (req: Request, res: Response) => {
  res.send("Ok");
});


export default app;
