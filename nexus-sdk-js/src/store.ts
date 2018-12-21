import Store from './utils/Store';

// This is our global store, used across the entire SDK
// it is accessible and configurable through the Nexus class
const store = new Store({
  auth: {
    accessToken: null,
  },
  api: {
    baseUrl: null,
  },
});

export function setEnvironment(environment: string): void {
  store.update('api', state => ({
    ...state,
    baseUrl: environment,
  }));
}

export function setToken(token: string): void {
  if (!token || token === undefined || token.length === 0) {
    throw new Error('Token is invalid.');
  }
  store.update('auth', state => ({
    ...state,
    accessToken: token,
  }));
}

export function removeToken(): void {
  store.update('auth', state => ({
    ...state,
    accessToken: undefined,
  }));
}

export default store;
