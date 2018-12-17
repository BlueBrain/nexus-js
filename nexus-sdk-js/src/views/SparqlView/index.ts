import { httpPost } from '../../utils/http';
import { SparqlViewQueryException } from './exceptions';

interface SparqlQuery {
  content: string;
}

export interface SparqlViewResponse {
  '@id': string;
  '@type': string[];
  _uuid: string;
  _rev: number;
  _deprecated: boolean;
}

// based on: https://www.w3.org/TR/sparql11-results-json/
// describes a SPARQL Query Results JSON
interface SparqlViewQueryResponse {
  head: {
    vars: string[];
    link?: string | string[];
  };
  results?: {
    bindings: {
      [key: string]: {
        type: string;
        value: any;
        datatype?: string;
        'xml:lang'?: string;
        [attribute: string]: any;
      }[];
    };
  };
  boolean?: boolean;
}

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
    this.queryURL = `/views/${this.orgLabel}/${this.projectLabel}/${
      this.id
    }/sparql`;
  }

  async query(sparqlQuery: string): Promise<SparqlViewQueryResponse> {
    try {
      const res: SparqlViewQueryResponse = await httpPost<string>(
        this.queryURL,
        sparqlQuery,
        {
          sendAs: 'text',
          extraHeaders: { 'Content-Type': 'text/plain' },
        },
      );
      return res;
    } catch (error) {
      throw new SparqlViewQueryException(error.message);
    }
  }
}
