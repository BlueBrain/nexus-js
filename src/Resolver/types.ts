import { PaginationSettings } from '../utils/types';
import { Identity } from '../ACL/types';

export interface ResolverResponseCommon {
    "@id": string;
    "@type": string[];
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

export interface ResolverResponse extends ResolverResponseCommon {
  '@context': string | string[];
}

export interface InProjectResolverResponse extends ResolverResponse {
  priority: number;
}

export interface CrossProjectResolverResponse extends ResolverResponse {
  projects: string[];
  resourceType?: string;
  identities: Identity[];
}

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

export type ResolverTypes = "InProject" | "CrossProject";
