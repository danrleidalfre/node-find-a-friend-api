import { Organization } from '@prisma/client'
import { Organizations } from '@/repositories/organizations'

interface CreateOrganizationUseCaseRequest {
  name: string
  phone: string
  city: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: Organizations) {}

  async execute({
    name,
    phone,
    city,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.create({
      name,
      phone,
      city,
    })

    return { organization }
  }
}
