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
    async nexus => {
      const data = await nexus.View.sparqlQuery(
        orgLabel,
        projectLabel,
        viewID,
        query,
      );
      const { items: selfURLList, total } = makeDatasetFromSparlQueryResponse(
        data,
      );
      const promises = selfURLList.map(selfURL =>
        nexus.httpGet({ path: selfURL }),
      );
      const items = await Promise.all(promises);
      return { items, total };
    },
    [query],
  );

  return {
    data,
    loading,
    error,
  };
};
