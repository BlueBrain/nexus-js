import * as React from 'react';
import { UserManager } from 'oidc-client';

export const UserContext = React.createContext<UserManager | null>(null);

const UserProvider: React.FunctionComponent<{ userManager: UserManager }> = ({
  userManager,
  children,
}) => {
  return (
    <UserContext.Provider value={userManager}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
