import { PaginationSettings } from '../utils/types';
import { Identity } from '../ACL/types';

export type ResolverTypes = "InProject" | "CrossProject";

export interface ResolverPayloadCommon {
  "@id"?: string;
  priority: number;
}

export interface InProjectResolverPayload extends ResolverPayloadCommon {
  "@type": {
    0: "InProject";
  }
}

export interface CrossProjectResolverPayload extends ResolverPayloadCommon {
  "@type": {
    0: "CrossProject";
  };
  projects: string[];
  resourceType?: string;
  identities: Identity[];
}

export type ResolverPayload = InProjectResolverPayload | CrossProjectResolverPayload;

export interface TagResolverPayload {
  tag: string,
  rev: number,
}

export interface ResolverResponseCommon {
    "@id": string;
    "@type": string[] | InProjectResolverPayload["@type"] | CrossProjectResolverPayload["@type"];
    _constrainedBy: string;
    _createdAt: string;
    _createdBy: string;
    _deprecated: Boolean;
    _project: string;
    _rev: number;
    _self: string;
    _updatedAt: string;
    _updatedBy: string;
    [key: string]: any;
};

export interface PartialResolverResponse extends ResolverResponseCommon {
  '@context': string | string[];
}

export interface InProjectResolverResponse extends PartialResolverResponse {
  priority: number;
}

export interface CrossProjectResolverResponse extends PartialResolverResponse {
  projects: string[];
  resourceType?: string;
  identities: Identity[];
}

export type ResolverResponse = InProjectResolverResponse | CrossProjectResolverResponse;

export interface ListResolverResponse {
  '@context': string | string[];
  _total: number;
  _results: ResolverResponseCommon[];
}

export interface ListResolverOptions {
    full_text_search_query?: string;
    from?: PaginationSettings['from'];
    size?: PaginationSettings['size'];
    deprecated?: boolean;
    rev?: number;
    type?: string;
    createdBy?: string;
    updatedBy?: string;
    [key: string]: any;
  }

// It's possible to fetch a resolver by revision or tag, not both.
export type GetResolverOptions = { rev: number } | { tag: string };
