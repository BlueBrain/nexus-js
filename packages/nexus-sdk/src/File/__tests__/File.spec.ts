import NexusFile from '..';
import { mockFetchers } from '../../testUtils';

const file = NexusFile(mockFetchers, { uri: 'http://api.url', version: 'v1' });

describe('testing api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('calls google and returns data to me', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
    await file.list('org', 'project');
    //assert on the times called and arguments given to fetch
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'http://api.url/v1/files/org/project',
    );
  });
});
