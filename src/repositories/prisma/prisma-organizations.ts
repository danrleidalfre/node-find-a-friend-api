import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { Organizations } from '@/repositories/organizations'

export class PrismaOrganizations implements Organizations {
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    return prisma.organization.create({ data })
  }

  findByEmail(email: string) {
    return prisma.organization.findUnique({ where: { email } })
  }
}
