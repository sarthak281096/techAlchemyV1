const request = require('supertest')
const app = require('../app')
describe('Post Endpoints', () => {

  it('should return status 200 when called', async () => {
    const res = await request(app)
      .get('/api/weather')
    expect(res.statusCode).toEqual(200)
  })
})