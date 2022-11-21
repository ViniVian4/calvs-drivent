import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import { Payment } from "@prisma/client";
import paymentsService from "@/services/payments-service";
import { PayRequest } from "@/protocols";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as AuthenticatedRequest;
  const { ticketId } = req.query;

  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const payment: Payment = await paymentsService.getTicketPayment(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "InvalidDataError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as AuthenticatedRequest;
  const payRequest: PayRequest = req.body;

  try {
    const payment: Payment = await paymentsService.payTicket(userId, payRequest);
        
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
