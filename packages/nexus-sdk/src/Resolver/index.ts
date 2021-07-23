import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Resolver,
  ResolverList,
  GetResolverOptions,
  ListResolverOptions,
  ResolverPayload,
  CreateResolverOptions,
  UpdateResolverOptions,
  TagResolverOptions,
  DeprecateResolverOptions,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildHeader, buildQueryParams, parseAsBuilder } from '../utils';
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
      const { as = 'json', ...opts } = options || {};
      const parseAs = parseAsBuilder(as);

      return httpGet({
        headers: { Accept: buildHeader(as) },
        path: `${
          context.uri
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}${buildQueryParams(
          opts,
        )}`,
        context: {
          parseAs,
        },
      });
    },
    getResource: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      resourceId: string,
      options?: GetResolverOptions,
    ): Promise<Resource> => {
      const { as = 'json', ...opts } = options || {};
      const parseAs = parseAsBuilder(as);

      return httpGet({
        headers: { Accept: buildHeader(as) },
        path: `${
          context.uri
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}/${resourceId}${buildQueryParams(
          opts,
        )}`,
        context: {
          parseAs,
        },
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
      options: CreateResolverOptions = { indexing: 'sync' },
    ): Promise<Resource> =>
      httpPost({
        path: `${
          context.uri
        }/resolvers/${orgLabel}/${projectLabel}${buildQueryParams(options)}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      rev: number,
      payload: ResolverPayload,
      options: UpdateResolverOptions = { indexing: 'sync' },
    ): Promise<Resource> =>
      httpPut({
        path: `${
          context.uri
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}${buildQueryParams(
          { rev, ...options },
        )}`,
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
      options: TagResolverOptions = { indexing: 'sync' },
    ): Promise<Resource> =>
      httpPost({
        path: `${
          context.uri
        }/resolvers/${orgLabel}/${projectLabel}/${resourceId}${buildQueryParams(
          { rev, ...options },
        )}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      resolverId: string,
      rev: number,
      options: DeprecateResolverOptions = { indexing: 'sync' },
    ): Promise<Resource> =>
      httpDelete({
        path: `${
          context.uri
        }/resolvers/${orgLabel}/${projectLabel}/${resolverId}${buildQueryParams(
          { rev, ...options },
        )}`,
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
