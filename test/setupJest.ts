import { GlobalWithFetchMock } from 'jest-fetch-mock';
if (process.env.NODE_ENV === 'test') {
  const fetch = require('jest-fetch-mock');

  const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

  jest.setMock('node-fetch', fetch);
  customGlobal.fetch = fetch;
  customGlobal.fetchMock = fetch;
}
