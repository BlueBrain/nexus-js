
import React from 'react';
import { Spin, Empty } from 'antd';
import { useNexus } from '@bbp/react-nexus';

import { parseNexusUrl } from '../../../utils'
import { HandleClickParams } from '../../../types';
import { SimWriterConfigResource } from '../../../containers/ResourceDetails/types';
import SimWriterConfig from '../../../components/ResourceDetails/SimulationCampaign/SimWriterConfig';


const SimWriterConfigContainer: React.FunctionComponent<{
  resourceId: string;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const { data, loading, error } = useNexus<any>((nexus) => {
    const getSimWriterConf = (simWriterResource: SimWriterConfigResource) => {
      const configUrl = simWriterResource.configuration.url;
      const tmplUrl = simWriterResource.template.url;
      const tmplIdMatch = tmplUrl.match(/.*\/(.*?)$/);
      const tmplId = tmplIdMatch ? tmplIdMatch[1] : '';
      const { name, description } = simWriterResource;

      const parsedTmplUrl = parseNexusUrl(tmplUrl);

      const configuration = { data: '' };
      const template = { data: '' };

      return nexus
        .httpGet({ path: configUrl })
        .then(configData => { configuration.data = configData })
        .then(() => nexus.File.get(parsedTmplUrl.org, parsedTmplUrl.project, tmplId, { as: 'text' }))
        .then(tmplData => { template.data = tmplData as string })
        .then(() => ({ name, description, configuration, template }));
    }

    return nexus.httpGet({ path: props.resourceId }).then(getSimWriterConf)
  });

  return (
    <Spin spinning={loading}>
      {error && !data && <Empty>{error.message}</Empty>}
      {data && (
        <SimWriterConfig
          resource={data}
          handleClick={props.handleClick}
        />
      )}
    </Spin>
  );
};


export default SimWriterConfigContainer;
