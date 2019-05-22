import { AggregateSparqlViewResponse, AggregateViewReference } from './types';
import SparqlView from '../SparqlView';

export default class AggregateSparqlView extends SparqlView {
  views: AggregateViewReference[];
  constructor(
    orgLabel: string,
    projectLabel: string,
    aggregateSparqlViewResponse: AggregateSparqlViewResponse,
  ) {
    super(orgLabel, projectLabel, aggregateSparqlViewResponse);
    this.views = aggregateSparqlViewResponse.views;
  }
}
