import Search from '..';
import { mockFetchers } from '../../testUtils';

const search = Search(mockFetchers, { uri: 'http://api.url/v1' });
describe('Search', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('config', () => {
    it('should make httpGet call to the search config api with the right url and headers', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await search.config();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/search/config',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/ld+json',
      });
    });
  });

  describe('query', () => {
    it('should make httpPost call to the search query api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        query: {
          multi_match: {
            query: 'morphologies',
            fields: ['*'],
          },
        },
      };
      await search.query(payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/search/query',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });
});
