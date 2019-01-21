import Project, {
  ProjectResponse,
  ListProjectsResponse,
  ProjectResponseCommon,
} from '.';
import { httpGet, httpPut, httpDelete } from '../utils/http';
import { CreateProjectPayload, ListProjectOptions } from './types';

/**
 *
 * @param orgLabel Organization label of the project
 * @param projectLabel Project label to get
 * @param options<Object<revision, tag>> The specific tag OR revision to fetch
 */
export async function getProject(
  orgLabel: string,
  projectLabel: string,
  options?: { revision?: number; tag?: string },
): Promise<Project> {
  try {
    // check if we have options
    let ops: string = '';
    if (options) {
      // it's rev or tag, not both. We take rev over tag
      if (options.revision) {
        ops = `?rev=${options.revision}`;
      } else if (options.tag) {
        ops = `?tag=${options.tag}`;
      }
    }
    // Get project details
    const projectResponse: ProjectResponse = await httpGet(
      `/projects/${orgLabel}/${projectLabel}${ops}`,
    );
    return new Project(projectResponse);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function listProjects(
  orgLabel: string,
  options?: ListProjectOptions,
): Promise<Project[]> {
  let ops = '';
  if (options) {
    ops = Object.keys(options).reduce(
      (currentOps, key) =>
        currentOps.length === 0
          ? `?${key}=${options[key]}`
          : `${currentOps}&${key}=${options[key]}`,
      '',
    );
  }
  try {
    const listProjectResponse: ListProjectsResponse = await httpGet(
      `/projects/${orgLabel}${ops}`,
    );
    if (listProjectResponse.code || !listProjectResponse._results) {
      return [];
    }
    const projects: Project[] = listProjectResponse._results.map(
      (commonResponse: ProjectResponseCommon) =>
        new Project({
          ...commonResponse,
          '@context': listProjectResponse['@context'],
        }),
    );
    return projects;
  } catch (error) {
    throw new Error(error.message);
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
    return new Project({ ...projectResponse, ...projectPayload });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProject(
  orgLabel: string,
  projectLabel: string,
  rev: number,
  projectPayload: CreateProjectPayload,
): Promise<Project> {
  try {
    const projectResponse: ProjectResponse = await httpPut(
      `/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
      projectPayload,
    );
    return new Project({ ...projectResponse, ...projectPayload });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function tagProject(
  orgLabel: string,
  projectLabel: string,
  rev: number = 1,
  {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  },
): Promise<Project> {
  try {
    const projectResponse: ProjectResponse = await httpPut(
      `/projects/${orgLabel}/${projectLabel}/tags?rev=${rev}`,
      {
        tag: tagName,
        rev: tagFromRev,
      },
    );
    return new Project(projectResponse);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deprecateProject(
  orgLabel: string,
  projectLabel: string,
  rev: number = 1,
): Promise<Project> {
  try {
    const projectResponse: ProjectResponse = await httpDelete(
      `/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
    );
    return new Project(projectResponse);
  } catch (error) {
    throw new Error(error);
  }
}
