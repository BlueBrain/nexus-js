import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Storage from '../';
import Nexus from '../../Nexus';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Storage', () => {
  beforeEach(() => {
    fetchMock.mockResponse('{}', {
      status: 200,
    });
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
  it('should list()', async () => {
    await Storage.list('myorg', 'myproject');
    expect(fetchMock.mock.calls[0][0]).toEqual(
      `${baseUrl}/storages/myorg/myproject`,
    );
  });
});
