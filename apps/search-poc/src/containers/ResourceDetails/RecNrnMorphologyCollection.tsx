import React from 'react';
import { Spin } from 'antd';
import sortBy from 'lodash/sortBy';

import { Resource, DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';
import { useNexus } from '@bbp/react-nexus';
import { MINDSResource } from './types';
import { getCollectionReconstructedCellsQuery } from '../../config';
import { parseProjectUrl } from '../../utils';
import { mapMorphCollQueryResults } from '../../utils/sparql';
import RecNrnMorphologyCollection, {
  Morph,
} from '../../components/ResourceDetails/RecNrnMorphologyCollection';

const RecNrnMorphologyCollectionContainer: React.FunctionComponent<{
  resource: Resource & MINDSResource;
}> = props => {
  const query = getCollectionReconstructedCellsQuery(props.resource['@id']);
  const [org, proj] = parseProjectUrl(props.resource._project);

  const { data, loading, error } = useNexus<any>(nexus =>
    nexus.View.sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query),
  );

  const reconstructedcells: Morph[] = sortBy(
    mapMorphCollQueryResults(data),
    'name',
  ) as Morph[];
  const morphRelease: { reconstructedcells: Morph[] } = {
    ...props.resource,
    ...{ reconstructedcells },
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <RecNrnMorphologyCollection resource={morphRelease} />;
};

export default RecNrnMorphologyCollectionContainer;
