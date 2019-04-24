// @ts-ignore
import FormData from 'isomorphic-form-data';
import { NexusFileResponse } from './types';
import createHttpLink, {
  httpPost,
  HttpConfigTypes,
  httpGet,
} from '../utils/http';
import NexusFile from './index';
import { isBrowser } from '../utils';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import Store from '../utils/Store';

export interface FileUtils {
  createFile: (
    orgLabel: string,
    projectLabel: string,
    file: File | Blob | ReadableStream | ReadStream | Readable,
  ) => Promise<NexusFile>;
  getFileSelf: (
    selfUrl: string,
    shouldFetchFile?: boolean,
  ) => Promise<NexusFile>;
  getFile: (
    orgLabel: string,
    projectLabel: string,
    fileId: string,
    shouldFetchFile?: boolean,
  ) => Promise<NexusFile>;
  getRawFile: (
    selfURL: string,
  ) => Promise<string | Blob | ReadStream | ArrayBuffer>;
}

/**
 *
 *
 * @export
 * @param {Store} store
 * @returns {FileUtils}
 */
export default function makeFileUtils(store: Store): FileUtils {
  const { httpGet, httpPost } = createHttpLink(store);
  return {
    /**
     *
     * @param orgLabel The label of the organization
     * @param projectLabel The label of the project
     * @param {File | Blob | ReadableStream | ReadStream | Readable} file file to save
     * @returns {Promise<NexusFile>}
     */
    createFile: async (
      orgLabel: string,
      projectLabel: string,
      file: File | Blob | ReadableStream | ReadStream | Readable,
    ): Promise<NexusFile> => {
      try {
        // create new form data
        const form = new FormData();
        // add file
        form.append('file', file);
        // if in Node.js, we need to manually set headers
        let extraHeaders = {};
        if (!isBrowser) {
          extraHeaders = form.getHeaders();
        }
        const fileResponse: NexusFileResponse = await httpPost(
          `/files/${orgLabel}/${projectLabel}`,
          form,
          {
            extraHeaders,
            sendAs: HttpConfigTypes.FILE,
          },
        );
        return new NexusFile(orgLabel, projectLabel, fileResponse);
      } catch (error) {
        throw error;
      }
    },

    /**
     *
     * @param selfUrl the _self locator of the resource/file
     * @param {boolean} shouldFetchFile if true, fetches the file as well as the metadata
     * @returns {Promise<NexusFile>}
     */
    getFileSelf: async (
      selfUrl: string,
      shouldFetchFile: boolean = false,
    ): Promise<NexusFile> => {
      const fileResponse: NexusFileResponse = await httpGet(selfUrl, {
        useBase: false,
      });
      const [id, schema, projectLabel, orgLabel, ...rest] = selfUrl
        .split('/')
        .reverse();
      const file = new NexusFile(orgLabel, projectLabel, fileResponse);
      if (shouldFetchFile) {
        await file.getFile();
      }
      return file;
    },

    /**
     *
     * @param orgLabel The label of the organization
     * @param projectLabel The label of the project
     * @param fileId The "@id" of the file
     * @param {boolean} shouldFetchFile if true, fetches the file as well as the metadata
     * @returns {Promise<NexusFile>}
     */
    getFile: async (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      shouldFetchFile: boolean = false,
    ): Promise<NexusFile> => {
      const fileResponse: NexusFileResponse = await httpGet(
        `/files/${orgLabel}/${projectLabel}/${fileId}`,
      );
      const file = new NexusFile(orgLabel, projectLabel, fileResponse);
      if (shouldFetchFile) {
        await file.getFile();
      }
      return file;
    },

    /**
     *  Fetches just the file stored in nexus, not the metadata!
     * @param selfUrl the _self locator of the resource/file
     * @returns {Promise<string | Blob | ReadStream | ArrayBuffer>}
     */
    getRawFile: async (
      selfURL: string,
    ): Promise<string | Blob | ReadStream | ArrayBuffer> => {
      const rawFile: string | Blob | ReadStream | ArrayBuffer = await httpGet(
        selfURL,
        {
          useBase: false,
          extraHeaders: {
            Accept: '*/*',
          },
          receiveAs: HttpConfigTypes.BASE64,
        },
      );
      return rawFile;
    },
  };
}
