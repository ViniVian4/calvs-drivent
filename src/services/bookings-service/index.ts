import { notFoundError, unauthorizedError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomRepository from "@/repositories/room-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listBookings(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const booking = await bookingRepository.findBookingByUserId(userId);

  if (!booking) {
    throw notFoundError();
  }

  return {
    id: booking.id,
    Room: booking.Room
  };
}

async function bookingProcess(userId: number, roomId: number) {
  await verifyTicketAndEnrollment(userId);
  await verifyRoom(roomId);

  const booking = await bookingRepository.createBooking(userId, roomId);

  return booking.id;
}

async function changeBooking(userId: number, roomId: number, bookingId: number) {
  await verifyTicketAndEnrollment(userId);
  await verifyRoom(roomId);

  const booking = await bookingRepository.updateBooking(bookingId, roomId);
    
  return booking.id;
}

async function verifyTicketAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment || enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw unauthorizedError();
  }
}

async function verifyRoom(roomId: number) {
  const room = await roomRepository.findRoomById(roomId);

  if (!room) {
    throw notFoundError();
  } else if (room.Booking.length === room.capacity) {
    throw unauthorizedError();
  }
}

const bookingService = {
  listBookings,
  bookingProcess,
  changeBooking
};

export default bookingService;
