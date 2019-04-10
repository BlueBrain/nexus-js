import AggregateSparqlView from '../';
import { AggregateSparqlViewResponse } from '../types';

const mockAggregatedSparqlViewGetResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/view.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id': 'http://example.com/base/aggregated',
  '@type': ['View', 'AggregateSparqlView'],
  _uuid: 'c166385c-c2c3-4815-b82e-b4ba5bef6910',
  views: [
    {
      project: 'my-org/my-project',
      viewId: 'http://example.com/base/custom',
    },
    {
      project: 'my-org/my-project-2',
      viewId: 'http://example.com/base/custom',
    },
  ],
  _self: 'http://example.com/v1//v1/views/my-org/my-project/aggregated',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/view.json',
  _project: 'http://example.com/v1//v1/projects/my-org/my-project',
  _rev: 1,
  _deprecated: false,
  _createdAt: '2019-04-10T08:58:39.530Z',
  _createdBy: 'http://example.com/v1//v1/realms/github/users/kenjinp',
  _updatedAt: '2019-04-10T08:58:39.530Z',
  _updatedBy: 'http://example.com/v1//v1/realms/github/users/kenjinp',
};

const mockAggregatedSparqlViewResponse = {
  '@context': 'https://bluebrain.github.io/nexus/contexts/resource.json',
  '@id': 'http://example.com/base/aggregated',
  '@type': ['View', 'AggregateSparqlView'],
  _self: 'http://example.com/v1/views/my-org/my-project/aggregated',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/view.json',
  _project: 'http://example.com/v1//v1/projects/my-org/my-project',
  _rev: 1,
  _deprecated: false,
  _createdAt: '2019-04-10T08:58:39.530Z',
  _createdBy: 'http://example.com/v1//v1/realms/github/users/kenjinp',
  _updatedAt: '2019-04-10T08:58:39.530Z',
  _updatedBy: 'http://example.com/v1//v1/realms/github/users/kenjinp',
};

const testMetaData = (
  view: AggregateSparqlView,
  response: AggregateSparqlViewResponse,
) => {
  expect(view).toHaveProperty('id', response['@id']);
  expect(view).toHaveProperty('type', response['@type']);
  expect(view).toHaveProperty('uuid', response['_uuid']);
  expect(view).toHaveProperty('rev', response['_rev']);
  expect(view).toHaveProperty('deprecated', response['_deprecated']);
};

describe('AggregateSparqlView', () => {
  describe('aggregateSparqlView', () => {
    it('should have all the properties created by the response', () => {
      const aggregateSparqlView = new AggregateSparqlView(
        'myOrg',
        'myProject',
        mockAggregatedSparqlViewGetResponse,
      );
      console.log(aggregateSparqlView);
      testMetaData(aggregateSparqlView, mockAggregatedSparqlViewGetResponse);
    });
  });
});
