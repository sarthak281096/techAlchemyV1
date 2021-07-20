const request = require('supertest')
const app = require('../app')
describe('Post Endpoints', () => {

  it('should return 400 error while creating a new user', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({
        
      })
    expect(res.statusCode).toEqual(400)
  })

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({
            "email": `test1${Math.random()*1000}@gmail.com`,
            "name": "tester",
            "password": "testing1"
      })
    expect(res.statusCode).toEqual(200)
  })
})