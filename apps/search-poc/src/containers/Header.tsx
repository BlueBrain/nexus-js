import * as React from 'react';
import { Menu, Icon, Dropdown, Button, notification } from 'antd';
import { UserManager } from 'oidc-client';
import { useNexusContext } from '@bbp/react-nexus';
import { Realm } from '@bbp/nexus-sdk';
import { SETTINGS } from '../config';
import { getConfig } from '../utils/auth';
import useUser from '../hooks/useUser';

const Login: React.FunctionComponent<{
  realms: Realm[];
  onRealmSelected(realm: Realm): void;
}> = ({ realms, onRealmSelected }) => {
  const [selectedRealm, setSelectedRealm] = React.useState<Realm>(realms[0]);

  React.useEffect(() => {
    if (!selectedRealm) {
      setSelectedRealm(realms[0]);
    }
  }, [realms, setSelectedRealm, selectedRealm]);

  const menu = (
    <Menu>
      {realms.map(realm => (
        <Menu.Item key={realm['@id']} onClick={() => setSelectedRealm(realm)}>
          {realm._label}
        </Menu.Item>
      ))}
    </Menu>
  );
  return selectedRealm ? (
    <Dropdown.Button
      overlay={menu}
      onClick={() => onRealmSelected(selectedRealm)}
      icon={<Icon type="down" />}
    >
      Login with {selectedRealm._label} <Icon type="login" />
    </Dropdown.Button>
  ) : null;
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

const Header: React.FunctionComponent = () => {
  const nexus = useNexusContext();
  const { userManager, user, error: userError } = useUser();
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

  if (userError) {
    notification.error({
      message: userError.name,
      description: userError.message,
    });
  }

  return (
    <div className="Header">
      <h1 className="title">
        <a href="/">BBP Studio</a>
      </h1>
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
