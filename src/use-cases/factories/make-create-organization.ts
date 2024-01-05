import { PrismaOrganizations } from '@/repositories/prisma/prisma-organizations'
import { CreateOrganizationUseCase } from '@/use-cases/create-organization'

export function makeCreateOrganization() {
  const organizationRepository = new PrismaOrganizations()
  return new CreateOrganizationUseCase(organizationRepository)
}
