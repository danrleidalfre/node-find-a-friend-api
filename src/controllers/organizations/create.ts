import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrganization } from '@/use-cases/factories/make-create-organization'
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error'

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

  try {
    await createOrganizationUseCase.execute({
      name,
      email,
      phone,
      city,
      password,
    })
  } catch (e) {
    if (e instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: e.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
