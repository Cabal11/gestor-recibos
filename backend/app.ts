import express from "express";
import type { Request, Response } from "express";
import pagosRoutes from "./src/routes/pago.route.ts"

const app = express();

app.use(express.json());
// app.use("/api/users")
app.use("/api", pagosRoutes)
// app.use("/api/contratos")

// app.get("/api", (req: Request, res: Response) => {
//   res.send("Hello World");
// });

// app.listen(port, () => {
//   console.log("Iniciado: ", port);
// });

export default app;
