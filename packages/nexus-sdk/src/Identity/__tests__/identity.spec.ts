import Identity from '..';
import { mockFetchers } from '../../testUtils';

const identity = Identity(mockFetchers, { uri: 'http://api.url/v1' });

describe('Identity', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('list', () => {
    it('should make httpGet call to the identities api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await identity.list();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/identities',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('poll', () => {
    xit('should make httpGet call to the identities api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await identity.poll({ pollTime: 50 });
      console.log(fetchMock.mock.calls[0]);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/identities',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });
});
