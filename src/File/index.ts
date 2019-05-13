import { NexusFileResponse } from './types';
import makeFileUtils, { FileUtils } from './utils';
import { Context } from '../Resource/types';
import { ReadStream } from 'fs';
import store from '../store';
import Store from '../utils/Store';
import { HttpConfigTypes } from '../utils/http';

// default utils functions
// they use the global store
// for token and baseUrl
const { createFile, getFile, getRawFile, getFileSelf } = makeFileUtils(store);

export default class NexusFile {
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
  readonly raw: NexusFileResponse;
  public rawFile?: string | Blob | ArrayBuffer | ReadStream;
  public fileUtils?: FileUtils;
  static create = createFile;
  static get = getFile;
  static getSelf = getFileSelf;

  constructor(
    orgLabel: string,
    projectLabel: string,
    fileResponse: NexusFileResponse,
    localStore?: Store,
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
    if (localStore) {
      this.fileUtils = makeFileUtils(localStore);
    }
  }

  async getFile(receiveAs?: HttpConfigTypes) {
    this.rawFile = this.fileUtils
      ? await this.fileUtils.getRawFile(this.self, receiveAs)
      : await getRawFile(this.self, receiveAs);
  }
}
