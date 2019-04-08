export const DEFAULT_LIST_SIZE = 20;

export interface PaginationSettings {
  from: number;
  size: number;
}

export interface PaginatedList<T> {
  total: number;
  index: number;
  results: T[];
}

/**
 * Several entities can be fetched with a specific tag or revision,
 * but not both at the same time.
 */
export type FetchSpecificOptions = { rev: number } | { tag: string };
