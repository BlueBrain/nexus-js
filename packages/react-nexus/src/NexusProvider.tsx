import * as React from 'react';
import NexusContext from './nexusContext';

const NexusProvider = ({ nexusClient, children }: any) => {
  return (
    <NexusContext.Provider value={nexusClient}>
      {children}
    </NexusContext.Provider>
  );
};

export default NexusProvider;
