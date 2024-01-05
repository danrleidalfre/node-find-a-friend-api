import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate Organization', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      name: 'Org Example',
      email: 'org@email.org',
      phone: '00999999999',
      city: 'Org City',
      password: '123456',
    })

    const response = await request(app.server).post('/auth').send({
      email: 'org@email.org',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
