import { FastifyInstance } from 'fastify'
import { create } from '@/controllers/pets/create'
import { verifyJwt } from '@/middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
