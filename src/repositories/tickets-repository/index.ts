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

function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      Enrollment: true,
      TicketType: true
    }
  });
}

function payTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

const ticketsRepository = {
  findAllTicketsTypes,
  findTicketByEnrollmentId,
  insertNewTicket,
  findTicketById,
  payTicket
};

export default ticketsRepository;
