import { mockFetchers } from '../../testUtils';
import Archive from '..';

const archive = Archive(mockFetchers, { uri: 'http://api.url/v1' });

describe('Archive', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('Create()', () => {
    it('Uses a POST to create Archive with the correct path', async () => {
      await archive.create('org', 'project', {
        resources: [{ resourceId: 'id', '@type': 'File' }],
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/archives/org/project',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
    it('Uses a PUT to create Archive with the correct path', async () => {
      await archive.create('org', 'project', {
        archiveId: 'myArchive',
        resources: [{ resourceId: 'id', '@type': 'File' }],
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/archives/org/project/myArchive',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
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

    it('Appends format=expanded to the url when those options are used', async () => {
      await archive.get('org', 'project', 'archiveId', { format: 'expanded' });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/archives/org/project/archiveId?format=expanded',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('Returns a blob when using as = "x-tar" option', async () => {
      const mockHttpGet = jest.fn();
      const archive = Archive(
        {
          ...mockFetchers,
          httpGet: mockHttpGet,
        },
        { uri: 'http://api.url/v1' },
      );
      archive.get('org', 'project', 'archiveId', { as: 'x-tar' });
      const { context } = mockHttpGet.mock.calls[0][0];
      expect(context).toStrictEqual({ as: 'blob' });
    });
  });
});
