import { Pet } from '@prisma/client'
import { Pets } from '@/repositories/pets'

interface SearchPetsUseCaseRequest {
  city: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: Pets) {}

  async execute({
    city,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetchMany(city)

    return { pets }
  }
}
