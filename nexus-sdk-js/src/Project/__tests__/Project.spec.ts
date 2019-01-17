import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import Project from '../index';
import {
  mockProjectResponse,
  mockViewsListResponse,
} from '../../__mocks__/helpers';
import {
  getProject,
  listProjects,
  createProject,
  updateProject,
  tagProject,
  deprecateProject,
} from '../utils';
import Nexus from '../../Nexus';
import ElasticSearchView from '../../View/ElasticSearchView';
import SparqlView from '../../View/SparqlView';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Project class', () => {
  it('Should create a Project instance', () => {
    const p = new Project('my-org', mockProjectResponse);
    expect(p.id).toEqual(mockProjectResponse['@id']);
    expect(p.name).toEqual(mockProjectResponse.name);
    expect(p.base).toEqual(mockProjectResponse.base);
    expect(p.version).toEqual(mockProjectResponse._rev);
    expect(p.deprecated).toEqual(mockProjectResponse._deprecated);
    expect(p.createdAt.toISOString()).toEqual(mockProjectResponse._createdAt);
    expect(p.updatedAt.toISOString()).toEqual(mockProjectResponse._updatedAt);
  });

  describe('listViews()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockViewsListResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const p = new Project('my-org', mockProjectResponse);
      await p.listViews();
      const viewURL = `/views/${p.orgLabel}/${p.label}`;
      expect(mock.calls[0][0]).toEqual(baseUrl + viewURL);
    });

    it('should return a list of ElasticSearchViews or SparqlView from a response that includes multiple view types', async () => {
      const p = new Project('my-org', mockProjectResponse);
      const myViews = await p.listViews();
      expect(myViews.length).toEqual(2);
    });
  });

  describe('getView()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockViewsListResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const p = new Project('my-org', mockProjectResponse);
      await p.getView("nxv:defaultElasticIndex");
      const viewURL = `/views/${p.orgLabel}/${p.label}`;
      expect(mock.calls[0][0]).toEqual(baseUrl + viewURL);
    });

    it('should return the view with the corresponding ID, be it SPARQL or ElasticSearch', async () => {
      const p = new Project('my-org', mockProjectResponse);
      const myView: ElasticSearchView | SparqlView = await p.getView("nxv:defaultSparqlIndex");
      expect(myView.id).toEqual("nxv:defaultSparqlIndex");
    });
  });

  describe('get a project', () => {
    beforeEach(() => {
      mockResponse('{}');
    });
    afterEach(() => {
      resetMocks();
    });
    it('set the rev option', async () => {
      await getProject('myorg', 'myproject', { revision: 21 });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject?rev=21`,
      );
    });
    it('set the tag option', async () => {
      await getProject('myorg', 'myproject', { tag: 'v1.0.0' });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject?tag=v1.0.0`,
      );
    });
    it('set the rev option over the tag one', async () => {
      await getProject('myorg', 'myproject', { revision: 39, tag: 'v1.0.0' });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject?rev=39`,
      );
    });
  });

  // TODO: blocked by https://github.com/BlueBrain/nexus/issues/112
  describe.skip('list projects', () => {
    beforeEach(() => {
      mockResponse('{}');
    });
    afterEach(() => {
      resetMocks();
    });
    it('call the /projects endpoint', async () => {
      await listProjects('myorg');
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg`);
    });
    it('set the full text search option', async () => {
      await listProjects('myorg', { q: 'what_is_this' });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg?q=what_is_this`,
      );
    });
    it('set the from option', async () => {
      await listProjects('myorg', { from: 2 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg?from=2`);
    });
    it('set the size option', async () => {
      await listProjects('myorg', { size: 50 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg?size=50`);
    });
    it('set the deprecated option', async () => {
      await listProjects('myorg', { deprecated: true });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg?deprecated=true`,
      );
    });
    it('set all the options', async () => {
      await listProjects('myorg', {
        d: 'query',
        from: 3,
        size: 10,
        deprecated: true,
      });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg?q=query&from=3&size=10&deprecated=true`,
      );
    });
  });

  describe('create a project', () => {
    beforeEach(() => {
      mockResponse('{}');
    });
    afterEach(() => {
      resetMocks();
    });
    it('set the rev option', async () => {
      const projectOptions = {
        base: 'http://base.com',
        name: 'This is top secret',
        prefixMappings: [
          {
            prefix: 'name',
            namespace: 'http://schema.org/name',
          },
        ],
      };
      await createProject('myorg', 'topsecret', projectOptions);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg/topsecret`);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(projectOptions));
    });
  });

  describe('update a project', () => {
    beforeEach(() => {
      mockResponse('{}');
    });
    afterEach(() => {
      resetMocks();
    });
    it('set the rev option', async () => {
      const projectOptions = {
        base: 'http://base.com',
        name: 'This is top secret',
        prefixMappings: [
          {
            prefix: 'name',
            namespace: 'http://schema.org/name',
          },
        ],
      };
      await updateProject('myorg', 'topsecret', 12, projectOptions);
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/topsecret?rev=12`,
      );
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(projectOptions));
    });
  });

  describe('tag a project', () => {
    beforeEach(() => {
      mockResponse('{}');
    });
    afterEach(() => {
      resetMocks();
    });
    it('updates the specific revision', async () => {
      await tagProject('myorg', 'myproject', 12, {
        tagName: 'v1.0.0',
        tagFromRev: 10,
      });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject/tags?rev=12`,
      );
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({ tag: 'v1.0.0', rev: 10 }),
      );
    });
  });

  describe('deprecate a project', () => {
    beforeEach(() => {
      mockResponse('{}');
    });
    afterEach(() => {
      resetMocks();
    });
    it('updates the specific revision', async () => {
      await deprecateProject('myorg', 'myproject', 12);
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject?rev=12`,
      );
    });
  });
});
