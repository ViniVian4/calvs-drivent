import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

async function getTicketPayment(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  } else if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment: Payment = await paymentsRepository.findPaymentByTicketId(ticketId);

  return payment;
}

const paymentsService = {
  getTicketPayment
};

export default paymentsService;
