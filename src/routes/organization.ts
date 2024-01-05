import { FastifyInstance } from 'fastify'
import { create } from '@/controllers/organizations/create'

export async function organozationRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
}
