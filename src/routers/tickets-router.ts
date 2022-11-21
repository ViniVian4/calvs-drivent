import { getManyTicketsTypes, getTicket, postNewTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { newTicketSchema } from "@/schemas";

import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getManyTicketsTypes)
  .get("/", getTicket)
  .post("/", validateBody(newTicketSchema), postNewTicket);

export { ticketsRouter };
