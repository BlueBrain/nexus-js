import Store from './utils/Store';
import Organization, { ListOrgsResponse, OrgInit } from './Organization';
import { httpGet, httpPost } from './utils/http';

type NexusConfig = {
  environment: string;
  token?: string;
};

export const store: Store = new Store({
  auth: {
    accessToken: null,
  },
  api: {
    baseUrl: null,
  },
});

export default class Nexus {
  constructor(config: NexusConfig) {
    if (!config.environment) {
      throw new Error(
        'No environment provided. Please specify your Nexus instance endpoint.',
      );
    }
    store.update('api', state => ({
      ...state,
      baseUrl: config.environment,
    }));
    if (config.token) {
      store.update('auth', state => ({
        ...state,
        accessToken: config.token,
      }));
    }
  }

  setToken(token: string): void {
    store.update('auth', state => ({
      ...state,
      accessToken: token,
    }));
  }

  removeToken(): void {
    store.update('auth', state => ({
      ...state,
      accessToken: undefined,
    }));
  }

  // TODO: refactor -> blocked by https://github.com/BlueBrain/nexus/issues/112
  // This is SUPER hacky.
  // I first get the list of all projects which gives me a list of `_id` (that's because the /projects endpoint is not implemented either)
  // I then generate an array of Orgs from the _id and return Orgs with empty everything, apart from name and @id.
  async listOrganizations(): Promise<Organization[]> {
    try {
      const listOrgsResponse: ListOrgsResponse = await httpGet('/projects');
      if (listOrgsResponse.code || !listOrgsResponse._results) {
        return [];
      }
      // Close your eyes 😑
      // map list and return only _id
      // filter duplicates
      // map to return list of {id, name}
      const filteredOrgs = listOrgsResponse._results
        .map(org => org._id)
        .filter((org, index, self) => self.indexOf(org) === index)
        .map(org => {
          const idArray = org
            .replace('/projects/', '/orgs/')
            .split('/')
            .slice(0, -1);
          return {
            id: idArray.join('/'),
            name: idArray[idArray.length - 1],
          };
        });

      const orgs = filteredOrgs.map(({ id, name }) => {
        return new Organization({
          '@context': listOrgsResponse['@context'],
          '@id': id,
          _label: name,
        });
      });
      return orgs;
    } catch (e) {
      console.log(e);
      throw new Error(`ListOrgsError: ${e}`);
    }
  }
}
