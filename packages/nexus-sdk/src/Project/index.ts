import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Project,
  ProjectList,
  ProjectListOptions,
  ProjectPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Project = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (orgLabel: string, projectLabel: string): Promise<Project> =>
      httpGet({
        path: `${context.uri}/${
          context.version
        }/projects/${orgLabel}/${projectLabel}`,
      }),
    list: (
      orgLabel?: string,
      options?: ProjectListOptions,
    ): Promise<ProjectList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: orgLabel
          ? `${context.uri}/${context.version}/projects/${orgLabel}/${opts}`
          : `${context.uri}/${context.version}/projects/${opts}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ProjectPayload,
    ): Promise<Project> =>
      httpPut({
        path: `${context.uri}/${
          context.version
        }/projects/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      rev: number,
      payload: ProjectPayload,
    ): Promise<Project> =>
      httpPut({
        path: `${context.uri}/${
          context.version
        }/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      rev: number,
    ): Promise<Project> =>
      httpDelete({
        path: `${context.uri}/${
          context.version
        }/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      options?: { pollTime: number },
    ): Observable<Project> =>
      poll({
        path: `${context.uri}/${
          context.version
        }/projects/${orgLabel}/${projectLabel}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Project;
