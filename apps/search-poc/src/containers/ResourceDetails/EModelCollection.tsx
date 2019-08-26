import React from 'react';
import { Spin } from 'antd';

import { Resource, DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';
import { useNexus } from '@bbp/react-nexus';
import { MINDSResource, EModelResource } from './types';
import { getCollectionEModelsQuery } from '../../config';
import { parseProjectUrl, camelCaseToLabelString, getLabel } from '../../utils';
import ResultTable from '../../components/ResultTable';

const EModelCollectionDetailsContainer: React.FunctionComponent<{
  resource: Resource & MINDSResource & EModelResource;
  goToResource?: Function;
}> = props => {
  const query = getCollectionEModelsQuery(props.resource['@id']);
  const [org, proj] = parseProjectUrl(props.resource._project);

  const { data, loading, error } = useNexus<any>(nexus =>
    nexus.View.sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query),
  );

  // build header properties
  const headerProperties: {
    title: string;
    dataIndex: string;
  }[] =
    data &&
    data.head.vars
      .filter(
        // we don't want to display total or self url in result table
        (headVar: string) => !(headVar === 'self'),
      )
      .map((headVar: string) => ({
        title: camelCaseToLabelString(headVar), // TODO: get the matching title from somewhere?
        dataIndex: headVar,
      }));

  // build items
  const items =
    data &&
    data.results.bindings
      // we only want resources
      .filter((binding: any) => binding.self)
      .map((binding: any) => {
        // let's get the value for each headerProperties
        const properties = headerProperties.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.dataIndex]:
              (binding[curr.dataIndex] && binding[curr.dataIndex].value) ||
              undefined,
          }),
          {},
        );

        // return item data
        return {
          ...properties, // our properties
          id: getLabel(decodeURIComponent(binding.self.value)), // id is used by antd component
          self: binding.self.value, // used in order to load details or resource once selected
          key: binding.self.value, // used by react component (unique key)
        };
      });

  return (
    <Spin spinning={loading}>
      {data && (
        <ResultTable
          headerProperties={headerProperties}
          items={items}
          onRowClick={(emodel, index) => {
            console.log(emodel);
            props.goToResource && props.goToResource(emodel.self);
          }}
        />
      )}
    </Spin>
  );
};

export default EModelCollectionDetailsContainer;
