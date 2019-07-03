import * as React from 'react';
import { NexusClient } from '@bbp/nexus-sdk';
import invariant from 'ts-invariant';
import nexusContext from './nexusContext';

const warningMessage =
  'No Nexus client found. ' +
  'To use react-nexus components, make sure you wrap your React app with the NexusProvider component' +
  ' like: <NexusProvider nexusClient={myClient)><App /></NexusProvider>. ';

export default function useNexusContext(): NexusClient {
  const nexus = React.useContext<NexusClient>(nexusContext);
  invariant(nexus, warningMessage);
  return nexus;
}
