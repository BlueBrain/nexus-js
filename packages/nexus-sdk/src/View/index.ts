import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { toPromise } from '@bbp/nexus-link';
import { View, ViewList } from './types';

const View = ({ httpGet }: Fetchers, context: NexusContext) => {
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
  };
};

export default View;
