# `@bbp/nexus-sdk`

> REST API abstraction for Nexus

- Resources and other Endpoints
  - [`Projects`](./src/Project#readme)

## Documentation

```typescript
import { createNexusClient } from '@bbp/nexus-sdk';

const nexus = createNexusClient({
  uri: 'https://sandbox.bluebrainnexus.io',
  version: 'v1',
  links: [logResponseTime, new OperationCount(), reduxDispatcher(console.log)], // list of links
});

nexus.Organization.list()
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.create('blah', { description: 'asd das da ' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.get('public')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

const sub: Subscriber<any> = nexus.Organization.poll('public', {
  pollTime: 1000,
}).subscribe(s => console.log('res>', s));
setTimeout(() => {
  sub.unsubscribe();
}, 4000);

nexus.File.get(
  'public',
  'album',
  'https%3A%2F%2Fsandbox.bluebrainnexus.io%2Fv1%2Fresources%2Fpublic%2Falbum%2F_%2Fe539bc98-d9e4-40e8-8eb7-551dfa09df93',
)
  .then(d => console.log(d.type, d.size))
  .catch(e => console.error(e));
```
