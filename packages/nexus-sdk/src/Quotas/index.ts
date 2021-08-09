// to support:
// GET /v1/quotas/{org}/{proj}
// ask back end for an example response
// indexing - sync ?
// include revision ?

import { NexusContext } from '../nexusSdk';
import { Fetchers } from '../types';
import { Quota } from './types';

const Quotas = ({ httpGet }: Fetchers, context: NexusContext) => {
  return {
    get: (orgLabel: string, projectLabel: string): Promise<Quota> =>
      httpGet({
        path: `${context.uri}/quotas/${orgLabel}/${projectLabel}`, // allow indexing - sync ?
      }),
  };
};

export default Quotas;
