import { PrismaPets } from '@/repositories/prisma/prisma-pets'
import { GetPetUseCase } from '@/use-cases/get-pet'

export function makeGetPet() {
  const petsRepository = new PrismaPets()
  return new GetPetUseCase(petsRepository)
}
