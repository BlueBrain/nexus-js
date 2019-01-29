export interface ProjectResponseCommon {
  '@id': string;
  '@type': string;
  base: string;
  vocab: string;
  apiMappings: ApiMapping[];
  _label: string;
  _organizationLabel: string;
  _organizationUuid: string;
  _uuid: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  description?: string;
}

export interface ListProjectsResponse {
  _total: number;
  _links?: any;
  _results?: ProjectResponse[];
  '@context'?: Context;
  code?: string;
  message?: string;
}

export interface ProjectResponse extends ProjectResponseCommon {
  '@context'?: Context;
}

export interface ApiMapping {
  prefix: string;
  namespace: string;
}

export interface CreateProjectPayload {
  description?: string;
  base?: string;
  vocab?: string;
  apiMappings?: ApiMapping[];
}

export interface ListProjectOptions {
  q?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [option: string]: any;
}

export type Context = string | string[];

export type ProjectEventType =
  | 'ProjectCreated'
  | 'ProjectUpdated'
  | 'ProjectDeprecated';

export interface ProjectEvent {
  '@context': Context;
  '@type': ProjectEventType;
  apiMappings: ApiMapping[];
  base: string;
  description: string;
  vocab: string;
  _instant: string;
  _label: string;
  _rev: number;
  _subject: string;
  _uuid: string;
}

export interface ProjectCreatedEvent extends ProjectEvent {
  '@type': 'ProjectCreated';
}
export interface ProjectUpdatedEvent extends ProjectEvent {
  '@type': 'ProjectCreated';
}
export interface ProjectDeprecatedEvent extends ProjectEvent {
  '@type': 'ProjectCreated';
}

export interface ProjectEventListeners {
  onOpen?(): void;
  onError?(): void;
  onProjectCreated?(event: ProjectCreatedEvent): void;
  onProjectUpdated?(event: ProjectUpdatedEvent): void;
  onProjectDeprecated?(event: ProjectDeprecatedEvent): void;
}
