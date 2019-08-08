import { Realm } from '@bbp/nexus-sdk';
import { UserManager, User } from 'oidc-client';
import { Operation, Link, Observable } from '@bbp/nexus-link';
import { SETTINGS } from '../config';

// creates a OIDC config based on input realm
export function getConfig(realm?: Realm) {
  return {
    authority: realm ? realm._issuer : '',
    client_id: SETTINGS.clientId,
    redirect_uri: SETTINGS.redirectUrl,
    popup_redirect_uri: SETTINGS.redirectUrl,
    post_logout_redirect_uri: SETTINGS.redirectUrl,
    response_type: 'id_token token',
    loadUserInfo: true,
  };
}

// link that sets the bearer token before each nexus call
export const setToken: Link = (operation: Operation, forward?: Link) => {
  const token = localStorage.getItem(SETTINGS.bearerTokenKey);
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
  let user: User | null = null;
  let userManager: UserManager | null = null;
  // Get preferred realm
  const preferredRealm: Realm = JSON.parse(
    localStorage.getItem(SETTINGS.preferredRealmKey) || '{}',
  );

  // then create User Manager with preferred realm issuer
  // or empty user manager if no preferred realm
  userManager = new UserManager(getConfig(preferredRealm));

  // maybe we're getting new user session after redirect
  try {
    user = await userManager.signinRedirectCallback();
  } catch (error) {}
  // if not, check if we already had a running session
  if (!user) {
    try {
      user = await userManager.getUser();
    } catch (error) {
      // if not, that's fine
    }
  }

  // Set events
  userManager.events.addUserLoaded((user: User) => {
    localStorage.setItem(SETTINGS.bearerTokenKey, user.id_token);
  });

  userManager.events.addAccessTokenExpired(() => {
    localStorage.removeItem(SETTINGS.bearerTokenKey);
  });

  return [userManager, user];
}
