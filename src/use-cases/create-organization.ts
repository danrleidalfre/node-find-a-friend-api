import { Organization } from '@prisma/client'
import { Organizations } from '@/repositories/organizations'
import { hash } from 'bcryptjs'

interface CreateOrganizationUseCaseRequest {
  name: string
  email: string
  phone: string
  city: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: Organizations) {}

  async execute({
    name,
    email,
    phone,
    city,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      name,
      email,
      phone,
      city,
      password_hash,
    })

    return { organization }
  }
}
