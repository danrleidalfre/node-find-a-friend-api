import { PrismaPets } from '@/repositories/prisma/prisma-pets'
import { CreatePetUseCase } from '@/use-cases/create-pet'

export function makeCreatePet() {
  const petsRepository = new PrismaPets()
  return new CreatePetUseCase(petsRepository)
}
