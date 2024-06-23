const { test, expect } = require('@playwright/test');

let apiContext;

test.beforeAll(async ({ playwright }) => {
  // Kreiraj novi API kontekst
  apiContext = await playwright.request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
});

test('basic API test', async () => {
  const startTime = Date.now();
  const response = await apiContext.get('/posts');
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  const status = response.status();
  

  // Verify status code is 200
  expect(status).toBe(200);

  // Verify Content-Type is present
  expect(response.headers()['content-type']).toBeDefined();

  // Verify response time is less than 300ms
  expect(responseTime).toBeLessThan(300);
});