import ticketsRepository from "@/repositories/tickets-repository";
import { TicketsType } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import { Ticket } from "@prisma/client";

async function listAllTicketsTypes(): Promise<TicketsType[]> {
  const ticketsTypes = await ticketsRepository.findAllTicketsTypes();

  return ticketsTypes;
}

async function getTicketByUserID(userId: number) {
  const enrollmentId: number = await verifyEnrollmentByUserId(userId);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId);

  if (!ticket) {
    throw notFoundError;
  }

  return ticket;
}

async function createNewTicket(ticketTypeId: number, userId: number) {
  const enrollmentId: number = await verifyEnrollmentByUserId(userId);

  const newTicket: Omit<Ticket, "id"|"createdAt"> = {
    ticketTypeId,
    enrollmentId,
    status: "RESERVED",
    updatedAt: new Date()
  };

  const createdTicket: Ticket = await ticketsRepository.insertNewTicket(newTicket);
    
  return createdTicket;
}

async function verifyEnrollmentByUserId(userId: number): Promise<number> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) {
    throw notFoundError();
  }

  return enrollment.id;
}

const ticketsService = {
  listAllTicketsTypes,
  getTicketByUserID,
  createNewTicket
};

export default ticketsService;
