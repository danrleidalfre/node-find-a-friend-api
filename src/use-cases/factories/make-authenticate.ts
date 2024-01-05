import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaOrganizations } from '@/repositories/prisma/prisma-organizations'

export function makeAuthenticate() {
  const prismaOrganizationRepository = new PrismaOrganizations()
  return new AuthenticateUseCase(prismaOrganizationRepository)
}
