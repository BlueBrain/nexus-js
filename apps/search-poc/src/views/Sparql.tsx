import * as React from 'react';
import Filters from '../containers/Filters';
import Results from '../containers/Results';
import { AppliedFilters, FilterUpdatePayload } from '../components/Filters';

const Workspace: React.FunctionComponent<{
  sparqlDatasetQueryConfig: any;
  sparqlFilterQuery: {
    orgLabel: string;
    projectLabel: string;
    viewID: string;
    query: string;
  };
}> = props => {
  const [appliedFilters, setAppliedFilters] = React.useState<AppliedFilters>(
    {},
  );
  const { sparqlFilterQuery, sparqlDatasetQueryConfig } = props;

  const updateFilters = (filterUpdate: FilterUpdatePayload) => {
    setAppliedFilters({
      ...appliedFilters,
      [filterUpdate.filterName]: filterUpdate.values,
    });
  };

  return (
    <>
      <Filters {...{ ...sparqlFilterQuery, appliedFilters, updateFilters }} />
      <Results
        {...{
          ...sparqlFilterQuery,
          datasetQueryConfig: sparqlDatasetQueryConfig,
          appliedFilters,
        }}
      />
    </>
  );
};

export default Workspace;
