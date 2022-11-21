import ticketsRepository from "@/repositories/tickets-repository";
import { TicketsType } from "@/protocols";

async function listAllTicketsTypes(): Promise<TicketsType[]> {
  const ticketsTypes = await ticketsRepository.findAllTypes();

  return ticketsTypes;
}

const ticketsService = {
  listAllTicketsTypes,
};

export default ticketsService;
