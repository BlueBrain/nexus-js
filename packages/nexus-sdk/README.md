<p align="center"><a href="https://github.com/BlueBrain/nexus-sdk-js" target="_blank" rel="noopener noreferrer"><img width="100" src="https://raw.githubusercontent.com/BlueBrain/nexus-webapp-commons/HEAD/nexus-js-logo.png" alt="Nexus Sdk logo"></a></p>

<h2 align="center">@bbp/nexus-sdk</h2>

<p align="center">
  <a href="https://codecov.io/gh/BlueBrain/nexus-sdk-js"><img src="https://codecov.io/gh/BlueBrain/nexus-sdk-js/branch/master/graph/badge.svg" alt="Coverage Status"></a>
  <a href="https://npmcharts.com/compare/@bbp/nexus-sdk?minimal=true"><img src="https://img.shields.io/npm/dm/@bbp/nexus-sdk.svg" alt="Downloads"></a><br/>
  <a href="https://libraries.io/npm/@bbp%2Fnexus-sdk"><img src="https://img.shields.io/librariesio/github/BlueBrain/nexus-sdk-js.svg" alt="Dependencies"></a>
  <a href="https://www.npmjs.com/package/@bbp/nexus-sdk"><img src="https://img.shields.io/npm/v/@bbp/nexus-sdk.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@bbp/nexus-sdk"><img src="https://img.shields.io/npm/l/@bbp/nexus-sdk.svg" alt="License"></a>
 <a href="https://twitter.com/intent/follow?screen_name=bluebrainnexus"><img alt="Follow on Twitter" src="https://img.shields.io/twitter/follow/bluebrainnexus.svg?style=social&label=Follow"></a>
</p>

<p align="center">
  <a href="https://www.epfl.ch/research/domains/bluebrain/">Blue Brain Project</a> |
  <a href="https://bluebrainnexus.io">Nexus</a> |
  <a href="https://bluebrainnexus.io/docs/">Nexus API Docs</a> |
  <a href="https://sandbox.bluebrainnexus.io">Sandbox</a>
</a>

<p align="center">
  <a href="https://codesandbox.io/search?refinementList%5Btags%5D%5B0%5D=bluebrainnexus&page=1&configure%5BhitsPerPage%5D=12">Examples</a> |
  <a href="#Get-Started">Getting Started</a> |
  <a href="#API">API Documentation</a> |
  <a href="#Development">Development</a> |
  <a href="#License">License</a>
</p>

<p align="center">This is a handy javascript toolkit that helps people just like you to interact with <a href="https://bluebrainnexus.io">Blue Brain Nexus</a> to build things like client-side applications, scripts, or backend services.
</p>

## Get Started

install with your favorite package manager

```sh
npm install @bbp/nexus-sdk
```

import inside your client or node.js

```typescript
import { createNexusClient } from '@bbp/nexus-sdk';

const nexus = createNexusClient({ uri: 'https://api.url' });
```

Now go and add use Nexus, such as adding [`resources`](./src/Resource#readme) to a [`project`](./src/Project#readme)

### Node.js support

The Nexus SDK relies on [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), so in order to use this library in Node.js, you need to provide a `fetch` implementation when creating a new client. We recommend using [`node-fetch`](https://www.npmjs.com/package/node-fetch)

Request Cancellation is using `AbortController`, so you need to polyfill it. As [documented](https://www.npmjs.com/package/node-fetch#request-cancellation-with-abortsignal) in `node-fetch`, you can use [`abort-controller`](https://www.npmjs.com/package/abort-controller) as a polyfill.

Example:

```javascript
const fetch = require('node-fetch');
require('abort-controller/polyfill');

const nexus = createNexusClient({
  uri: 'https://sandbox.bluebrainnexus.io',
  fetch,
});

nexus.Organization.list()
  .then(orgs => console.log(orgs))
  .catch(e => console.error(e));
```

## API

#### Management

Set up restricted projects within organizations to contain your knowledge graph

[Orgs](./src/Organization#readme) | [Projects](./src/Project#readme)

#### Data

Interact with the knowledge graph

[Resources](./src/Resource#readme) | [Schema](./src/Schema#readme) | [Files](./src/File#readme) | [Views](./src/View#readme) | [Storage](./src/Storage#readme) | [Resolver](./src/Resolver#readme)

#### IAM

Set up rules for authentication and authorization for your instance of Nexus

[Realm](./src/Realm#readme) | [Permissions](./src/Permissions#readme) | [Identities](./src/Identity#readme) | [ACL](./src/ACL#readme)

## Development

### How is the repo structured?

This repo is managed as a _monorepo_ using [lerna](https://github.com/lerna/lerna) that is composed of multiple npm packages.

> Make sure you perform the make actions in the repository root directory!

### Using Docker

> If you don't have Node.js installed on your machine, you can run a "docker shell" with `make dshell` from which you'll have a fully working Node.js environment.
> Make sure you have already installed both [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Do things

- Install: `make install`
- Build: `make build`
- Test: `make test`
- Lint: `makelint`

# License

[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
