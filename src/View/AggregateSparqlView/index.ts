import { SparqlView } from '..';
import { AggregateSparqlViewResponse, AggregateViewReference } from './types';

export default class AggregateSparqlView extends SparqlView {
  views: AggregateViewReference[];
  constructor(
    readonly orgLabel: string,
    readonly projectLabel: string,
    aggregateSparqlViewResponse: AggregateSparqlViewResponse,
  ) {
    super(orgLabel, projectLabel, aggregateSparqlViewResponse);
    this.views = aggregateSparqlViewResponse.views;
  }
}
