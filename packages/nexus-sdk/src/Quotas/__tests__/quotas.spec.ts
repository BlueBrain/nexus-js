import Quotas from '..';
import { mockFetchers } from '../../testUtils';

const quotas = Quotas(mockFetchers, { uri: 'http://api.url/v1' });

describe('Quotas', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the quotas api with the right url', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          data: '',
        }),
      );
      await quotas.get('orgLabel', 'projectLabel');

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/quotas/orgLabel/projectLabel',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });
});
