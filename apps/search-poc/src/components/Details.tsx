import * as React from "react";
import { Spin } from 'antd';


const DetailsComponent: React.FunctionComponent<{
  data: any;
  loading: boolean;
}> = props => {
  const { data, loading } = props;

  return (
    <div className="Details">
      <Spin tip="Loading..." spinning={loading}>
        <h1>Common entity details</h1>
        {data && <div>
          <p>Id: {data['@id']}</p>
          <p>
            Brain region: &nbsp;
            <a
              href={data.brainLocation.brainRegion['@id']}
              rel="noopener noreferrer"
              target="_blank"
            >
              {data.brainLocation.brainRegion.label}
            </a>
          </p>
          <p>Name: {data.name}</p>
          <p>Description: {data.description}</p>
        </div>}
      </Spin>
    </div>
  );
};


export default DetailsComponent;
