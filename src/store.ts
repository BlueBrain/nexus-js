import Store from './utils/Store';

export interface NexusState {
  auth: { accessToken?: string };
  api: { baseUrl?: string };
}
// This is our global store, used across the entire SDK
// it is accessible and configurable through the Nexus class
export default new Store({
  auth: {
    accessToken: null,
  },
  api: {
    baseUrl: null,
  },
});
