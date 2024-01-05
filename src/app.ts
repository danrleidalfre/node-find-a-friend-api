import fastify from 'fastify'
import { organozationRoutes } from '@/routes/organization'

export const app = fastify()

app.register(organozationRoutes)
