import { buildHeader, parseAsBuilder, buildQueryParams } from '../utils';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';

const Search = ({ httpGet, httpPost }: Fetchers, context: NexusContext) => {
  return {
    query: <T = any>(
      query: {},
      options?: {
        from: number;
        size: number;
      },
    ): Promise<T> => {
      const { as = 'json' } = {};
      const parseAs = parseAsBuilder(as);
      const opts = buildQueryParams(options);
      return httpPost({
        headers: { Accept: buildHeader(parseAs) },
        path: `${context.uri}/search/query${opts}`,
        body: JSON.stringify(query),
      });
    },
    config: <T>(): Promise<T> => {
      const { as = 'json' } = {};
      const parseAs = parseAsBuilder(as);
      return httpGet({
        headers: { Accept: buildHeader(parseAs) },
        path: `${context.uri}/search/config`,
        context: {
          parseAs,
        },
      });
    },
  };
};

export default Search;
