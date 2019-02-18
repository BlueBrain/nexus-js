import { FileResponse } from './types';
import { httpPostFile } from '../utils/http';
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
