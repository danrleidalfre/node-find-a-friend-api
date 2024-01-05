import { PrismaPets } from '@/repositories/prisma/prisma-pets'
import { FetchPetsUseCase } from '@/use-cases/fetch-pets'

export function makeFetchPets() {
  const petsRepository = new PrismaPets()
  return new FetchPetsUseCase(petsRepository)
}
