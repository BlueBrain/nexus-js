import * as React from 'react';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NexusClient, createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import { setUpSession, setToken } from './utils/auth';
import Header from './components/Header';
import SparqlView from './views/Sparql';
import DetailsView from './views/Details';
import { SETTINGS } from './config';

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
      <div className="App">
        <Header user={user} userManager={userManager} />
        <Router>
          <Switch>
            <Route path="/" exact>
              <SparqlView
                sparqlDatasetQueryConfig={SETTINGS.sparqlDatasetQueryConfig}
                sparqlFilterQuery={SETTINGS.sparqlFilterQuery}
              />
            </Route>
            <Route
              path="/details/:id"
              render={props => <DetailsView id={props.match.params.id} />}
            />
          </Switch>
        </Router>
      </div>
    </NexusProvider>,
    rootElement,
  );
}
main();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
