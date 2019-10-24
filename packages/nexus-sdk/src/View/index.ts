import { Observable } from '@bbp/nexus-link';
import { Fetchers, Resource } from '../types';
import { NexusContext } from '../nexusSdk';
import {
  SparqlViewQueryResponse,
  Statistics,
  View,
  ViewList,
  ViewPayload,
} from './types';
import { buildQueryParams } from '../utils';
import { GetResourceOptions, ResourceListOptions } from '../Resource/types';

const View = (
  { httpGet, httpPost, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      options?: GetResourceOptions,
    ): Promise<View> =>
      httpGet({
        path: `${
          context.uri
        }/views/${orgLabel}/${projectLabel}/${viewId}${buildQueryParams(
          options,
        )}`,
      }),
    list: (
      orgLabel: string,
      projectLabel: string,
      options?: ResourceListOptions,
    ): Promise<ViewList> =>
      httpGet({
        path: `${
          context.uri
        }/views/${orgLabel}/${projectLabel}${buildQueryParams(options)}`,
      }),
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ViewPayload,
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      rev: number,
      payload: ViewPayload,
    ): Promise<Resource> =>
      httpPut({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}/${viewId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    tag: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      rev: number,
      payload: {
        tag: string;
        rev: number;
      },
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}/${viewId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      rev: number,
    ): Promise<Resource> =>
      httpDelete({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}/${viewId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      options?: GetResourceOptions & { pollIntervalMs: number },
    ): Observable<View> => {
      const { pollIntervalMs, ...getViewOptions } = options;
      return poll({
        path: `${
          context.uri
        }/views/${orgLabel}/${projectLabel}/${viewId}${buildQueryParams(
          getViewOptions,
        )}`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      });
    },
    elasticSearchQuery: <T = any>(
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      query: {},
      options?: {
        from: number;
        size: number;
      },
    ): Promise<T> => {
      const opts = buildQueryParams(options);
      return httpPost({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}/${viewId}/_search${opts}`,
        body: JSON.stringify(query),
      });
    },
    sparqlQuery: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      query: string,
    ): Promise<SparqlViewQueryResponse> => {
      return httpPost({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}/${viewId}/sparql`,
        body: query,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    },
    statistics: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
    ): Promise<Statistics> =>
      httpGet({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}/${viewId}/statistics`,
      }),
    pollStatistics: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      options?: { pollIntervalMs: number },
    ): Observable<Statistics> =>
      poll({
        path: `${context.uri}/views/${orgLabel}/${projectLabel}/${viewId}/statistics`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      }),
  };
};

export default View;
