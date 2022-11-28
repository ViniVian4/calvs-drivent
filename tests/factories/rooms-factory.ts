import faker from "@faker-js/faker";
import { prisma } from "@/config";

export function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId,
      updatedAt: new Date()
    }
  });
}
