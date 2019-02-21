// @ts-ignore
import FormData from 'isomorphic-form-data';
import { FileResponse } from './types';
import { httpPost, HttpConfigTypes } from '../utils/http';
import { File as NexusFile } from '..';
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
    const fileResponse: FileResponse = await httpPost(
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
