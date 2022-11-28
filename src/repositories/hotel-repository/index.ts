import { prisma } from "@/config";

async function findAllHotels() {
  return prisma.hotel.findMany({
    include: {
      Rooms: {
        include: {
          Booking: true
        }
      }
    }
  });
}

async function findHotelByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    },
    include: {
      Rooms: {
        include: {
          Booking: true
        }
      }
    }
  });
}

const hotelRepository = {
  findAllHotels,
  findHotelByHotelId
};

export default hotelRepository;
