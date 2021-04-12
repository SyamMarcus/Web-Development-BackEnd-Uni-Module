const request = require('supertest');
const app = require('../app');

describe('Get all Listings', () => {
  it('should return all listings in the DB', async () => {
    const res = await request(app.callback())
      .get('/TCS/listings');
    expect(res.statusCode).toEqual(200);
  });
});

describe('Get Listings by Search', () => {
  it('should return a listings which match the search query "second" ', async () => {
    const res = await request(app.callback())
      .get('/TCS/listings/search?q=second');
    expect(res.statusCode).toEqual(200);
  });
});

describe('Get a Listings by ID', () => {
  it('should return a listing from the DB', async () => {
    const res = await request(app.callback())
      .get('/TCS/listings/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('ID', 1);
  });
});

describe('Post new listing', () => {
  it('should create a new listing', async () => {
    const res = await request(app.callback())
      .post('/TCS/listings')
      .send({
        title: 'Title for a Test Listing',
        breed: 'Test breed',
        summary: 'This test breed is just a temporary test dog',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('created', true);
  });
});

describe('Update a specified Listing', () => {
  it('should return info on the listing update', async () => {
    const res = await request(app.callback())
      .put('/TCS/listings/1')
      .send({
        title: 'New title for a Test Listing',
        breed: 'New Test breed',
        summary: 'Actually this test dog is a New Test breed',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('updated', true);
  });
});

describe('Delete a specified Listing', () => {
  it('should return info on the listing update ', async () => {
    const res = await request(app.callback())
      .delete('/TCS/listings/1');
    expect(res.statusCode).toEqual(201);
  });
});

describe('FAIL to get Listings by Search', () => {
  it('A search query with no matches should return a 404 status', async () => {
    const res = await request(app.callback())
      .get('/TCS/listings/search?q=34567876543456787654');
    expect(res.statusCode).toEqual(404);
  });
});

describe('FAIL to get a Listings by ID', () => {
  it('Entering bad ID should return a 404 status', async () => {
    const res = await request(app.callback())
      .get('/TCS/listings/999');
    expect(res.statusCode).toEqual(404);
  });
});

describe('FAIL to Post new listing', () => {
  it('Entering bad info should return a 400 status', async () => {
    const res = await request(app.callback())
      .post('/TCS/listings')
      .send({
        summary: 'This test forgot the title and breed!',
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('FAIL to Update a specified Listing', () => {
  it('Entering bad info should return a 400 status', async () => {
    const res = await request(app.callback())
      .put('/TCS/listings/1')
      .send({
        title: 'New title for a Test Listing',
        summary: 'I think this update accidently removed the dog breed!',
      });
    expect(res.statusCode).toEqual(400);
  });
});
