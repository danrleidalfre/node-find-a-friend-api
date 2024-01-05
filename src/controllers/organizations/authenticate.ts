import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthenticate } from '@/use-cases/factories/make-authenticate'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticate()

    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sub: organization.id,
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sub: organization.id,
        expiresIn: '7d',
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: e.message })
    }

    return reply.status(500).send()
  }
}
