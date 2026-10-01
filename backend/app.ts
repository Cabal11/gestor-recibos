import express from "express";
import type { Request, Response } from "express";
import { apiReference } from "@scalar/express-api-reference";

import pagosRoutes from "./src/routes/pago.route.ts";
import contratosRoutes from "./src/routes/contrato.route.ts";

const app = express();

app.use(express.json());
// app.use("/api/users")
app.use("/api", pagosRoutes);
app.use("/api", contratosRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({message: "Hola mundo "});
});

app.get("/swagger-output.json", (req, res) => {
  res.sendFile("swagger-output.json", { root: process.cwd() });
});

app.use(
  "/docs",
  apiReference({
    spec: {
      url: "/swagger-output.json",
    },
  }),
);

export default app;
