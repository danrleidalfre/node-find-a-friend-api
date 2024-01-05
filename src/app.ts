import fastify from 'fastify'
import { organizationRoutes } from '@/routes/organization'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: { expiresIn: '10m' },
})

app.register(fastifyCookie)

app.register(organizationRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})
