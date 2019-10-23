import { createNexusClient } from '../nexusSDK';

describe('createNexusClient', () => {
  const options = {
    uri: 'testUriString',
  };

  it('exposes context with uri', () => {
    const nexus = createNexusClient(options);

    expect(nexus.context.uri).toEqual(options.uri);
  });
});
