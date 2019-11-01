
import React from 'react';
import qs from 'qs';
import { Input, Button, notification } from 'antd';
import { User } from 'oidc-client';

import UserContext from '../../../contexts/UserContext';
import { DetailedCircuitResource } from '../../../containers/ResourceDetails/types';
import Copy from '../../../components/Copy';
import { HandleClickParams } from '../../../types';


const pairRecordingAppBaseUrl = 'http://bp.ocp.bbp.epfl.ch';

const BasicInfo: React.FunctionComponent<{
  resource: DetailedCircuitResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const { resource } = props;

  const circuitConfigPath = `${resource.circuitBase.url}/CircuitConfig`;
  const pairRecordingAppParams = {
    name: circuitConfigPath,
    path: circuitConfigPath,
    simModel: circuitConfigPath.match(/proj64/)
      ? 'neocortexV6'
      : 'thalamus',
  };
  const pairRecordingAppHref = `${pairRecordingAppBaseUrl}/circuits/?${qs.stringify(pairRecordingAppParams)}`;

  const runBrains = async (user: User | null) => {
    if (!user) return;

    const userName = user.profile.preferred_username;
    const runBrainsJobUrl = `https://bbp-workflow-oauth-${userName}.ocp.bbp.epfl.ch/launch/bbp_workflow.circuit.BraynsCircuitViewer/?account=proj55&exclusive&cpus-per-task=10&circuit-path=${circuitConfigPath}`;

    let startJob;

    try {
      startJob = await fetch(runBrainsJobUrl, {
        method: 'post',
        // mode: 'no-cors',
        headers: new Headers({
          Authorization: `Bearer ${user.access_token}`,
        }),
      });
    } catch (error) {
      notification.error({
        message: 'Error contacting Workflow Engine',
        description: <span>
          This feature require Workflow engine up and running on your behalf. <br/> <br/>
          Check <a href="https://bbpteam.epfl.ch/project/spaces/pages/viewpage.action?spaceKey=BBPNSE&title=Workflow" target="_blank">documentation</a> how to install it.
        </span>,
        duration: 9,
      });
    }

    console.log(startJob);
  };

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

      <h3 className="mt">Actions</h3>
      <Button
        className="mr"
        href={pairRecordingAppHref}
        target="_blank"
      >
        Open in Pair Recording App
      </Button>

      <UserContext.Consumer>
        {(user: User | null) => (
          <Button
            onClick={() => runBrains(user)}
          >
            Open in Brains
          </Button>
        )}
      </UserContext.Consumer>

    </div>
  );
};


export default BasicInfo;
