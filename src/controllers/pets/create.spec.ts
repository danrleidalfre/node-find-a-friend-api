import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Create Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    await request(app.server).post('/organizations').send({
      name: 'Org Example',
      email: 'org@email.org',
      phone: '00999999999',
      city: 'Org City',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/auth').send({
      email: 'org@email.org',
      password: '123456',
    })

    const token = authResponse.body.token

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet Example',
      })

    expect(response.statusCode).toEqual(201)
  })
})
