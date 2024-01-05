import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Create Organization', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'Test Organization',
      email: 'org@email.org',
      phone: '00999999999',
      city: 'Test City',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
