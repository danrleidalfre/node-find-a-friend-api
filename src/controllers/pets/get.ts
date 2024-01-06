import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPet } from '@/use-cases/factories/make-get-pet'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getPetQuerySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetQuerySchema.parse(request.params)

  const GetPetUseCase = makeGetPet()

  const { pet } = await GetPetUseCase.execute({ id })

  return reply.status(200).send({ pet })
}
