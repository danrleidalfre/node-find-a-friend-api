import { Pet, Prisma } from '@prisma/client'

export interface Pets {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}