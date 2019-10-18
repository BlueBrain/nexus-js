
import React from 'react';
import { Input, Button } from 'antd';

import { DetailedCircuitResource } from '../../../containers/ResourceDetails/types';
import Copy from '../../../components/Copy';
import { HandleClickParams } from '../../../types';


const BasicInfo: React.FunctionComponent<{
  resource: DetailedCircuitResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const { resource } = props;

  return (
    <div>
      <p>
        <strong>Circuit type:</strong> {resource.circuitType || 'NA'}
      </p>

      <Input
        className="mt"
        readOnly
        addonBefore="Base circuit path"
        addonAfter={
          <Copy
            textToCopy={resource.circuitBase.url || ''}
            render={(copySuccess, triggerCopy) => (
              <Button
                block
                type="link"
                size="small"
                icon="copy"
                onClick={() => triggerCopy()}
              >
                {copySuccess ? 'Copied!' : 'Copy'}
              </Button>
            )}
          />
        }
        defaultValue={resource.circuitBase.url || ''}
      />

    </div>
  );
};


export default BasicInfo;
