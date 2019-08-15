import * as React from 'react';
import { User } from 'oidc-client';
import { UserContext } from '../providers/UserProvider';

const useUser = () => {
  const userManager = React.useContext(UserContext);
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const accessTokenExpired = () => {
      setError(new Error('Access token expired'));
      userManager && userManager.getUser().then(setUser);
    };

    const userUnloaded = () => {
      setError(new Error('Access token expired'));
      userManager && userManager.getUser().then(setUser);
    };

    if (userManager) {
      userManager.events.addAccessTokenExpired(accessTokenExpired);
      userManager.events.addUserUnloaded(userUnloaded);
      userManager.getUser().then(setUser);
    }
    return () => {
      if (userManager) {
        userManager.events.removeAccessTokenExpired(accessTokenExpired);
        userManager.events.removeUserLoaded(userUnloaded);
      }
    };
  }, [userManager]);

  return { userManager, user, error };
};

export default useUser;
