import type { Response, Request, NextFunction, RequestHandler } from "express";
import { z } from "zod";

export const validate = (
  schema: z.ZodType,
  source: "body" | "params",
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).send({
        message: "Datos invalidos",
        error: result.error.flatten().fieldErrors,
      });
    }

    if (source === "body") {
      req.body = result.data;
    }

    next();
  };
};
