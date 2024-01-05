import fastify from 'fastify'
import { env } from '@/env'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { organizationRoutes } from '@/routes/organization'
import { petRoutes } from '@/routes/pets'

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
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})
