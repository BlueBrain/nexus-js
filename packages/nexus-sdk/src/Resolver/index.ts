import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Resolver,
  ResolverList,
  GetResolverOptions,
  ListResolverOptions,
  ResolverPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';
import { Resource } from '../Resource/types';

const Resolver = (
  { httpGet, httpPut, httpDelete, httpPost, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      options?: GetResolverOptions,
    ): Promise<Resource> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/resolvers/${orgLabel}/${projectLabel}/${resolverId}${opts}`,
      });
    },
    list: (
      orgLabel: string,
      projectLabel: string,
      options?: ListResolverOptions,
    ): Promise<ResolverList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/resolvers/${orgLabel}/${projectLabel}${opts}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ResolverPayload,
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/resolvers/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      rev: number,
      payload: ResolverPayload,
    ): Promise<Resource> =>
      httpPut({
        path: `${context.uri}/resolvers/${orgLabel}/${projectLabel}/${resolverId}?rev=${rev}`,
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
        path: `${context.uri}/resolvers/${orgLabel}/${projectLabel}/${resourceId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      rev: number,
    ): Promise<Resource> =>
      httpDelete({
        path: `${context.uri}/resolvers/${orgLabel}/${projectLabel}/${resolverId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      options?: GetResolverOptions & { pollIntervalMs: number },
    ): Observable<Resource> => {
      const { pollIntervalMs, ...getResolverOptions } = options;
      return poll({
        path: `${
          context.uri
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}${buildQueryParams(
          getResolverOptions,
        )}`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      });
    },
  };
};

export default Resolver;
