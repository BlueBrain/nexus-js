import { Observable } from '@bbp/nexus-link';
import { Fetchers, GetResourceOptions, Resource } from '../types';
import {
  ResourceListOptions,
  ResourcePayload,
  PaginatedResource,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';
import { DEFAULTS } from '../constants';

const Resource = (
  { httpGet, httpPut, httpPost, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: <T = {}>(
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      options?: GetResourceOptions,
    ): Promise<Resource & T> =>
      httpGet({
        path: `${context.uri}/resources/${orgLabel}/${projectLabel}/${
          DEFAULTS.SCHEMA_ID
        }/${resourceId}${buildQueryParams(options)}`,
      }),
    list: <T = {}>(
      orgLabel: string,
      projectLabel: string,
      options?: ResourceListOptions,
    ): Promise<PaginatedResource<Resource & T>> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/resources/${orgLabel}/${projectLabel}${opts}`,
      });
    },
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
          DEFAULTS.SCHEMA_ID}/${resourceId}?rev=${rev}`,
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
          DEFAULTS.SCHEMA_ID}/${resourceId}?rev=${rev}`,
      }),
    poll: <T = {}>(
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      options?: GetResourceOptions & { pollTime: number },
    ): Observable<Resource & T> => {
      const { pollTime, ...getResourceOptions } = options;
      return poll({
        path: `${context.uri}/resources/${orgLabel}/${projectLabel}/${
          DEFAULTS.SCHEMA_ID
        }/${resourceId}${buildQueryParams(getResourceOptions)}`,
        context: { pollTime: pollTime || 1000 },
      });
    },
  };
};

export default Resource;
