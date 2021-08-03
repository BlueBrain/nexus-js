// to support:
// GET /v1/quotas/{org}/{proj}
// PUT /v1/quotas/{org}/{proj}
// ask back end for an example response
// indexing - sync ?
// include revision ?

import { NexusContext } from '../nexusSdk';
import { Fetchers } from '../types';
import { Quota, QuotaPayload } from './types';

const Quotas = ({ httpGet, httpPut }: Fetchers, context: NexusContext) => {
  return {
    get: (orgLabel: string, projectLabel: string): Promise<Quota> =>
      httpGet({
        path: `${context.uri}/quotas/${orgLabel}/${projectLabel}`, // allow indexing - sync ?
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      payload: QuotaPayload,
    ): Promise<Quota> =>
      httpPut({
        path: `${context.uri}/quotas/${orgLabel}/${projectLabel}`, // ?rev=${rev} - ?
        body: JSON.stringify(payload),
      }),
  };
};

export default Quotas;
