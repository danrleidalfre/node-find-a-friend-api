import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrganization } from '@/use-cases/factories/make-create-organization'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    city: z.string(),
    password: z.string().min(6),
  })

  const { name, email, phone, city, password } =
    createOrganizationBodySchema.parse(request.body)

  const createOrganizationUseCase = makeCreateOrganization()

  await createOrganizationUseCase.execute({
    name,
    email,
    phone,
    city,
    password,
  })

  return reply.status(201).send()
}
