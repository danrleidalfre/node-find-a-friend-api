import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Fetch Pets', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets in city', async () => {
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet Example',
      })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Org City',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Pet Example',
      }),
    ])
  })
})
