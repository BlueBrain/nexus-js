import { Observable } from '@bbp/nexus-link';
import { Fetchers, Resource } from '../types';
import { NexusContext } from '../nexusSdk';
import { View, ViewList, ViewPayload, Statistics } from './types';
import { buildQueryParams } from '../utils';

const View = (
  { httpGet, httpPost, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
    ): Promise<View> =>
      httpGet({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}`,
      }),
    list: (orgLabel: string, projectLabel: string): Promise<ViewList> =>
      httpGet({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}`,
      }),
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ViewPayload,
    ): Promise<Resource> =>
      httpPut({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}`,
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
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}?rev=${rev}`,
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
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      rev: number,
    ): Promise<Resource> =>
      httpDelete({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      options?: { pollTime: number },
    ): Observable<View> =>
      poll({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
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
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}/_search${opts}`,
        body: JSON.stringify(query),
      });
    },
    sparqlQuery: <T = any>(
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      query: {},
    ): Promise<T> => {
      return httpPost({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}/sparql`,
        body: JSON.stringify(query),
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
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}/statistics`,
      }),
  };
};

export default View;
