import { toPromise } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { AggregatedSparqlViewPayload, AggregatedSparqlView } from './types';
import { buildQueryParams } from '../utils';

const AggregatedSparqlView = (
  { httpPost }: Fetchers,
  context: NexusContext,
) => {
  return {
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: AggregatedSparqlViewPayload,
    ): Promise<AggregatedSparqlView> =>
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
      payload: AggregatedSparqlViewPayload,
      options?: {
        rev: number;
      },
    ): Promise<AggregatedSparqlView> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpPost({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}${opts}`,
          body: JSON.stringify(payload),
        }),
      );
    },
  };
};

export default AggregatedSparqlView;
