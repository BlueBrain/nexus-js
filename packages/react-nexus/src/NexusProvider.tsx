import * as React from 'react';
import NexusContext from './nexusContext';
import { NexusClient } from '@bbp/nexus-sdk';

export type NexusProviderProps = {
  nexusClient: NexusClient;
};

const NexusProvider: React.FC<NexusProviderProps> = ({
  nexusClient,
  children,
}) => {
  return (
    <NexusContext.Provider value={nexusClient}>
      {children}
    </NexusContext.Provider>
  );
};

export default NexusProvider;
