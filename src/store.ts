import Store from './utils/Store';

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
