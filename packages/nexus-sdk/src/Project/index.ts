import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Project,
  ProjectList,
  ProjectListOptions,
  ProjectPayload,
  ProjectStatistics,
  ProjectDeletionConfig,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';
import { GetResourceOptions } from '../Resource/types';

const Project = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      options?: GetResourceOptions,
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
      options?: GetResourceOptions & { pollIntervalMs: number },
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
    statistics: (
      orgLabel: string,
      projectLabel: string,
    ): Promise<ProjectStatistics> =>
      httpGet({
        path: `${context.uri}/projects/${orgLabel}/${projectLabel}/statistics`,
      }),
    deletionConfig: (): Promise<ProjectDeletionConfig> =>
      httpGet({
        path: `${context.uri}/project-deletion/config`,
      }),
  };
};

export default Project;
