import * as React from 'react';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NexusClient, createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import { setUpSession, setToken } from './utils/auth';
import Header from './components/Header';
import Results from './components/Results';
import DetailsView from './views/Details';
import { SETTINGS } from './config';

import 'antd/dist/antd.css';
import './index.css';

const reconstructedNeuronMorphologies = [
  'https://staging.nexus.ocp.bbp.epfl.ch/v1/resources/bbp/nmc/datashapes:dataset/https%3A%2F%2Fbbp.epfl.ch%2Fneurosciencegraph%2Fdata%2Freconstructedcell%2Ffef76d7c-8175-4874-8566-8938928a030f',
  'https://staging.nexus.ocp.bbp.epfl.ch/v1/resources/pgetta/testproj1/_/90d7b1ee-094f-43dc-9281-c12e09f0f3ed', // pgetta example
];

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
              <h1>Reconstructed Neuron Morphologies</h1>
              <Results
                items={reconstructedNeuronMorphologies}
                total={reconstructedNeuronMorphologies.length}
              />
            </Route>
            <Route path="/resources/:selfUrlEncoded" component={DetailsView} />
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
