
import React from 'react';
import { Spin } from 'antd';
import { useNexus } from '@bbp/react-nexus';

import { parseNexusUrl } from '../../../utils';
import { HandleClickParams } from '../../../types';
import AnalysisImage from '../../../components/ResourceDetails/Simulation/AnalysisImage';


const AnalysisImageContainer: React.FunctionComponent<{
  resource: { imageUrl: string };
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const imageUrl = props.resource.imageUrl;
  const {org, project} = parseNexusUrl(imageUrl);

  const { data, loading, error } = useNexus<any>(nexus =>
    nexus.File.get(org, project, encodeURIComponent(imageUrl), { as: 'blob'})
  );

  return (
    <div>
      {loading &&
        <Spin spinning={loading}>
          <div className="analysis-image-container"></div>
        </Spin>
      }
      {data && <AnalysisImage
        imageData={data}
        handleClick={props.handleClick}
      />}
    </div>
  )
}

export default AnalysisImageContainer;
