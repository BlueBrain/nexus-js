import View from '..';
import { PaginationSettings, PaginatedList } from '../../utils/types';
import Resource from '../../Resource';
import { httpPost } from '../../utils/http';

interface SparqlQuery {
  content: string;
}

interface SparqlQueryResponse {
  head: {
    vars: string[];
  };
  results: {
    bindings: {
      [key: string]: {
        datatype?: string;
        type: string;
        value: any;
      }[];
    };
  };
}

export default class SparqlView implements View {
  constructor(
    readonly orgLabel: string,
    readonly projectLabel: string,
    readonly viewId: string = 'graph',
  ) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.viewId = viewId;
  }

  async query(sparqlQuery: SparqlQuery): Promise<SparqlQueryResponse> {
    try {
      const res = await httpPost<string>(
        `/views/${this.orgLabel}/${this.projectLabel}/${this.viewId}/sparql`,
        sparqlQuery.content,
        {
          sendAs: 'text',
          extraHeaders: { 'Content-Type': 'text/plain' },
        },
      );
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
