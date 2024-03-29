import { Organization, Prisma } from '@prisma/client'

export interface Organizations {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>

  findByEmail(email: string): Promise<Organization | null>
}
