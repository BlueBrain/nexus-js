import { SparqlViewResponse } from '../SparqlView/types';

export interface AggregateViewReference {
  project: string;
  viewId: string;
}
export interface AggregateSparqlViewResponse extends SparqlViewResponse {
  views: AggregateViewReference[];
}
