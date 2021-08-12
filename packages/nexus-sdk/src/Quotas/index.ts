import { NexusContext } from '../nexusSdk';
import { Fetchers } from '../types';
import { Quota } from './types';

const Quotas = ({ httpGet }: Fetchers, context: NexusContext) => {
  return {
    get: (orgLabel: string, projectLabel: string): Promise<Quota> =>
      httpGet({
        path: `${context.uri}/quotas/${orgLabel}/${projectLabel}`,
      }),
  };
};

export default Quotas;
