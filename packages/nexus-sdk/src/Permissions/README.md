# Permissions

[`Back to Readme`](../../#readme)

[`Permissions Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/delta/api/current/iam-permissions-api.html#replace-permissions)

```typescript
// Permissions
nexus.Permissions.get()
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Permissions.replace(1, {
  permissions: ['newpermission/read', 'newpermission/write'],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Permissions.subtract(1, {
  permissions: ['newpermission/write'],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Permissions.append(1, {
  permissions: ['newpermission/create'],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Permissions.delete(1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Permissions.poll({ pollTime: 1000 })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
