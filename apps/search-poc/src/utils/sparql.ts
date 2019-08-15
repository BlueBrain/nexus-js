import { Filter } from '../components/Filters';
import { labelOf } from '../utils';
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
    const reduceFn = (acc, mapping) => ({
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

export const mapQueryResultsToFilters = (queryResults: SparqlQueryResults) => {
  return (
    queryResults &&
    queryResults.results &&
    queryResults.results.bindings.reduce((memo: Filter[], entry: Binding) => {
      const [filterIDData, filterLabelData] = Object.keys(entry);
      const filterName = filterIDData.replace('ID', '');
      const filter: Filter | undefined = memo.find(
        (entry: any) => entry.name === filterName,
      );
      const filterValue = {
        id: entry[filterIDData].value,
        label: filterLabelData
          ? entry[filterLabelData].value
          : labelOf(entry[filterIDData].value),
      };
      if (filter) {
        // don't push the same ID to the filter list
        // There may be repeats
        // and we don't want to display them
        if (
          filter.values.find(filter => filter.id === entry[filterIDData].value)
        ) {
          return memo;
        }

        // If it's not a repeat, add it to the values list
        filter.values.push(filterValue);

        // sort the values alphabetically (should be done last, but whatever)
        filter.values.sort((a, b) => {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });
      } else {
        memo.push({
          name: filterName,
          values: [filterValue],
        });
      }
      return memo;
    }, [])
  );
};

export const makeDatasetFromSparlQueryResponse = (
  response: SparqlQueryResults,
) => {
  return response.results.bindings.reduce(
    (prev: { items: any[]; total: number }, binding: Binding) => {
      const [key] = Object.keys(binding);
      if (key === 'total') {
        prev.total = Number(binding[key].value);
      } else if (!binding[key]) {
        return prev;
      } else {
        const self = binding[key].value;
        if (self) {
          prev.items.push(self);
        }
      }
      return prev;
    },
    {
      items: [],
      total: 0,
    },
  );
};

export type DatasetQueryConfig = {
  vocab: string;
  graphs: { [filterName: string]: string };
};

export const makeDatasetQuery = (
  datasetQueryConfig: DatasetQueryConfig,
  appliedFilters: { [filterName: string]: string[] },
  size: number,
  from: number,
): string => {
  // graphQueries look like this
  // {
  //   brainRegion: `
  // Graph ?g {
  //   VALUES ?search { #{values} }
  //   ?s1 nxs:brainRegion ?search .
  // }
  //   `
  // }

  const graphQueries = Object.keys(datasetQueryConfig.graphs)
    .map(key => {
      // unparsed query looks like this
      // Graph ?g {
      //   VALUES ?search { #{values} }
      //   ?s1 nxs:brainRegion ?search .
      // }
      const unparsedQuery = datasetQueryConfig.graphs[key];

      // we dont need to parse this for now...
      // mainly because I don't know how to handle these query caes
      // where you always want it to be used
      if (key === 'constrainedBy') {
        return unparsedQuery;
      }

      // lets get the list of ids for this applied facet key
      // in our example, the key would be brainRegion
      // and the ids would be something like http://api.brain-map.org/api/v2/data/Structure/778
      const ids = appliedFilters[key];

      if (ids && ids.length) {
        // for the sparql query to work we need to always wrap URIs in <>
        const values = (ids || []).map(id => `<${id}>`).join(' ');
        const labels = (ids || []).map(id => `"${id}"`).join(' ');

        // now we need to add the appliedFacet values, if available
        const parseQuery = unparsedQuery
          .replace('#{values}', values)
          .replace('#{labels}', labels);
        return parseQuery;
      }
      return null;
    })
    .filter(queryString => !!queryString)
    .join('');

  return `
  ${datasetQueryConfig.vocab}

  SELECT ?total ?self
     WITH {
      SELECT DISTINCT ?self {
        ${graphQueries}
        Graph ?g {
          ?s nxv:self ?self
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT ${size}
           OFFSET ${from}
        }
     }
   `;
};
