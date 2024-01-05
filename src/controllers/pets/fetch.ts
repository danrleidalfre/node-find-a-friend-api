import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchPets } from '@/use-cases/factories/make-fetch-pets'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = fetchPetsQuerySchema.parse(request.query)

  const FetchPetsUseCase = makeFetchPets()

  const { pets } = await FetchPetsUseCase.execute({
    city,
  })

  return reply.status(200).send({ pets })
}
