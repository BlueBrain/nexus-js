# Identities

[`Back to Readme`](../../#readme)

[`Project Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/delta/api/current/iam-identities.html)

```typescript
// Identities
const obs: Observable<IdentityList> = nexus.Resource.poll({ pollTime: 3000 });
obs.subscribe();

const identityList: IdentityList = await nexus.Resource.list();
```
