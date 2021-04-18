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
        role: 'user',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('created', true);
  });
});

describe('Check employee code exists through a search query', () => {
  it('The "123" employee code should be found with a query value of 1', async () => {
    const res = await request(app.callback())
      .get('/TCS/register/search?code=123')
      .auth('user', 'user');
    expect(res.body).toHaveProperty(["EXISTS(SELECT * from codes WHERE EmployeeCode='123')"], 1);
  });
});

describe('FAIL to register a new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/TCS/register')
      .send({
        userName: 'TestUserName_101',
        email: 'DidntEnterPassowrd@mail.com',
        role: 'user',
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('FAIL to find existing employee code through a search query', () => {
  it('A blank query should result in a query value of 0', async () => {
    const res = await request(app.callback())
      .get('/TCS/register/search?code=')
      .auth('user', 'user');
    expect(res.body).toHaveProperty(["EXISTS(SELECT * from codes WHERE EmployeeCode='')"], 0);
  });
});

describe('PASS logging in a user', () => {
  it('should receive a status code of 200 with login', async () => {
    const res = await request(app.callback())
      .post('/TCS/register/login')
      .auth('user', 'user');
    expect(res.statusCode).toEqual(200);
  });
});
