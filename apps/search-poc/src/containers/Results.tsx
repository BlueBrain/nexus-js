import * as React from 'react';
import { useDatasetQuery } from '../hooks/sparql';
import { AppliedFilters } from '../components/Filters';
import Results from '../components/Results';
import { DatasetQueryConfig, makeDatasetQuery } from '../utils/sparql';

// @ts-ignore
const FiltersContainer: React.FunctionComponent<{
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  datasetQueryConfig: DatasetQueryConfig;
  appliedFilters: AppliedFilters;
}> = props => {
  const {
    datasetQueryConfig,
    appliedFilters,
    orgLabel,
    projectLabel,
    viewID,
  } = props;

  const query = makeDatasetQuery(datasetQueryConfig, appliedFilters, 20, 0);

  const { loading, data } = useDatasetQuery({
    orgLabel,
    projectLabel,
    viewID,
    query,
  });

  return !loading && data && <Results {...data} />;
};

export default FiltersContainer;
