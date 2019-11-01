
import React from 'react';
import get from 'lodash/get';
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

      const targetUrl = get(simWriterResource, 'target.url', '');
      const targetIdMatch = targetUrl.match(/.*\/(.*?)$/);
      const targetId = targetIdMatch ? targetIdMatch[1] : '';

      const { name, description } = simWriterResource;

      const parsedTmplUrl = parseNexusUrl(tmplUrl);

      const configuration = { data: '' };
      const template = { data: '' };
      const target = { data: '' };

      return nexus
        .httpGet({ path: configUrl })
        .then(configData => { configuration.data = configData })
        .then(() => nexus.File.get(parsedTmplUrl.org, parsedTmplUrl.project, tmplId, { as: 'text' }))
        .then(tmplData => { template.data = tmplData as string })
        .then(() => {
          if (!targetId) return;

          const parsedTargetUrl = parseNexusUrl(targetUrl);
          return nexus.File.get(parsedTargetUrl.org, parsedTargetUrl.project, targetId, { as: 'text' })
            .then(targetData => { target.data = targetData as string })
        })
        .then(() => ({ name, description, configuration, template, target }));
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
