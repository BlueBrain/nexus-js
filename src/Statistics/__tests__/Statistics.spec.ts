import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '../../Nexus';
import Statistics from '../index';
import { getViewStatistics, getResourceStatistics } from '../utils';

const { fetchMock } = <GlobalWithFetchMock>global;
const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

const mockStatistics = {
  '@context': 'https://bluebrain.github.io/nexus/contexts/view.json',
  delayInSeconds: 0,
  discardedEvents: 0,
  evaluatedEvents: 10,
  lastEventDateTime: '2019-04-03T12:27:41.344Z',
  lastProcessedEventDateTime: '2019-04-03T12:27:41.344Z',
  processedEvents: 10,
  remainingEvents: 0,
  totalEvents: 10,
};

describe('Statistics', () => {
  describe('getViewStatistics()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockStatistics), { status: 200 });
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call the appropriate URL', async () => {
      await getViewStatistics('myorg', 'myproject', 'viewid');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/views/myorg/myproject/viewid/statistics`,
      );
    });
    it('should encode the viewID', async () => {
      await getViewStatistics('myorg', 'myproject', 'http://viewid.com');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/views/myorg/myproject/http%3A%2F%2Fviewid.com/statistics`,
      );
    });
    it('should return an instance of statistics', async () => {
      const s: Statistics = await getViewStatistics(
        'myorg',
        'myproject',
        'viewid',
      );
      expect(s).toBeInstanceOf(Statistics);
      expect(s).toMatchSnapshot();
    });
  });
  describe('getResourceStatistics()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockStatistics), { status: 200 });
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call the appropriate URL', async () => {
      await getResourceStatistics('myorg', 'myproject', 'schemaid', 'viewid');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/schemaid/viewid/statistics`,
      );
    });
    it('should encode the viewID', async () => {
      await getResourceStatistics(
        'myorg',
        'myproject',
        'http://schemaid.com',
        'http://viewid.com',
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/http%3A%2F%2Fschemaid.com/http%3A%2F%2Fviewid.com/statistics`,
      );
    });
    it('should return an instance of statistics', async () => {
      const s: Statistics = await getResourceStatistics(
        'myorg',
        'myproject',
        '_',
        'viewid',
      );
      expect(s).toBeInstanceOf(Statistics);
      expect(s).toMatchSnapshot();
    });
  });
});
