import Project from '.';
import createHttpLink from '../utils/http';
import {
  CreateProjectPayload,
  ListProjectOptions,
  ProjectResponse,
  ListProjectsResponse,
  ProjectResponseCommon,
  ProjectEventListeners,
  ProjectCreatedEvent,
  ProjectUpdatedEvent,
  ProjectDeprecatedEvent,
  ProjectEventType,
} from './types';
import { PaginatedList } from '../utils/types';
import { getEventSource, parseMessageEventData } from '../utils/events';
// @ts-ignore
import EventSource = require('eventsource');
import { buildQueryParams } from '../utils';
import Store from '../utils/Store';

export interface ProjectUtils {
  get(
    orgLabel: string,
    projectLabel: string,
    options?: { revision?: number },
  ): Promise<Project>;
  list(
    orgLabel: string,
    options?: ListProjectOptions,
  ): Promise<PaginatedList<Project>>;
  create(
    orgLabel: string,
    projectLabel: string,
    projectPayload: CreateProjectPayload,
  ): Promise<Project>;
  update(
    orgLabel: string,
    projectLabel: string,
    rev: number,
    projectPayload: CreateProjectPayload,
  ): Promise<Project>;
  deprecate(
    orgLabel: string,
    projectLabel: string,
    rev: number,
  ): Promise<Project>;
  subscribe(listeners: ProjectEventListeners): EventSource;
}

export default function makeProjectUtils(store: Store): ProjectUtils {
  const { httpGet, httpPut, httpDelete } = createHttpLink(store);

  return {
    /**
     *
     * @param orgLabel Organization label of the project
     * @param projectLabel Project label to get
     * @param options<Object<revision>> The specific tag OR revision to fetch
     */
    get: async (
      orgLabel: string,
      projectLabel: string,
      options?: { revision?: number },
    ): Promise<Project> => {
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
        return new Project(projectResponse, store);
      } catch (error) {
        throw error;
      }
    },

    list: async (
      orgLabel: string,
      options?: ListProjectOptions,
    ): Promise<PaginatedList<Project>> => {
      const ops = buildQueryParams(options);
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
            new Project(
              {
                ...commonResponse,
                '@context': listProjectResponse['@context'],
              },
              store,
            ),
        );
        return {
          total: listProjectResponse._total,
          index: (options && options.from) || 0,
          results: projects,
        };
      } catch (error) {
        throw error;
      }
    },

    create: async (
      orgLabel: string,
      projectLabel: string,
      projectPayload: CreateProjectPayload,
    ): Promise<Project> => {
      try {
        const projectResponse: ProjectResponse = await httpPut(
          `/projects/${orgLabel}/${projectLabel}`,
          projectPayload,
        );
        return new Project({ ...projectResponse, ...projectPayload }, store);
      } catch (error) {
        throw error;
      }
    },

    update: async (
      orgLabel: string,
      projectLabel: string,
      rev: number,
      projectPayload: CreateProjectPayload,
    ): Promise<Project> => {
      try {
        const projectResponse: ProjectResponse = await httpPut(
          `/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
          projectPayload,
        );
        return new Project({ ...projectResponse, ...projectPayload }, store);
      } catch (error) {
        throw error;
      }
    },

    deprecate: async (
      orgLabel: string,
      projectLabel: string,
      rev: number,
    ): Promise<Project> => {
      try {
        const projectResponse: ProjectResponse = await httpDelete(
          `/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
        );
        return new Project(projectResponse, store);
      } catch (error) {
        throw error;
      }
    },

    subscribe: (listeners: ProjectEventListeners): EventSource => {
      const event: EventSource = getEventSource('/projects/events');

      // set event listeners
      listeners.onOpen && (event.onopen = listeners.onOpen);
      listeners.onError && (event.onerror = listeners.onError);
      listeners.onProjectCreated &&
        event.addEventListener(
          ProjectEventType.ProjectCreated,
          (event: Event) =>
            parseMessageEventData<ProjectCreatedEvent>(event as MessageEvent)(
              listeners.onProjectCreated,
            ),
        );
      listeners.onProjectUpdated &&
        event.addEventListener(
          ProjectEventType.ProjectUpdated,
          (event: Event) =>
            parseMessageEventData<ProjectUpdatedEvent>(event as MessageEvent)(
              listeners.onProjectUpdated,
            ),
        );
      listeners.onProjectDeprecated &&
        event.addEventListener(
          ProjectEventType.ProjectDeprecated,
          (event: Event) =>
            parseMessageEventData<ProjectDeprecatedEvent>(
              event as MessageEvent,
            )(listeners.onProjectDeprecated),
        );

      return event;
    },
  };
}
