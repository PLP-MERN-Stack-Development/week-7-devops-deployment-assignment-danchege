import { app } from '../server';
import request from 'supertest';
import { expect } from '@jest/globals';

describe('Server Tests', () => {
  it('should respond with 200 on health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'healthy',
      timestamp: expect.any(String)
    });
  });

  it('should respond with 404 on non-existent route', async () => {
    const response = await request(app).get('/non-existent');
    expect(response.status).toBe(404);
  });
});
