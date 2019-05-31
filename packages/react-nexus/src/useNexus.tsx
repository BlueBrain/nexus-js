import * as React from 'react';
import invariant from 'ts-invariant';
import { NexusClient } from '@bbp/nexus-sdk';
import nexusContext from './nexusContext';

const warningMessage =
  'No Nexus client found. ' +
  'To use nexus-react components, make sure you wrap your React app with the NexusProvider component' +
  ' like: <NexusProvider nexusClient={myClient)><App /></NexusProvider>. ';

export default function useNexus(
  apiCall: (nexus: NexusClient) => Promise<any>,
) {
  const nexus = React.useContext<NexusClient>(nexusContext);
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    data: null,
  });
  invariant(nexus, warningMessage);
  React.useEffect(() => {
    setState({ ...state, loading: true });
    apiCall(nexus)
      .then((data: any) => setState({ ...state, loading: false, data }))
      .catch((error: any) => setState({ ...state, loading: false, error }));
  }, []);

  return state;
}
