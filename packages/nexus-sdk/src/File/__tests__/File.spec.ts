import NexusFile from '..';
import { mockFetchers } from '../../testUtils';

const file = NexusFile(mockFetchers, { uri: 'http://api.url/v1' });

describe('KG', () => {
  describe('File', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should make httpGet call to the file api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.list('org', 'project');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project',
      );
    });
    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.list('org', 'project', { createdBy: 'me' });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project?createdBy=me',
      );
    });
  });
});
