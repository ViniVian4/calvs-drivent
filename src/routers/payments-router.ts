import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayment, postPayment } from "@/controllers";
import { newPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(newPaymentSchema), postPayment);

export { paymentsRouter };
