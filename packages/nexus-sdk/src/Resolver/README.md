# Resolvers

[`Back to Readme`](../../#readme)

[`Resolver Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/kg/kg-resolvers-api.html)

```typescript
// Resolvers
nexus.Resolver.get('myOrg', 'myProject', 'myID')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resolver.poll('myOrg', 'myProject', 'myID', { pollTime: 3000 }).subscribe(
  d => console.log('res>', d),
);

nexus.Resolver.list('myOrg', 'myProject', { type: 'myType' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resolver.create('myOrg', 'myProject', {
  '@type': ['CrossProject'],
  projects: ['org1/project1', 'org1/project2'],
  identities: [
    {
      realm: 'myrealm',
      subject: 'name',
    },
  ],
  priority: 50,
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resolver.update('myOrg', 'myProject', 'myId', 1, {
  '@id': 'https://bluebrain.github.io/nexus/vocabulary/myresolver',
  '@type': ['CrossProject'],
  projects: ['org1/project1', 'org1/project2'],
  identities: [
    {
      realm: 'myrealm',
      subject: 'name',
    },
  ],
  priority: 50,
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resolver.deprecate('myOrg', 'myProject', 'myId', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
