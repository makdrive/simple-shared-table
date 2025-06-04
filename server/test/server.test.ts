import request from 'supertest';
import app from '../index';

// Use the Express app directly with supertest

test('GET /api/files returns list', async () => {
  const res = await request(app).get('/api/files');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.files)).toBe(true);
});
