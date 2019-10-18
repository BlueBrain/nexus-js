import { Realm } from '@bbp/nexus-sdk';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { Operation, Link, Observable } from '@bbp/nexus-link';
import { SETTINGS } from '../config';

// creates a OIDC config based on input realm
export function getConfig(realm?: Realm) {
  return {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: realm ? realm._issuer : '',
    client_id: SETTINGS.clientId,
    redirect_uri: SETTINGS.redirectUrl,
    popup_redirect_uri: SETTINGS.redirectUrl,
    post_logout_redirect_uri: SETTINGS.redirectUrl,
    response_type: 'id_token token',
    automaticSilentRenew: true,
    silent_redirect_uri: `${window.location.origin}/silent-auth-callback.html`,
    loadUserInfo: true,
  };
}

export function saveAccessToken(token: string) {
  localStorage.setItem(SETTINGS.bearerTokenKey, token);
}

export function deleteAccessToken() {
  localStorage.removeItem(SETTINGS.bearerTokenKey);
}

// link that sets the bearer token before each nexus call
export const setToken: Link = (operation: Operation, forward?: Link) => {
  const token = localStorage.getItem(SETTINGS.bearerTokenKey);
  if (!token) console.log('No access token in localstorage');
  const nextHeaders: any = { ...operation.headers };
  token && (nextHeaders['Authorization'] = `Bearer ${token}`);

  const nextOperation = {
    ...operation,
    headers: nextHeaders,
  };

  return forward ? forward(nextOperation) : new Observable();
};

/**
 * This function will:
 * - try to create a user manager instance if the realms settings are available from local storage
 * - set event listeners in order to keep the bearer token in sync in local storage
 * - look for new session on creation
 * - load user info
 * - return a ref of user manager instance and the user
 */
export async function setUpSession(): Promise<[UserManager, User | null]> {
  // Get preferred realm
  const preferredRealm: Realm = JSON.parse(
    localStorage.getItem(SETTINGS.preferredRealmKey) || '{}',
  );

  // then create User Manager with preferred realm issuer
  // or empty user manager if no preferred realm
  const userManager: UserManager | null = new UserManager(
    getConfig(preferredRealm),
  );

  // @ts-ignore
  window.userManager = userManager;

  const user: User | null = window.location.hash
    ? await userManager.signinRedirectCallback()
    : await userManager.getUser();

  // @ts-ignore
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search,
  );

  // @ts-ignore
  window.user = user;

  const nextLocationSearch = localStorage.getItem('nextLocationSearch');
  if (nextLocationSearch) {
    const nextLocationPathname = localStorage.getItem('nextLocationPathname');
    const loc = window.location;
    window.history.replaceState(
      null,
      '',
      `${loc.protocol}//${loc.host}${nextLocationPathname}${nextLocationSearch}`,
    );
    localStorage.removeItem('nextLocationSearch');
  }

  if (user) {
    if (user.expired) {
      userManager.signinRedirect();
    }

    saveAccessToken(user.access_token);
  } else {
    deleteAccessToken();
  }

  // Set events
  userManager.events.addUserLoaded((user: User) => {
    saveAccessToken(user.access_token);
  });

  userManager.events.addAccessTokenExpired(() => {
    localStorage.removeItem(SETTINGS.bearerTokenKey);
  });

  return [userManager, user];
}
