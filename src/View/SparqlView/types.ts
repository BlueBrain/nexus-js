import { Context, ResourceResponseCommon } from '../../Resource/types';

export interface SparqlViewResponse extends ResourceResponseCommon {
  _uuid: string;
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
        value: string;
        datatype?: string;
        'xml:lang'?: string;
        [attribute: string]: any;
      };
    }[];
  };
  boolean?: boolean;
}
