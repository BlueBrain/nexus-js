import { toPromise } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { SparqlView, SparqlViewPayload } from './types';
import { buildQueryParams } from '../utils';

const SparqlView = ({ httpPost }: Fetchers, context: NexusContext) => {
  return {
    query: <T = any>(
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      query: {},
    ): Promise<T> => {
      return toPromise(
        httpPost({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}/sparql`,
          body: JSON.stringify(query),
          headers: {
            'Content-Type': 'text/plain',
          },
        }),
      );
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: SparqlViewPayload,
    ): Promise<SparqlView> =>
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
      payload: SparqlViewPayload,
      options?: {
        rev: number;
      },
    ): Promise<SparqlView> => {
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

export default SparqlView;
