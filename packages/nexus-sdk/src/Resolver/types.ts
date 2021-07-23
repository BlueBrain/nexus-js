import { Resource, PaginatedList, Identity, IndexingOption } from '../types';

export type ResolverType = 'InProject' | 'CrossProject';

export type Resolver = InProjectResolver | CrossProjectResolver;
export type InProjectResolver = Resource & {
  '@type': ['InProject', 'Resolver'];
  priority: number;
};
export type CrossProjectResolver = Resource & {
  '@type': ['CrossProject', 'Resolver'];
  resourceTypes: string[];
  projects: string[];
  identities: Identity[];
  priority: number;
};
export type ResolverList = PaginatedList<Resolver>;

export type GetResolverOptions = {
  rev?: number;
  tag?: string;
  as?: 'vnd.graph-viz' | 'n-triples' | 'json';
  [key: string]: string | number | boolean;
};

export type ListResolverOptions = {
  from?: number;
  size?: number;
  deprecated?: boolean;
  rev?: number;
  type?: ResolverType;
  createdBy?: string;
  updatedBy?: string;
};

export type CreateResolverOptions = IndexingOption & {};
export type UpdateResolverOptions = IndexingOption & {};
export type TagResolverOptions = IndexingOption & {};
export type DeprecateResolverOptions = IndexingOption & {};

export type ResolverPayload =
  | InProjectResolverPayload
  | CrossProjectResolverPayload;

export type InProjectResolverPayload = {
  '@id'?: string;
  '@type': ['InProject'];
  priority: number;
};

export type CrossProjectResolverPayload = {
  '@id'?: string;
  '@type': ['CrossProject'];
  resourceTypes: string[];
  projects: string[];
  identities: Identity[];
  priority: number;
};
