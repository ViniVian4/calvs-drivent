import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

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

async function insertNewTicket(newTicket: Omit<Ticket, "id"|"createdAt">) {
  return prisma.ticket.create({
    data: newTicket,
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  findAllTicketsTypes,
  findTicketByEnrollmentId,
  insertNewTicket
};

export default ticketsRepository;
