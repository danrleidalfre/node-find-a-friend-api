import { Pets } from '@/repositories/pets'
import { Pet } from '@prisma/client'

interface GetPetCaseRequest {
  id: string
}

interface GetPetCaseResponse {
  pet: Pet | null
}

export class GetPetUseCase {
  constructor(private petsRepository: Pets) {}

  async execute({ id }: GetPetCaseRequest): Promise<GetPetCaseResponse> {
    const pet = await this.petsRepository.getById(id)

    return { pet }
  }
}
