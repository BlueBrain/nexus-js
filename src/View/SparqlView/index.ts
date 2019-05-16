import { httpPost, HttpConfigTypes } from '../../utils/http';
import { SparqlViewQueryException } from './exceptions';
import { getSparqlView } from '../utils';
import { SparqlViewResponse, SparqlViewQueryResponse } from './types';
import Statistics from '../../Statistics';
import { getViewStatistics } from '../../Statistics/utils';

export default class SparqlView {
  id: string;
  type: string[];
  uuid: string;
  rev: number;
  deprecated: boolean;
  queryURL: string;
  constructor(
    readonly orgLabel: string,
    readonly projectLabel: string,
    sparqlViewResponse: SparqlViewResponse,
  ) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = sparqlViewResponse['@id'];
    this.type = sparqlViewResponse['@type'];
    this.uuid = sparqlViewResponse['_uuid'];
    this.rev = sparqlViewResponse['_rev'];
    this.deprecated = sparqlViewResponse['_deprecated'];
    this.queryURL = `/views/${this.orgLabel}/${
      this.projectLabel
    }/${encodeURIComponent(this.id)}/sparql`;
  }

  static get = getSparqlView;

  async query(sparqlQuery: string): Promise<SparqlViewQueryResponse> {
    try {
      const res: SparqlViewQueryResponse = await httpPost<string>(
        this.queryURL,
        sparqlQuery,
        {
          sendAs: HttpConfigTypes.TEXT,
          extraHeaders: { 'Content-Type': 'text/plain' },
        },
      );
      return res;
    } catch (error) {
      throw new SparqlViewQueryException(error.message);
    }
  }

  public async getStatistics(): Promise<Statistics> {
    return getViewStatistics(this.orgLabel, this.projectLabel, this.id);
  }
}
