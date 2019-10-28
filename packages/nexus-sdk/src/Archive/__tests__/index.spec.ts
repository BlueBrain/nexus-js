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

    it('should call httpGet with the correct parseAs context property', async () => {
      const mockHttpGet = jest.fn();

      const archive = Archive(
        {
          ...mockFetchers,
          httpGet: mockHttpGet,
        },
        {
          uri: 'http://api.url/v1',
        },
      );

      await archive.get('org', 'project', 'myId', { as: 'json' });
      await archive.get('org', 'project', 'myId', { as: 'n-triples' });
      await archive.get('org', 'project', 'myId', { as: 'vnd.graph-viz' });
      await archive.get('org', 'project', 'myId', { as: 'text' });
      expect(mockHttpGet.mock.calls[0][0].context).toHaveProperty(
        'parseAs',
        'json',
      );
      expect(mockHttpGet.mock.calls[1][0].context).toHaveProperty(
        'parseAs',
        'text',
      );
      expect(mockHttpGet.mock.calls[2][0].context).toHaveProperty(
        'parseAs',
        'text',
      );
      expect(mockHttpGet.mock.calls[3][0].context).toHaveProperty(
        'parseAs',
        'text',
      );
    });
  });

  describe('headers', () => {
    it('calls httpGet with the correct default header', async () => {
      await archive.get('org', 'project', 'archiveId');
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/x-tar',
      });
    });

    it('calls httpGet with the correct header when the format is passed', async () => {
      await archive.get('org', 'project', 'archiveId', { as: 'json' });
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/ld+json',
      });
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
