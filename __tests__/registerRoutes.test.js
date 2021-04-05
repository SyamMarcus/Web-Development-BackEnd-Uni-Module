const request = require('supertest');
const app = require('../app');

describe('Register a new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/TCS/register')
      .send({
        userName: 'TestUserName_101',
        password: 'password',
        email: 'TestUserName@mail.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('created', true);
  });
});

describe('FAIL to register a new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/TCS/register')
      .send({
        userName: 'TestUserName_101',
        email: 'DidntEnterPassowrd@mail.com',
      });
    expect(res.statusCode).toEqual(400);
  });
});
