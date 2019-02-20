import { FileResponse } from './types';
import { createFile } from './utils';
import { Context } from '../Resource/types';

export default class File {
  readonly orgLabel: string;
  readonly projectLabel: string;
  readonly context: Context;
  readonly type: 'File';
  readonly self: string;
  readonly id: string;
  readonly constrainedBy: string;
  readonly project: string;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
  readonly rev: number;
  readonly deprecated: boolean;
  readonly mediaType: string;
  readonly filename: string;
  readonly digest: {
    algorithm: string;
    value: string;
  };
  readonly bytes: number;
  readonly raw: FileResponse;

  static create = createFile;

  constructor(
    orgLabel: string,
    projectLabel: string,
    fileResponse: FileResponse,
  ) {
    this.raw = fileResponse;
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = fileResponse['@id'];
    this.type = fileResponse['@type'];
    this.context = fileResponse['@context'];
    this.self = fileResponse._self;
    this.constrainedBy = fileResponse._constrainedBy;
    this.project = fileResponse._project;
    this.createdAt = fileResponse._createdAt;
    this.createdBy = fileResponse._createdBy;
    this.updatedAt = fileResponse._updatedAt;
    this.updatedBy = fileResponse._updatedBy;
    this.rev = fileResponse._rev;
    this.deprecated = fileResponse._deprecated;
    this.bytes = fileResponse._bytes;
    this.digest = {
      algorithm: fileResponse._digest._algorithm,
      value: fileResponse._digest._value,
    };
    this.filename = fileResponse._filename;
    this.mediaType = fileResponse._mediaType;
  }
}
