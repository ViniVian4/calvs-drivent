import { prisma } from "@/config";

export function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
      updatedAt: new Date()
    }
  });
}

export function findBooking(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}
