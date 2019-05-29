import { toPromise, Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { IdentityList } from './types';
import { NexusContext } from '../nexusSdk';

const Resolver = ({ httpGet, poll }: Fetchers, context: NexusContext) => {
  return {
    list: (): Promise<IdentityList> =>
      httpGet({
        path: `${context.uri}/${context.version}/identities`,
      }),
    poll: (options?: { pollTime: number }): Observable<IdentityList> =>
      poll({
        path: `${context.uri}/${context.version}/identities`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Resolver;
