import { toPromise, Observable } from '@bbp/nexus-link';
import { Fetchers, GetResourceOptions, Resource } from '../types';
import {
  ResourceList,
  ResourceListOptions,
  ResourcePayload,
  DEFAULT_SCHEMA_ID,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Resource = (
  { httpGet, httpPut, httpPost, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      options?: GetResourceOptions,
    ): Promise<Resource> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/resources/${orgLabel}/${projectLabel}/${DEFAULT_SCHEMA_ID}/${resourceId}${buildQueryParams(
            options,
          )}`,
        }),
      ),
    list: (
      orgLabel: string,
      projectLabel: string,
      options?: ResourceListOptions,
    ): Promise<ResourceList> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/resources/${orgLabel}/${projectLabel}${opts}`,
        }),
      );
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ResourcePayload,
    ): Promise<Resource> =>
      toPromise(
        httpPost({
          path: `${context.uri}/${
            context.version
          }/resources/${orgLabel}/${projectLabel}`,
          body: JSON.stringify(payload),
        }),
      ),
    update: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      rev: number,
      payload: ResourcePayload,
      schemaId?: string,
    ): Promise<Resource> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${
            context.version
          }/resources/${orgLabel}/${projectLabel}/${schemaId ||
            DEFAULT_SCHEMA_ID}/${resourceId}?rev=${rev}`,
          body: JSON.stringify(payload),
        }),
      ),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      rev: number,
      schemaId?: string,
    ): Promise<Resource> =>
      toPromise(
        httpDelete({
          path: `${context.uri}/${
            context.version
          }/resources/${orgLabel}/${projectLabel}/${schemaId ||
            DEFAULT_SCHEMA_ID}/${resourceId}?rev=${rev}`,
        }),
      ),
    poll: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      options?: GetResourceOptions & { pollTime: number },
    ): Observable<Resource> => {
      const { pollTime, ...getResourceOptions } = options;
      return poll({
        path: `${context.uri}/${
          context.version
        }/resources/${orgLabel}/${projectLabel}/${DEFAULT_SCHEMA_ID}/${resourceId}${buildQueryParams(
          getResourceOptions,
        )}`,
        context: { pollTime: pollTime || 1000 },
      });
    },
  };
};

export default Resource;
