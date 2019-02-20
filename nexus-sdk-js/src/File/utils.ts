import { FileResponse } from './types';
import { httpPost, HttpConfigTypes } from '../utils/http';
import { File as NexusFile } from '..';

export async function createFile(
  orgLabel: string,
  projectLabel: string,
  file: File,
): Promise<NexusFile> {
  try {
    const fileResponse: FileResponse = await httpPost<File>(
      `/files/${orgLabel}/${projectLabel}`,
      file,
      { sendAs: HttpConfigTypes.FILE },
    );
    return new NexusFile(orgLabel, projectLabel, fileResponse);
  } catch (error) {
    throw new Error(error);
  }
}
