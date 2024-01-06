import { Pet, Prisma } from '@prisma/client'

export interface Pets {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  fetchMany(city: string): Promise<Pet[]>

  getById(id: string): Promise<Pet | null>
}
