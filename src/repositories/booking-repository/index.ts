import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    },
    include: {
      Room: true
    }
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      roomId: roomId,
      userId: userId
    }
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId: roomId
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  createBooking,
  updateBooking
};

export default bookingRepository;
