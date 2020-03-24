const request = require('supertest');
const app = require('../server/app');

test('should post data success', async () => {
  const res = await request(app)
    .post('/add_data')
    .send({
      store: {
        object1: {},
        object2: {},
        object3: {},
      },
    });
  expect(res.store).not.toEqual(null);
});
