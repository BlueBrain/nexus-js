import { toPromise } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { ElasticSearchView, ElasticSearchViewPayload } from './types';
import { buildQueryParams } from '../utils';

const ElasticSearchView = (
  { httpPost, httpPut }: Fetchers,
  context: NexusContext,
) => {
  return {
    query: <T = any>(
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
      return toPromise(
        httpPost({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}/_search${opts}`,
          body: JSON.stringify(query),
        }),
      );
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ElasticSearchViewPayload,
    ): Promise<ElasticSearchView> =>
      toPromise(
        httpPost({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}`,
          body: JSON.stringify(payload),
        }),
      ),
    update: (
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      payload: ElasticSearchViewPayload,
      options?: {
        rev: number;
      },
    ): Promise<ElasticSearchView> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpPut({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}${opts}`,
          body: JSON.stringify(payload),
        }),
      );
    },
  };
};

export default ElasticSearchView;
