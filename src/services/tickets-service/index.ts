import ticketsRepository from "@/repositories/tickets-repository";
import { TicketsType } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";

async function listAllTicketsTypes(): Promise<TicketsType[]> {
  const ticketsTypes = await ticketsRepository.findAllTypes();

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
};

export default ticketsService;
