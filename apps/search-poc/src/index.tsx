import * as React from 'react';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NexusClient, createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import { setUpSession, setToken } from './utils/auth';
import Header from './containers/Header';
import DetailsView from './views/Details';
import MainView from './views/Main';
import { SETTINGS } from './config';
import UserProvider from './providers/UserProvider';

import 'antd/dist/antd.css';
import './index.css';

async function main() {
  const userManager = await setUpSession();
  // create nexus instance
  const nexus: NexusClient = createNexusClient({
    fetch,
    uri: SETTINGS.environment,
    links: [setToken],
  });

  const rootElement = document.getElementById('root');
  render(
    <UserProvider userManager={userManager}>
      <NexusProvider nexusClient={nexus}>
        <div className="App">
          <Header />
          <Router>
            <Switch>
              <Route path="/" exact>
                <MainView />
              </Route>
              <Route path="/resources" component={DetailsView} />
            </Switch>
          </Router>
        </div>
      </NexusProvider>
    </UserProvider>,
    rootElement,
  );
}
main();

// If you want your app to work offline and load faster, you can changeDashboards
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
