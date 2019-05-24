import { toPromise } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import {
  AggregatedElasticSearchViewPayload,
  AggregatedElasticSearchView,
} from './types';
import { buildQueryParams } from '../utils';

const AggregatedElasticSearchView = (
  { httpPost, httpPut }: Fetchers,
  context: NexusContext,
) => {
  return {
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: AggregatedElasticSearchViewPayload,
    ): Promise<AggregatedElasticSearchView> =>
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
      payload: AggregatedElasticSearchViewPayload,
      options?: {
        rev: number;
      },
    ): Promise<AggregatedElasticSearchView> => {
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

export default AggregatedElasticSearchView;
