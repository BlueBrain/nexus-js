export interface PaginationSettings {
  from: number;
  size: number;
}

export interface PaginatedList<T> {
  total: number;
  results: T[];
}
