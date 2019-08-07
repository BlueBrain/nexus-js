import * as React from 'react';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NexusClient, createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import { setUpSession, setToken } from './utils/auth';
import Header from './components/Header';
import ResultTable from './components/ResultTable';
import DetailsView from './views/Details';
import MainView from './views/Main';
import { SETTINGS } from './config';

import 'antd/dist/antd.css';
import './index.css';

const reconstructedNeuronMorphologiesProps = [
  { title: 'Brain Region', dataIndex: 'brainRegion' },
];
const reconstructedNeuronMorphologies = [
  {
    id: '1',
    brainRegion: 'Dorsal Thalamus',
    species: 'Rattus Norvegicus',
    strain: 'Wister Han',
    name: 'Morphology collection 2019',
  },
  {
    id: '2',
    brainRegion: 'Dorsal Thalamus',
    species: 'Rattus Norvegicus',
    strain: 'Wister Han',
    name: 'Morphology collection 2018',
  },
  {
    id: '3 ',
    brainRegion: 'Dorsal Thalamus',
    species: 'Rattus Norvegicus',
    strain: 'Wister Han',
    name: 'Morphology collection 2018 v2',
  },
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
              <MainView />
            </Route>
            <Route path="/resources" component={DetailsView} />
          </Switch>
        </Router>
      </div>
    </NexusProvider>,
    rootElement,
  );
}
main();

// If you want your app to work offline and load faster, you can changeDashboards
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
