import Project from '.';
import { httpGet, httpPut, httpDelete } from '../utils/http';
import {
  CreateProjectPayload,
  ListProjectOptions,
  ProjectResponse,
  ListProjectsResponse,
  ProjectResponseCommon,
  ProjectEventListeners,
  ProjectEvent,
  ProjectCreatedEvent,
  ProjectUpdatedEvent,
  ProjectDeprecatedEvent,
} from './types';
import { PaginatedList } from '../utils/types';
import { getEventSource, parseMessageEventData } from '../utils/events';

/**
 *
 * @param orgLabel Organization label of the project
 * @param projectLabel Project label to get
 * @param options<Object<revision>> The specific tag OR revision to fetch
 */
export async function getProject(
  orgLabel: string,
  projectLabel: string,
  options?: { revision?: number },
): Promise<Project> {
  try {
    // check if we have options
    let ops: string = '';
    if (options) {
      if (options.revision) {
        ops = `?rev=${options.revision}`;
      }
    }
    // Get project details
    const projectResponse: ProjectResponse = await httpGet(
      `/projects/${orgLabel}/${projectLabel}${ops}`,
    );
    return new Project(projectResponse);
  } catch (error) {
    throw new Error(error);
  }
}

export async function listProjects(
  orgLabel: string,
  options?: ListProjectOptions,
): Promise<PaginatedList<Project>> {
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
      return {
        total: 0,
        index: 0,
        results: [],
      };
    }
    const projects: Project[] = listProjectResponse._results.map(
      (commonResponse: ProjectResponseCommon) =>
        new Project({
          ...commonResponse,
          '@context': listProjectResponse['@context'],
        }),
    );
    return {
      total: listProjectResponse._total,
      index: (options && options.from) || 1,
      results: projects,
    };
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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

export async function deprecateProject(
  orgLabel: string,
  projectLabel: string,
  rev: number,
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

export function subscribe(listeners: ProjectEventListeners): EventSource {
  const event: EventSource = getEventSource('/projects/events');
  //
  // set event listeners
  //
  listeners.onOpen && (event.onopen = listeners.onOpen);
  listeners.onError && (event.onerror = listeners.onError);
  listeners.onProjectCreated &&
    event.addEventListener('ProjectCreated', (event: Event) =>
      parseMessageEventData<ProjectCreatedEvent>(event as MessageEvent)(
        listeners.onProjectCreated,
      ),
    );
  listeners.onProjectUpdated &&
    event.addEventListener('ProjectUpdated', (event: Event) =>
      parseMessageEventData<ProjectUpdatedEvent>(event as MessageEvent)(
        listeners.onProjectUpdated,
      ),
    );
  listeners.onProjectDeprecated &&
    event.addEventListener('ProjectDeprecated', (event: Event) =>
      parseMessageEventData<ProjectDeprecatedEvent>(event as MessageEvent)(
        listeners.onProjectDeprecated,
      ),
    );

  return event;
}
