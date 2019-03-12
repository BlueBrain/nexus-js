// @ts-ignore
import FormData from 'isomorphic-form-data';
import { NexusFileResponse } from './types';
import { httpPost, HttpConfigTypes, httpGet } from '../utils/http';
import NexusFile from './index';
import { isBrowser } from '../utils';
import { ReadStream } from 'fs';
import { Readable } from 'stream';

export async function createFile(
  orgLabel: string,
  projectLabel: string,
  file: File | Blob | ReadableStream | ReadStream | Readable,
): Promise<NexusFile> {
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
}

export async function getFileSelf(
  selfUrl: string,
  shouldFetchFile: boolean = false,
): Promise<NexusFile> {
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
}

export async function getFile(
  orgLabel: string,
  projectLabel: string,
  fileId: string,
  shouldFetchFile: boolean = false,
): Promise<NexusFile> {
  const fileResponse: NexusFileResponse = await httpGet(
    `/files/${orgLabel}/${projectLabel}/${fileId}`,
  );
  const file = new NexusFile(orgLabel, projectLabel, fileResponse);
  if (shouldFetchFile) {
    await file.getFile();
  }
  return file;
}

export async function getRawFile(
  selfURL: string,
): Promise<string | Blob | ReadStream | ArrayBuffer> {
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
}
