import React from 'react';
import { Spin } from 'antd';
import sortBy from 'lodash/sortBy';

import { Resource, DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';
import { useNexus } from '@bbp/react-nexus';
import { MINDSResource, EModelResource } from './types';
import { getCollectionEModelsQuery } from '../../config';
import { parseProjectUrl } from '../../utils';
import { mapEmodelCollQueryResults } from '../../utils/sparql';
import EModelCollectionDetails, {
  Emodel,
} from '../../components/ResourceDetails/EModelCollection';

const EModelCollectionDetailsContainer: React.FunctionComponent<{
  resource: Resource & MINDSResource & EModelResource;
}> = props => {
  const query = getCollectionEModelsQuery(props.resource['@id']);
  const [org, proj] = parseProjectUrl(props.resource._project);

  const { data, loading, error } = useNexus<any>(nexus =>
    nexus.View.sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query),
  );

  const emodels: Emodel[] = sortBy(
    mapEmodelCollQueryResults(data),
    'name',
  ) as Emodel[];
  const emodelCollection: { emodels: Emodel[] } = {
    ...props.resource,
    ...{ emodels },
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <EModelCollectionDetails resource={emodelCollection} />;
};

export default EModelCollectionDetailsContainer;
