import * as React from 'react';
import { Menu, Icon, Dropdown, Button } from 'antd';
import { UserManager, User } from 'oidc-client';
import { useNexusContext } from '@bbp/react-nexus';
import { Realm } from '@bbp/nexus-sdk';
import { SETTINGS } from '../config';
import { getConfig } from '../utils/auth';

import logoSvg from '../logo.svg';

const Login: React.FunctionComponent<{
  realms: Realm[];
  onRealmSelected(realm: Realm): void;
}> = ({ realms, onRealmSelected }) => {
  const menu = (
    <Menu>
      {realms.map(realm => (
        <Menu.Item key={realm['@id']} onClick={() => onRealmSelected(realm)}>
          {realm._label}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown.Button overlay={menu} icon={<Icon type="login" />}>
      Login
    </Dropdown.Button>
  );
};
const Logout: React.FunctionComponent<{
  userName: string;
  onLogout(): void;
}> = ({ userName, onLogout }) => {
  return (
    <Button icon="logout" onClick={onLogout}>
      {userName}: Logout
    </Button>
  );
};

const Header: React.FunctionComponent<{
  userManager: UserManager | null;
  user: User | null;
}> = ({ userManager, user }) => {
  const nexus = useNexusContext();

  // fetch list of available realms when application mounts
  const [realms, setRealms] = React.useState<Realm[]>([]);
  React.useEffect(() => {
    nexus.Realm.list()
      .then(realms => {
        // nexus uses a realm called `serviceaccount` internally, we need to filter it out
        setRealms(
          realms._results.filter(
            realm => realm._label !== SETTINGS.serviceAccountName,
          ),
        );
      })
      .catch(e => console.error(e));
  }, [nexus]);

  const handleLogin = (realm: Realm) => {
    if (!userManager) {
      return;
    }
    const nextUserManagerConfig = getConfig(realm);
    const nextUserManager = new UserManager(nextUserManagerConfig);
    nextUserManager
      .signinRedirect()
      .then(() => {
        userManager.revokeAccessToken();
        userManager.clearStaleState();
        localStorage.setItem(
          SETTINGS.preferredRealmKey,
          JSON.stringify({ _issuer: nextUserManagerConfig.authority }),
        );
      })
      .catch(e => console.log(e.message));
  };

  const handleLogout = () => {
    if (!userManager) {
      return;
    }
    userManager
      .signoutRedirect()
      .then(() => {
        userManager.revokeAccessToken();
        userManager.clearStaleState();
        localStorage.removeItem(SETTINGS.preferredRealmKey);
      })
      .catch(e => console.log(e.message));
  };

  return (
    <div className="Header">
      <img className="Header_logo" src={logoSvg} alt="Nexus" />
      <div className="Header_auth">
        {user ? (
          <Logout onLogout={handleLogout} userName={user.profile.name} />
        ) : (
          <Login realms={realms} onRealmSelected={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Header;
