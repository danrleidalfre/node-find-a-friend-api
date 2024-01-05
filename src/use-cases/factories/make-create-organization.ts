import { PrismaOrganizations } from '@/repositories/prisma/prisma-organizations'
import { CreateOrganizationUseCase } from '@/use-cases/register'

export function makeCreateOrganization() {
  const organizationRepository = new PrismaOrganizations()
  return new CreateOrganizationUseCase(organizationRepository)
}
