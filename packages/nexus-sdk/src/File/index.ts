import { toPromise } from '@bbp/nexus-link';
import {
  GetFileOptions,
  NexusFile,
  FilePayload,
  LinkFilePayload,
  UpdateFilePayload,
  CreateFileOptions,
} from './types';
import { buildQueryParams } from '../utils';
import {
  PaginatedResource,
  ResourceListOptions,
  TagResourcePayload,
  GetResourceOptions,
} from '../Resource/types';
import { Observable } from '../../../nexus-link/lib';

const NexusFile = (
  { httpGet, httpPost, httpPut, httpDelete, poll },
  context: any,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      options?: GetFileOptions,
    ): Promise<NexusFile | Blob | string | FormData> => {
      const { as = 'blob', ...opts } = options;
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
      options?: CreateFileOptions,
    ): Promise<NexusFile> => {
      const { '@id': fileId, file: body, storage } = payload;
      const opts = buildQueryParams({ storage });
      const headers = (options && options.extraHeaders) || {};
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
      options?: CreateFileOptions,
    ): Promise<NexusFile> => {
      const { '@id': fileId, file: body, storage } = payload;
      const opts = buildQueryParams({ storage });
      const headers = (options && options.extraHeaders) || {};
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
    poll: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      options?: GetResourceOptions & { pollTime: number },
    ): Observable<NexusFile> => {
      const { pollTime, ...getResourceOptions } = options;
      return poll({
        path: `${context.uri}/${
          context.version
        }/files/${orgLabel}/${projectLabel}/${fileId}${buildQueryParams(
          getResourceOptions,
        )}`,
        context: { pollTime: pollTime || 1000 },
      });
    },
  };
};

export default NexusFile;
