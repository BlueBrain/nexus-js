import { Observable } from '@bbp/nexus-link';
import { Link, Operation } from '@bbp/nexus-link/src/types';
import { createNexusClient } from '../nexusSdk';

describe('createNexusClient', () => {
  const options = {
    uri: 'testUriString',
  };

  it('exposes context with uri', () => {
    const nexus = createNexusClient(options);

    expect(nexus.context.uri).toEqual(options.uri);
  });

  it('adds a link to the front of the request handler queue from the optional links array', done => {
    const setToken: Link = (operation: Operation, forward?: Link) => {
      const nextOperation = {
        ...operation,
        headers: {
          ...operation.headers,
          someHeader: 'test-token',
        },
      };
      return forward && forward(nextOperation);
    };

    const nexus = createNexusClient({ ...options, links: [setToken] });

    fetchMock.mockResponseOnce(JSON.stringify({ hello: 'hi' }));

    nexus
      .httpGet({
        path: 'https://someurl.com/hello',
      })
      .then(response => {
        expect(fetchMock.mock.calls[0][1].headers.someHeader).toBe(
          'test-token',
        );
        done();
      });
  });

  it('calls all the links in the linksOverwrite optional array', done => {
    const sayHi: Link = (operation: Operation, forward?: Link) => {
      const nextOperation = {
        ...operation,
        context: {
          say: 'hi',
        },
      };
      return forward && forward(nextOperation);
    };

    const returnSpeech: Link = (operation: Operation) => {
      return new Observable(subscription => {
        subscription.next(operation.context.say);
      });
    };

    const nexus = createNexusClient({
      ...options,
      linksOverwrite: [sayHi, returnSpeech],
    });

    fetchMock.mockResponseOnce(JSON.stringify({ hello: 'hi' }));

    nexus
      .httpGet({
        path: 'https://someurl.com/hello',
      })
      .then(response => {
        expect(response).toBe('hi');
        done();
      });
  });
});
