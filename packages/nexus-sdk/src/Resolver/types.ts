import { Resource, PaginatedResource } from '../types';

export type ResolverType = 'InProject' | 'CrossProject';

export type Resolver = InProjectResolver | CrossProjectResolver;
export type InProjectResolver = Resource & {}; // TODO:
export type CrossProjectResolver = Resource & {}; // TODO:
export type ResolverList = PaginatedResource<Resolver>; // TODO:

export type GetResolverOptions = {
  rev?: number;
  tag?: string;
};
export type ListResolverOptions = {
  full_text_search_query?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  rev?: number;
  type?: ResolverType;
  createdBy?: string;
  updatedBy?: string;
};
export type ResolverPayload =
  | InProjectResolverPayload
  | CrossProjectResolverPayload;

export type InProjectResolverPayload = {
  '@id': string;
  '@type': ['InProject'];
  priority: number;
};

export type CrossProjectResolverPayload = {
  '@id': string;
  '@type': ['CrossProject'];
  resourceTypes: string[];
  projects: string[];
  identities: {}[];
  priority: number;
};
