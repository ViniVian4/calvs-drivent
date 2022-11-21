import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getManyTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypesList = await ticketsService.listAllTicketsTypes();
        
    return res.status(httpStatus.OK).send(ticketsTypesList);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as AuthenticatedRequest;

  try {
    const ticket = await ticketsService.getTicketByUserID(userId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
