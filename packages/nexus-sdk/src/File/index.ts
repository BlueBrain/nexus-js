import { toPromise, FetchAs } from '@bbp/nexus-link';
import { GetFileOptions, NexusFile } from './types';
import { buildQueryParams } from '../utils';
import { PaginatedResource, ResourceListOptions } from '../Resource/types';

const NexusFile = ({ httpGet }, context: any) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      options?: GetFileOptions,
    ): Promise<NexusFile | Blob | string> => {
      const { as = FetchAs.BLOB, ...opts } = options;
      return toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/files/${orgLabel}/${projectLabel}/${fileId}${buildQueryParams(
            opts,
          )}`,
          context: {
            as,
          },
        }),
      );
    },

    list: (
      orgLabel: string,
      projectLabel: string,
      options?: ResourceListOptions,
    ): Promise<PaginatedResource<NexusFile>> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/files/${orgLabel}/${projectLabel}${opts}`,
        }),
      );
    },
  };
};

export default NexusFile;
