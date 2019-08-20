import get from 'lodash/get';

export interface Binding {
  [filterName: string]: { type: string; value: string };
}

export type SparqlQueryResults = {
  head: {
    vars: string[];
  };
  results: {
    bindings: Binding[];
  };
};

export type SparqlMapping = {
  source: string;
  target: string;
  defaultVal?: any;
};

export type SparqlMapperConfig = {
  mappings: SparqlMapping[];
};

// Transform Sparql results into a collection with properties from mapping config
// and optional default values.
export const mapSparqlResults = (
  queryResults: SparqlQueryResults,
  config: SparqlMapperConfig,
): { [target: string]: any }[] => {
  if (!queryResults || !queryResults.results.bindings) return [];

  return queryResults.results.bindings.map(binding => {
    const reduceFn = (acc: {}, mapping: SparqlMapping) => ({
      ...acc,
      ...{
        [mapping.target]: get(
          binding,
          `${mapping.source}.value`,
          mapping.defaultVal,
        ),
      },
    });

    return config.mappings.reduce(reduceFn, {});
  });
};

// Method returns the collection with properties:
// { id: string, self: string, name: string, description: string }
export const mapEmodelCollQueryResults = (queryResults: SparqlQueryResults) => {
  const config = {
    mappings: [
      {
        source: 'id',
        target: 'emodel',
      },
      {
        source: 'self',
        target: 'self',
      },
      {
        source: 'name',
        target: 'name',
      },
      {
        source: 'description',
        target: 'description',
        defaultVal: 'NA',
      },
    ],
  };

  return mapSparqlResults(queryResults, config);
};

/**
 * Build a string of NQuads (triples with .)
 *
 * @param response A Sparql Construct response
 */
export const makeNQuad = (response: SparqlQueryResults): string => {
  const processor = ({ type, value }: { type: string; value: string }) => {
    switch (type) {
      case 'uri':
        return `<${value}>`;
      case 'bnode':
        return `_:${value}`;
      // case literal
      default:
        return `"${value.replace(/\r?\n|\r/g, '')}"`; // remove line breaks
    }
  };

  const triples = response.results.bindings.map((binding: Binding) => {
    return `${processor(binding.subject)} ${processor(
      binding.predicate,
    )} ${processor(binding.object)}`;
  });

  return triples.join(' . \n') + ' .';
};

export const mapMorphCollQueryResults = (queryResults: SparqlQueryResults) => {
  const config = {
    mappings: [
      {
        source: 'reconstructedcell',
        target: 'id',
      },
      {
        source: 'self',
        target: 'self',
      },
      {
        source: 'name',
        target: 'name',
      },
      {
        source: 'description',
        target: 'description',
        defaultVal: 'NA',
      },
    ],
  };

  return mapSparqlResults(queryResults, config);
};
