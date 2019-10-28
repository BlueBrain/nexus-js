import { Observable } from '@bbp/nexus-link';
import {
  Fetchers,
  GetResourceOptions,
  GetResourceSourceOptions,
  Resource,
  ResourceSource,
  ResourceLink,
} from '../types';
import {
  ResourceListOptions,
  ResourcePayload,
  ResourceList,
  PaginatedList,
  ExpandedResource,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildHeader, buildQueryParams } from '../utils';
import { DEFAULT_SCHEMA_ID } from '../constants';

const Resource = (
  { httpGet, httpPut, httpPost, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: <T>(
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      options?: GetResourceOptions,
    ): Promise<Resource<T> | ExpandedResource<T>> => {
      const { as = 'json', ...opts } = options || {};

      let parseAs = 'json';

      if (as === 'n-triples' || as === 'vnd.graph-viz') {
        parseAs = 'text';
      }

      return httpGet({
        headers: { Accept: buildHeader(as) },
        path: `${
          context.uri
        }/resources/${orgLabel}/${projectLabel}/${DEFAULT_SCHEMA_ID}/${resourceId}${buildQueryParams(
          opts,
        )}`,
        context: {
          parseAs,
        },
      });
    },
    list: <T>(
      orgLabel: string,
      projectLabel: string,
      options?: ResourceListOptions,
    ): Promise<ResourceList<T>> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/resources/${orgLabel}/${projectLabel}${opts}`,
      });
    },
    links: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      direction: 'incoming' | 'outgoing',
      options?: ResourceListOptions,
    ): Promise<PaginatedList<ResourceLink>> =>
      httpGet({
        path: `${
          context.uri
        }/resources/${orgLabel}/${projectLabel}/${DEFAULT_SCHEMA_ID}/${resourceId}/${direction}${buildQueryParams(
          options,
        )}`,
      }),
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ResourcePayload,
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/resources/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      rev: number,
      payload: ResourcePayload,
      schemaId?: string,
    ): Promise<Resource> =>
      httpPut({
        path: `${
          context.uri
        }/resources/${orgLabel}/${projectLabel}/${schemaId ||
          DEFAULT_SCHEMA_ID}/${resourceId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    tag: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      rev: number,
      payload: {
        tag: string;
        rev: number;
      },
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/resources/${orgLabel}/${projectLabel}/${resourceId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      rev: number,
      schemaId?: string,
    ): Promise<Resource> =>
      httpDelete({
        path: `${
          context.uri
        }/resources/${orgLabel}/${projectLabel}/${schemaId ||
          DEFAULT_SCHEMA_ID}/${resourceId}?rev=${rev}`,
      }),
    poll: <T>(
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      options?: GetResourceOptions & { pollIntervalMs: number },
    ): Observable<Resource & T> => {
      const { pollIntervalMs, ...getResourceOptions } = options;
      return poll({
        path: `${
          context.uri
        }/resources/${orgLabel}/${projectLabel}/${DEFAULT_SCHEMA_ID}/${resourceId}${buildQueryParams(
          getResourceOptions,
        )}`,
        context: { pollIntervalMs: pollIntervalMs || 1000 },
      });
    },
    getSource: <T>(
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      schemaId?: string,
      options?: GetResourceSourceOptions,
    ): Promise<ResourceSource & T> => {
      return httpGet({
        path: `${
          context.uri
        }/resources/${orgLabel}/${projectLabel}/${schemaId ||
          DEFAULT_SCHEMA_ID}/${resourceId}/source${buildQueryParams(options)}`,
      });
    },
  };
};

export default Resource;
