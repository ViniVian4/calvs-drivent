import { prisma } from "@/config";

async function findAllTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  findAllTicketsTypes,
  findTicketByEnrollmentId,
};

export default ticketsRepository;
