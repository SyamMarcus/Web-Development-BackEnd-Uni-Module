const request = require('supertest');
const app = require('../app');

describe('Post new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/TCS/register')
      .send({
        userName: 'unique_112233',
        password: 'password',
        email: 'unique_email@example.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('created', true);
  });
});
