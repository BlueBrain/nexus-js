import { useNexus } from '@bbp/react-nexus';
import {
  makeDatasetFromSparlQueryResponse,
  mapQueryResultsToFilters,
} from '../utils/sparql';

export const useFilterQuery = ({
  orgLabel,
  projectLabel,
  viewID,
  query,
}: {
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  query: string;
}) => {
  const { data, loading, error } = useNexus<any>(nexus =>
    nexus.View.sparqlQuery(orgLabel, projectLabel, viewID, query),
  );

  return {
    data: data && mapQueryResultsToFilters(data),
    loading,
    error,
  };
};

export const useDatasetQuery = ({
  orgLabel,
  projectLabel,
  viewID,
  query,
}: {
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  query: string;
}) => {
  const { data, loading, error } = useNexus<any>(
    nexus => nexus.View.sparqlQuery(orgLabel, projectLabel, viewID, query),
    [query],
  );

  return {
    data: data && makeDatasetFromSparlQueryResponse(data),
    loading,
    error,
  };
};
