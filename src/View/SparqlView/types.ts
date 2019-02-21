export interface SparqlViewResponse {
  '@id': string;
  '@type': string[];
  _uuid: string;
  _rev: number;
  _deprecated: boolean;
}

// based on: https://www.w3.org/TR/sparql11-results-json/
// describes a SPARQL Query Results JSON
export interface SparqlViewQueryResponse {
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
      };
    }[];
  };
  boolean?: boolean;
}
