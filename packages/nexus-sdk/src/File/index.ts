import FormData from 'isomorphic-form-data';
import { toPromise, FetchAs } from '@bbp/nexus-link';
import { GetFileOptions, NexusFile, FilePayload } from './types';
import { buildQueryParams, isBrowser } from '../utils';
import { PaginatedResource, ResourceListOptions } from '../Resource/types';

const NexusFile = ({ httpGet, httpPost, httpPut }, context: any) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      options?: GetFileOptions,
    ): Promise<NexusFile | Blob | string | FormData> => {
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

    create: (
      orgLabel: string,
      projectLabel: string,
      payload: FilePayload,
    ): Promise<NexusFile> => {
      const { '@id': fileId, file, storage } = payload;
      const body = new FormData();
      body.append('file', payload.file);
      // if in Node.js, we need to manually set headers
      const headers = isBrowser ? {} : body.getHeaders();
      const opts = buildQueryParams({ storage });
      return toPromise(
        fileId
          ? httpPut({
              headers,
              body,
              path: `${context.uri}/${
                context.version
              }/files/${orgLabel}/${projectLabel}/${fileId}${opts}`,
            })
          : httpPost({
              headers,
              body,
              path: `${context.uri}/${
                context.version
              }/files/${orgLabel}/${projectLabel}${opts}`,
            }),
      );
    },
  };
};

export default NexusFile;
