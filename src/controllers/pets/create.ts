import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePet } from '@/use-cases/factories/make-create-pet'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePet()

  await createPetUseCase.execute({
    name,
    organization_id: request.user.sub,
  })

  return reply.status(201).send()
}
