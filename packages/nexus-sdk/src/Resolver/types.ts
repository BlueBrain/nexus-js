import { Resource, PaginatedResource, Identity } from '../types';

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
export type ResolverList = PaginatedResource<Resolver>;

export type GetResolverOptions = {
  rev?: number;
  tag?: string;
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
