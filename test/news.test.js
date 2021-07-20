const request = require('supertest')
const app = require('../app')
describe('Post Endpoints', () => {

  it('should return 401 error when auth-token is not present', async () => {
    const res = await request(app)
      .get('/api/news')
    expect(res.statusCode).toEqual(401)
  })

})