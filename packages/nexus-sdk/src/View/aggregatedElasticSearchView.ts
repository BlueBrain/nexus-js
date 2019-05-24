import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';

const AggregatedElasticSearchView = (
  { httpPost }: Fetchers,
  context: NexusContext,
) => {
  return {
    create: () => {},
    update: () => {},
  };
};

export default AggregatedElasticSearchView;
