import { notFoundError, unauthorizedError } from "@/errors";
import { PayRequest } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

async function getTicketPayment(ticketId: number, userId: number): Promise<Payment> {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  } else if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment: Payment = await paymentsRepository.findPaymentByTicketId(ticketId);

  return payment;
}

async function payTicket(userId: number, payRequest: PayRequest): Promise<Payment> {
  const ticket = await ticketsRepository.findTicketById(payRequest.ticketId);

  if (!ticket) {
    throw notFoundError();
  } else if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const cardLastDigits = String(payRequest.cardData.number % 10000);
  const newPayment: Omit<Payment, "id" | "createdAt"> = {
    ticketId: payRequest.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: payRequest.cardData.issuer,
    cardLastDigits,
    updatedAt: new Date()
  };
    
  await ticketsRepository.payTicket(newPayment.ticketId);
  const payment = await paymentsRepository.createPayment(newPayment);
    
  return payment;
}

const paymentsService = {
  getTicketPayment,
  payTicket
};

export default paymentsService;
