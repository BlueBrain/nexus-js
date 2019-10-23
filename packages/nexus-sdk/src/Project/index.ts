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
import { GetResourceCommonOptions } from '../Resource/types';

const Project = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      options?: GetResourceCommonOptions,
    ): Promise<Project> =>
      httpGet({
        path: `${
          context.uri
        }/projects/${orgLabel}/${projectLabel}${buildQueryParams(options)}`,
      }),
    list: (
      orgLabel?: string,
      options?: ProjectListOptions,
    ): Promise<ProjectList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: orgLabel
          ? `${context.uri}/projects/${orgLabel}${opts}`
          : `${context.uri}/projects${opts}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ProjectPayload,
    ): Promise<Project> =>
      httpPut({
        path: `${context.uri}/projects/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      rev: number,
      payload: ProjectPayload,
    ): Promise<Project> =>
      httpPut({
        path: `${context.uri}/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      rev: number,
    ): Promise<Project> =>
      httpDelete({
        path: `${context.uri}/projects/${orgLabel}/${projectLabel}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      options?: GetResourceCommonOptions & { pollIntervalMs: number },
    ): Observable<Project> => {
      const { pollIntervalMs, ...getProjectOptions } = options;
      return poll({
        path: `${
          context.uri
        }/projects/${orgLabel}/${projectLabel}${buildQueryParams(
          getProjectOptions,
        )}`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      });
    },
  };
};

export default Project;
