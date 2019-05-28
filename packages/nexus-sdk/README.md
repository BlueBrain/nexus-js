# `@bbp/nexus-sdk`

> REST API abstraction for Nexus

- Resources and other Endpoints
  - [`Projects`](./src/Project#readme)
  - [`Resources`](./src/Resource#readme)
  - [`Identities`](./src/Identity#readme)
  - [`Files`](./src/File#readme)

## Documentation

```typescript
import { createNexusClient } from '@bbp/nexus-sdk';

const nexus = createNexusClient({ uri: 'https://api.url', version: 'v1' })

```

**Node.js support**

The Nexus SDK relies on [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), so in order to use this library in Node.js, you need to provide a `fetch` implementation when creating a new client. We recommend using [`node-fetch`](https://www.npmjs.com/package/node-fetch)

Request Cancellation is using `AbortController`, so you need to polyfill it. As [documented](https://www.npmjs.com/package/node-fetch#request-cancellation-with-abortsignal) in `node-fetch`, you can use [`abort-controller`](https://www.npmjs.com/package/abort-controller) as a polyfill.

Example:

```javascript
const fetch = require('node-fetch');
require("abort-controller/polyfill")

const nexus = createNexusClient({
  uri: 'https://sandbox.bluebrainnexus.io',
  version: 'v1',
  fetch,
});

nexus.Organization.list().then(orgs => console.log(orgs)).catch(e => console.error(e));

```