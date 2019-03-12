if (process.env.NODE_ENV === 'test') {
  const fetch = require('jest-fetch-mock');

  jest.setMock('node-fetch', fetch);
  global.fetch = fetch;
  global.fetchMock = fetch;
}
