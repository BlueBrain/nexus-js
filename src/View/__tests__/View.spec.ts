import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '../../Nexus';

import View from '../index';
import { listViews, getView } from '../utils';
jest.mock('../utils');

describe('View', () => {
  it('should call the getView util function', () => {
    View.get('myorg', 'myproject', 'myviewid');
    expect(getView).toHaveBeenCalledWith('myorg', 'myproject', 'myviewid');
  });
  it('should call the listViews util function', () => {
    View.list('myorg', 'myproject');
    expect(listViews).toHaveBeenCalledWith('myorg', 'myproject');
  });
});
