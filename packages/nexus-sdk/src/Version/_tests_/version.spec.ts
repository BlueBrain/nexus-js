import Version from '..';
import { mockFetchers } from '../../testUtils';

const version = Version(mockFetchers, { uri: 'http://api.url' });

describe('Version', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the version api with the right url', async () => {
      await version.get();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual('http://api.url/version');
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });
});
