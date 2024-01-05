import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { Pets } from '@/repositories/pets'

export class PrismaPets implements Pets {
  async create(data: Prisma.PetUncheckedCreateInput) {
    return prisma.pet.create({ data })
  }
}
