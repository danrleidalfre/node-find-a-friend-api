import { Pet } from '@prisma/client'
import { Pets } from '@/repositories/pets'

interface FetchPetsUseCaseRequest {
  city: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: Pets) {}

  async execute({
    city,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetchMany(city)

    return { pets }
  }
}
