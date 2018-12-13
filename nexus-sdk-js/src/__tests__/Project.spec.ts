import Project, { ProjectResponse } from '../Project';
import { mockProjectResponse } from '../__mocks__/helpers';

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
});
