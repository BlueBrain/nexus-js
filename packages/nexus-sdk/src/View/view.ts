import { toPromise, Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { View, ViewList } from './types';
import { buildQueryParams } from '../utils';

const View = (
  { httpGet, httpPost, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: <T = View>(
      orgLabel: string,
      projectLabel: string,
      viewId: string,
    ): Promise<T> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}`,
        }),
      ),
    list: (orgLabel: string, projectLabel: string): Promise<ViewList> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}`,
        }),
      ),
    tag: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      payload: {
        tag: string;
        rev: number;
      },
      options?: {
        rev: number;
      },
    ): Promise<View> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpPost({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}${opts}`,
          body: JSON.stringify(payload),
        }),
      );
    },
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      options?: {
        rev: number;
      },
    ): Promise<View> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpDelete({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}${opts}`,
        }),
      );
    },
    poll: <T = View>(
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      options?: { pollTime: number },
    ): Observable<T> =>
      poll({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default View;
