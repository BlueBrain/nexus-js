import { mockFetchers } from '../../testUtils';
import Archive from '..';

const archive = Archive(mockFetchers, { uri: 'http://api.url/v1' });

describe('Archive', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('Create()', () => {
    it('Uses a POST to the correct path', async () => {
      await archive.create('org', 'project', {
        resources: [{ resourceId: 'id', '@type': 'File' }],
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/archives/org/project',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('Get()', () => {
    it('Uses a GET to the correct path', async () => {
      await archive.get('org', 'project', 'archiveId');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/archives/org/project/archiveId',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('CreateWithId()', () => {
    it('Uses a PUT to the correct path with an id', async () => {
      await archive.createWithId('org', 'project', 'Id', {
        resources: [{ resourceId: 'id', '@type': 'File' }],
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/archives/org/project/Id',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });
});
