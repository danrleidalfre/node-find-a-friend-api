import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrganization } from '@/use-cases/factories/make-create-organization'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    city: z.string(),
  })

  const { name, phone, city } = createOrganizationBodySchema.parse(request.body)

  const createOrganizationUseCase = makeCreateOrganization()

  await createOrganizationUseCase.execute({
    name,
    phone,
    city,
  })

  return reply.status(201).send()
}
