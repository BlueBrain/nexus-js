import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { toPromise } from '@bbp/nexus-link';
import { SparqlView } from './types';

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
  };
};

export default SparqlView;
