import { getManyTicketsTypes, getTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";

import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getManyTicketsTypes)
  .get("/", getTicket);

export { ticketsRouter };
