import * as React from "react";
import { Spin, notification } from 'antd';


const Details: React.FunctionComponent<{
  entity: any;
  loading: boolean;
  error: Error | null;
}> = props => {
  const { entity, loading, error } = props;

  if (error) {
    notification.error({
      message: error.message,
    });
  }

  return (
    <div className="Details">
      <Spin tip="Loading..." spinning={loading}>
        <h1>Common entity details</h1>
        {entity && <div>
          <p>Id: {entity['@id']}</p>
          <p>
            Brain region: &nbsp;
            <a
              href={entity.brainLocation.brainRegion['@id']}
              target="_blank"
            >
              {entity.brainLocation.brainRegion.label}
            </a>
          </p>
          <p>Name: {entity.name}</p>
        </div>}
      </Spin>
    </div>
  );
};


export default Details;
