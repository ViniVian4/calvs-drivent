import { needPaymentError, unauthorizedError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus, Hotel, Room, Booking } from "@prisma/client";
import { HotelData } from "@/protocols";

async function getHotels(userId: number): Promise<HotelData[]> {
  await checkTicket(userId);
  const hotels = await hotelRepository.findAllHotels();

  const hotelsData: HotelData[] = hotels.map(hotel => {
    let availableSpots = 0;

    hotel.Rooms.map(room => {
      availableSpots += room.capacity - room.Booking.length;
    });
    
    return {
      id: hotel.id,
      image: hotel.image,
      name: hotel.name,
      availableSpots
    };
  });

  return hotelsData;
}

async function checkTicket(userId: number) {
  const enrollmentId = await getEnrollmentIdByUserId(userId);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);

  if (!ticket) {
    throw unauthorizedError();
  }

  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw unauthorizedError();
  }

  if (ticket.status !== TicketStatus.PAID) {
    throw needPaymentError();
  }
}

async function getHotelWithRooms(userId: number, hotelId: number): Promise<CompleteHotel> {
  await checkTicket(userId);
  const hotel = await hotelRepository.findHotelByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }

  return hotel;
}

type CompleteHotel = Hotel & {
  Rooms: (Room & {
    Booking: Booking[]
  })[]
}

async function getEnrollmentIdByUserId(userId: number): Promise<number> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw unauthorizedError();
  }

  return enrollment.id;
}

const hotelsService = {
  getHotels,
  getHotelWithRooms
};

export default hotelsService;
