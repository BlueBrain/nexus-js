import { buildHeader, parseAsBuilder } from '../utils';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';

const GraphAnalytics = ({ httpGet }: Fetchers, context: NexusContext) => {
  return {
    relationships: <T>(projectLabel: string, orgLabel: string): Promise<T> => {
      const { as = 'json' } = {};
      const parseAs = parseAsBuilder(as);
      return httpGet({
        headers: { Accept: buildHeader(parseAs) },
        path: `${context.uri}/graph-analytics/${orgLabel}/${projectLabel}/relationships/`,
        context: {
          parseAs,
        },
      });
    },
    properties: <T>(
      projectLabel: string,
      orgLabel: string,
      type: string,
    ): Promise<T> => {
      const { as = 'json' } = {};
      const parseAs = parseAsBuilder(as);
      return httpGet({
        headers: { Accept: buildHeader(parseAs) },
        path: `${
          context.uri
        }/graph-analytics/${orgLabel}/${projectLabel}/properties/${encodeURIComponent(
          type,
        )}`,
        context: {
          parseAs,
        },
      });
    },
  };
};

export default GraphAnalytics;
