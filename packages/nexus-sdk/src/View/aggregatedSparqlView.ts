import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';

const AggregatedSparqlView = (
  { httpPost }: Fetchers,
  context: NexusContext,
) => {
  return {
    create: () => {},
    update: () => {},
  };
};

export default AggregatedSparqlView;
