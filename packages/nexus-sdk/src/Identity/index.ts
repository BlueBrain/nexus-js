import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { IdentityList } from './types';
import { NexusContext } from '../nexusSdk';

const Identity = ({ httpGet, poll }: Fetchers, context: NexusContext) => {
  return {
    list: (): Promise<IdentityList> =>
      httpGet({
        path: `${context.uri}/identities`,
      }),
    poll: (options?: { pollIntervalMs: number }): Observable<IdentityList> =>
      poll({
        path: `${context.uri}/identities`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      }),
  };
};

export default Identity;
