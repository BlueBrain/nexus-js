<p align="center"><a href="https://github.com/BlueBrain/nexus-sdk-js" target="_blank" rel="noopener noreferrer"><img width="100" src="https://raw.githubusercontent.com/BlueBrain/nexus-webapp-commons/HEAD/nexus-js-logo.png" alt="Nexus Sdk logo"></a></p>

<h2 align="center">@bbp/react-nexus</h2>

<p align="center">
  <a href="https://codecov.io/gh/BlueBrain/nexus-sdk-js"><img src="https://codecov.io/gh/BlueBrain/nexus-sdk-js/branch/master/graph/badge.svg" alt="Coverage Status"></a>
  <a href="https://npmcharts.com/compare/@bbp/react-nexus?minimal=true"><img src="https://img.shields.io/npm/dm/@bbp/react-nexus.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@bbp/react-nexus"><img src="https://img.shields.io/npm/v/@bbp/nexus-sdk.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@bbp/react-nexus"><img src="https://img.shields.io/npm/l/@bbp/react-nexus.svg" alt="License"></a>
 <a href="https://twitter.com/intent/follow?screen_name=bluebrainnexus"><img alt="Follow on Twitter" src="https://img.shields.io/twitter/follow/bluebrainnexus.svg?style=social&label=Follow"></a>
</p>

> A set of React components for Nexus

## Usage

Install:

```sh
npm i @bbp/react-nexus @bbp/nexus-sdk
```

Wrap your App with the Provider

```tsx
import React from 'react';
import { render } from 'react-dom';
import { NexusProvider } from '@bbp/react-nexus';
import { createNexusClient } from '@bbp/nexus-sdk';

const nexus = createNexusClient({
  uri: 'https://sandbox.bluebrainnexus.io/v1',
});

const rootElement = document.getElementById('root');
render(
  <NexusProvider nexusClient={nexus}>
    <App />
  </NexusProvider>,
  rootElement,
);
```

Use the `useNexus` hook to call your nexus client instance:

```tsx
import { useNexus } from '@bbp/react-nexus';
import { OrganizationList, ListOrgOptions } from '@bbp/nexus-sdk';

const ListOrg = ({ options }: { options?: ListOrgOptions }) => {
  const state = useNexus<OrganizationList>(nexus =>
    nexus.Organization.list(options),
  );

  if (state.loading) {
    return <p>Loading Organization...</p>;
  }
  if (state.error) {
    return <p>An error occurred: {state.error.reason}</p>;
  }
  return state.data._results.map(org => <p>{org._label}</p>);
};

<ListOrg deprecated={true} />
```

There are some very handy components too:

```tsx
import { AccessControl } from '@bbp/react-nexus';

const RenderBasedOnPermission = () => (
  <AccessControl
    permissions={["projects/read", "resources/write"]}
    path="/org"
    noAccessComponent={(missingPerms) => <NoAccess />}
    loadingComponent={<p>Loading...</p>}
  >
    <Access />
  </AccessControl>
)
```

