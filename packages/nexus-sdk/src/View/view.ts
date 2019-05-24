import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { toPromise, Observable } from '@bbp/nexus-link';
import { View, ViewList } from './types';

const View = ({ httpGet, poll }: Fetchers, context: NexusContext) => {
  return {
    get: <T = View>(
      orgLabel: string,
      projectLabel: string,
      viewId: string,
    ): Promise<T> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}/${viewId}`,
        }),
      ),
    list: (orgLabel: string, projectLabel: string): Promise<ViewList> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/views/${orgLabel}/${projectLabel}`,
        }),
      ),
    poll: <T = View>(
      orgLabel: string,
      projectLabel: string,
      viewId: string,
      options?: { pollTime: number },
    ): Observable<T> =>
      poll({
        path: `${context.uri}/${
          context.version
        }/views/${orgLabel}/${projectLabel}/${viewId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default View;
