import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { toPromise } from '@bbp/nexus-link';
import { ElasticSearchView } from './types';
import { buildQueryParams } from '../utils';

const ElasticSearchView = ({ httpPost }: Fetchers, context: NexusContext) => {
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
  };
};

export default ElasticSearchView;
