const request = require('supertest');
const app = require('../server/app');

describe('Test root path', () => {
  test('It should get response with GET', async () => {
    try {
      const response = await request(app).get('/test');
      expect(response.statusCode).toEqual(200);
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
