# Organizations

[`Back to Readme`](../../#readme)

[`Organization Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/admin/admin-orgs-api.html)

```typescript
// Orgs
nexus.Organization.list()
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.create('myOrg', {
  description: 'What a fine description of my project.',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.update('myOrg', 1, {
  description: 'What a fine description of my project.',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.deprecate('myOrg', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.get('myOrg')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.poll('myOrg', { pollTime: 1000 })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
