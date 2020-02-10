import { Fetchers } from '../types';
import { Version } from './types';
import { NexusContext } from '../nexusSdk';

const Version = ({ httpGet }: Fetchers, context: NexusContext) => {
  return {
    get: (): Promise<Version> => {
      return httpGet({
        path: `${context.uri}/version`,
        context: { as: 'json' },
      });
    },
  };
};

export default Version;
