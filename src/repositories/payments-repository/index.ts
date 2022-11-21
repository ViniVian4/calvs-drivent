import { prisma } from "@/config";

function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

const paymentsRepository = {
  findPaymentByTicketId
};

export default paymentsRepository;
