export interface OrgResponseCommon {
  '@id': string;
  '@type': string;
  _uuid: string;
  _label: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _self?: string;
  _constrainedBy?: string;
  description?: string;
}

export interface ListOrgResponse {
  '@context': Context;
  _total: number;
  _results?: OrgResponseCommon[];
  _links?: any;
  code?: string;
  message?: string;
}

export interface OrgResponse extends OrgResponseCommon {
  '@context': Context;
}

export interface ListOrgOptions {
  full_text_search?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [key: string]: any;
}

export interface CreateOrgPayload {
  description?: string;
}
export type Context = string | string[];

export enum OrgEventType {
  OrgCreated = 'OrganizationCreated',
  OrgUpdated = 'OrganizationUpdated',
  OrgDeprecated = 'OrganizationDeprecated',
}

export interface OrgEvent {
  '@context': Context;
  '@type': OrgEventType;
  description: string;
  _instant: string;
  _label: string;
  _rev: number;
  _subject: string;
  _uuid: string;
}

export interface OrgCreatedEvent extends OrgEvent {
  '@type': OrgEventType.OrgCreated;
}
export interface OrgUpdatedEvent extends OrgEvent {
  '@type': OrgEventType.OrgUpdated;
}
export interface OrgDeprecatedEvent extends OrgEvent {
  '@type': OrgEventType.OrgDeprecated;
}

export interface OrgEventListeners {
  onOpen?(): void;
  onError?(): void;
  onOrgCreated?(event: OrgCreatedEvent): void;
  onOrgUpdated?(event: OrgUpdatedEvent): void;
  onOrgDeprecated?(event: OrgDeprecatedEvent): void;
}
