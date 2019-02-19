import { FileResponse } from './types';
import { httpPostFile, httpGetFile, httpGet } from '../utils/http';
import File from '.';

export async function createFile(
  orgLabel: string,
  projectLabel: string,
  file: any,
): Promise<File> {
  try {
    const fileResponse: FileResponse = await httpPostFile(
      `/files/${orgLabel}/${projectLabel}`,
      file,
    );
    return new File(orgLabel, projectLabel, fileResponse);
  } catch (error) {
    throw new Error(error);
  }
}

// Get JSON metadata of file
export async function getFileMetaData(
  orgLabel: string,
  projectLabel: string,
  id: string,
): Promise<File> {
  try {
    const fileResponse: FileResponse = await httpGet(
      `/files/${orgLabel}/${projectLabel}/${id}`,
    );
    return new File(orgLabel, projectLabel, fileResponse);
  } catch (error) {
    throw new Error(error);
  }
}

// fetch the file itself, not the metadata
export async function getFile(
  orgLabel: string,
  projectLabel: string,
  id: any,
  mediaType: string,
): Promise<File> {
  try {
    const file = await httpGetFile(
      `/files/${orgLabel}/${projectLabel}/${id}`,
      true,
      { extraHeaders: { Accept: mediaType } },
    );
    return file;
  } catch (error) {
    throw new Error(error);
  }
}
