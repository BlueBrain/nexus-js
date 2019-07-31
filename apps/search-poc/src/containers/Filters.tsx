import * as React from 'react';
import { useFilterQuery } from '../hooks/sparql';
import Filters, {
  AppliedFilters,
  FilterUpdatePayload,
} from '../components/Filters';

// @ts-ignore
const FiltersContainer: React.FunctionComponent<{
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  query: string;
  appliedFilters: AppliedFilters;
  updateFilters?: (filterUpdate: FilterUpdatePayload) => void;
}> = props => {
  const { updateFilters, appliedFilters, ...rest } = props;
  const { loading, data } = useFilterQuery(rest);

  return (
    !loading && (
      <Filters
        {...{
          updateFilters,
          appliedFilters,
          filters: data,
        }}
      />
    )
  );
};

export default FiltersContainer;
