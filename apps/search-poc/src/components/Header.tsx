import * as React from 'react';
import './Header.css';
import { Realm } from '@bbp/nexus-sdk';

const Header: React.FunctionComponent<{
  handleLogin: (realm: Realm) => void;
  handleLogout: () => void;
  userName: string;
  realms: Realm[];
  Logout: React.FunctionComponent<{ onLogout: () => void; userName: string }>;
  Login: React.FunctionComponent<{
    realms: Realm[];
    onRealmSelected: (realm: Realm) => void;
  }>;
}> = ({ handleLogin, handleLogout, realms, userName, Login, Logout }) => {
  return (
    <div className="header-container">
      <h1 className="title">
        <a href="/">BBP Studio</a>
      </h1>
      <div className="auth">
        {userName ? (
          <Logout onLogout={handleLogout} userName={userName} />
        ) : (
          <Login realms={realms} onRealmSelected={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Header;
