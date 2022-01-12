import GraphAnalytics from '..';
import { mockFetchers } from '../../testUtils';

const graphAnalytics = GraphAnalytics(mockFetchers, {
  uri: 'http://api.url/v1',
});

describe('GraphAnalytics', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should make httpGet call to the properties end point', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
    await graphAnalytics.properties('project', 'org', 'type');
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'http://api.url/v1/graph-analytics/org/project/properties/type',
    );
    expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
  });
  it('should make httpGet call to the relationships end point', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
    await graphAnalytics.relationships('project', 'org');
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'http://api.url/v1/graph-analytics/org/project/relationships/',
    );
    expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
  });
});
