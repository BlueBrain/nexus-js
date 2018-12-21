import Project, { ProjectResponse } from '.';
import { ListOrgsResponse } from '../Organization';
import { httpGet, httpPut } from '../utils/http';
import { ListResourceResponse } from '../Resource';
import { CreateProjectPayload } from './types';

export async function getProject(
  orgLabel: string,
  projectLabel: string,
): Promise<Project> {
  try {
    // Get project details
    const projectResponse: ProjectResponse = await httpGet(
      `/projects/${orgLabel}/${projectLabel}`,
    );
    // We want to know how many resources the project has
    const resourceResponse: ListResourceResponse = await httpGet(
      `/resources/${orgLabel}/${projectLabel}`,
    );
    const project = new Project(orgLabel, {
      ...projectResponse,
      resourceNumber: resourceResponse._total || 0,
    });
    return project;
  } catch (error) {
    return error;
  }
}

// TODO: refactor -> blocked by https://github.com/BlueBrain/nexus/issues/112
export async function listProjects(orgLabel: string): Promise<Project[]> {
  try {
    const listOrgsResponse: ListOrgsResponse = await httpGet('/projects');
    if (listOrgsResponse.code || !listOrgsResponse._results) {
      return [];
    }
    // Get list of unique orgs names
    const filteredOrgNames: {
      orgName: string;
      projectName: string;
    }[] = listOrgsResponse._results
      .map(org => {
        const split = org._id.split('/');
        const [orgName, projectName] = split.slice(
          split.length - 2,
          split.length,
        );
        return { orgName, projectName };
      })
      .filter(({ orgName }) => orgName === orgLabel);

    return Promise.all(
      filteredOrgNames.map(
        async ({ projectName }) => await getProject(orgLabel, projectName),
      ),
    );
  } catch (error) {
    return error;
  }
}

export async function createProject(
  orgLabel: string,
  projectLabel: string,
  projectPayload: CreateProjectPayload,
) {
  try {
    const projectResponse: ProjectResponse = await httpPut(
      `/projects/${orgLabel}/${projectLabel}`,
      projectPayload,
    );
    return new Project(orgLabel, projectResponse);
  } catch (error) {
    return error;
  }
}
