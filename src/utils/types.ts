export const DEFAULT_LIST_SIZE = 20;
export const DEFAULT_FROM = 0;
export const DEFAULT_PAGINATION_SETTINGS = {
  size: DEFAULT_LIST_SIZE,
  from: DEFAULT_FROM,
};

export interface PaginationSettings {
  from: number;
  size: number;
}

export interface PaginatedList<T> {
  total: number;
  index: number;
  results: T[];
  next?: string;
}
