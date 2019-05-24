import { toPromise } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import {
  AggregatedElasticSearchViewPayload,
  AggregatedElasticSearchView,
} from './types';

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
      rev: number,
      payload: AggregatedElasticSearchViewPayload,
    ): Promise<AggregatedElasticSearchView> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}/?rev=${rev}`,
          body: JSON.stringify(payload),
        }),
      ),
  };
};

export default AggregatedElasticSearchView;
