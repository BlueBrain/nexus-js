import * as React from 'react';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { NexusClient, createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import { setUpSession, setToken } from './utils/auth';
import Header from './containers/Header';
import DetailsView from './views/DetailsView';
import MainView from './views/MainView';
import { SETTINGS, getStudioConfig } from './config';

import 'antd/dist/antd.css';
import './index.css';

async function main() {
  const [userManager, user] = await setUpSession();
  // create nexus instance
  const nexus: NexusClient = createNexusClient({
    fetch,
    uri: SETTINGS.environment,
    links: [setToken],
  });

  const rootElement = document.getElementById('root');
  render(
    <NexusProvider nexusClient={nexus}>
      <Header user={user} userManager={userManager} />
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainView
              studioOrg={SETTINGS.studioOrg}
              studioProject={SETTINGS.studioProject}
              studioViewId={SETTINGS.studioViewId}
              studioQuery={getStudioConfig(SETTINGS.studioId)}
            />
          </Route>
          <Route path="/resources" component={DetailsView} />
        </Switch>
      </Router>
    </NexusProvider>,
    rootElement,
  );
}
main();

// If you want your app to work offline and load faster, you can changeDashboards
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
