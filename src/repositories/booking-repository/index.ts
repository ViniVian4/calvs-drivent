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

const bookingRepository = {
  findBookingByUserId,
  createBooking
};

export default bookingRepository;
