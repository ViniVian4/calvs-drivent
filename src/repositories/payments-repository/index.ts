import { prisma } from "@/config";
import { Payment } from "@prisma/client";

function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

function createPayment(newPayment: Omit<Payment, "id" | "createdAt">) {
  return prisma.payment.create({
    data: newPayment
  });
}

const paymentsRepository = {
  findPaymentByTicketId,
  createPayment
};

export default paymentsRepository;
