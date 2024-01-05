import { Pet } from '@prisma/client'
import { Pets } from '@/repositories/pets'

interface CreatePetUseCaseRequest {
  name: string
  organization_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: Pets) {}

  async execute({
    name,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      organization_id,
    })

    return { pet }
  }
}
