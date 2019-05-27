import FormData from 'isomorphic-form-data';
import { toPromise, FetchAs } from '@bbp/nexus-link';
import {
  GetFileOptions,
  NexusFile,
  FilePayload,
  LinkFilePayload,
  UpdateFilePayload,
} from './types';
import { buildQueryParams, isBrowser } from '../utils';
import {
  PaginatedResource,
  ResourceListOptions,
  TagResourcePayload,
} from '../Resource/types';
import { stringLiteral } from '@babel/types';

const NexusFile = (
  { httpGet, httpPost, httpPut, httpDelete },
  context: any,
) => {
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

    link: (
      orgLabel: string,
      projectLabel: string,
      payload: LinkFilePayload,
    ): Promise<NexusFile> => {
      const { '@id': fileId, storage, ...body } = payload;
      const opts = buildQueryParams({ storage });
      return toPromise(
        fileId
          ? httpPut({
              body,
              path: `${context.uri}/${
                context.version
              }/files/${orgLabel}/${projectLabel}/${fileId}${opts}`,
            })
          : httpPost({
              body,
              path: `${context.uri}/${
                context.version
              }/files/${orgLabel}/${projectLabel}${opts}`,
            }),
      );
    },

    update: (
      orgLabel: string,
      projectLabel: string,
      payload: UpdateFilePayload,
    ): Promise<NexusFile> => {
      const { '@id': fileId, file, ...options } = payload;
      const body = new FormData();
      body.append('file', payload.file);
      // if in Node.js, we need to manually set headers
      const headers = isBrowser ? {} : body.getHeaders();
      const opts = buildQueryParams(options);
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

    deprecate: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      rev: number,
    ): Promise<NexusFile> =>
      toPromise(
        httpDelete({
          path: `${context.uri}/${
            context.version
          }/file/${orgLabel}/${projectLabel}/${fileId}?rev=${rev}`,
        }),
      ),

    tag: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      payload: TagResourcePayload,
    ): Promise<NexusFile> => {
      const { previousRev, ...body } = payload;
      return toPromise(
        httpPost({
          body,
          path: `${context.uri}/${
            context.version
          }/file/${orgLabel}/${projectLabel}/${fileId}/tags?rev=${previousRev}`,
        }),
      );
    },
  };
};

export default NexusFile;
