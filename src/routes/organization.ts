import { FastifyInstance } from 'fastify'
import { create } from '@/controllers/organizations/create'
import { authenticate } from '@/controllers/organizations/authenticate'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  app.post('/auth', authenticate)
}
