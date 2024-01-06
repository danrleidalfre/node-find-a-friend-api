import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { Pets } from '@/repositories/pets'

export class PrismaPets implements Pets {
  async create(data: Prisma.PetUncheckedCreateInput) {
    return prisma.pet.create({ data })
  }

  async fetchMany(city: string) {
    const organizations = await prisma.organization.findMany({
      where: { city: { contains: city } },
    })

    const orgIds = organizations.map((org) => org.id)

    return prisma.pet.findMany({
      where: { organization_id: { in: orgIds } },
    })
  }

  async getById(id: string) {
    return prisma.pet.findFirst({
      where: { id },
    })
  }
}
