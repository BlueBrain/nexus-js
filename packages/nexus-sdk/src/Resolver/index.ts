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

const Resolver = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      options?: GetResolverOptions,
    ): Promise<Resolver> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/${
          context.version
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}${opts}`,
      });
    },
    list: (
      orgLabel?: string,
      options?: ListResolverOptions,
    ): Promise<ResolverList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/${context.version}/resolvers/${orgLabel}${opts}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ResolverPayload,
    ): Promise<Resolver> =>
      httpPut({
        path: `${context.uri}/${
          context.version
        }/resolvers/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      rev: number,
      payload: ResolverPayload,
    ): Promise<Resolver> =>
      httpPut({
        path: `${context.uri}/${
          context.version
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      rev: number,
    ): Promise<Resolver> =>
      httpDelete({
        path: `${context.uri}/${
          context.version
        }/resolver/${orgLabel}/${projectLabel}/${resolverId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      options?: { pollTime: number },
    ): Observable<Resolver> =>
      poll({
        path: `${context.uri}/${
          context.version
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Resolver;
