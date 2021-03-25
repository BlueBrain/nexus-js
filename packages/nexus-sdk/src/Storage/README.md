# Storages

[`Back to Readme`](../../#readme)

[`Storage Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/delta/api/current/kg-storages-api.html)

```typescript
// Storages
nexus.Storage.get('myOrg', 'myProject', 'myID')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Storage.poll('myOrg', 'myProject', 'myID', { pollTime: 3000 }).subscribe(
  d => console.log('res>', d),
);

nexus.Storage.list('myOrg', 'myProject', { type: 'myType' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Storage.create('myOrg', 'myProject', {
  '@id': 'nxv:mys3storage',
  '@type': 'S3Storage',
  default: false,
  bucket: 'mybucket',
  endpoint: 'https://s3.us-west-1.amazonaws.com',
  accessKey: 'AKIAIOSFODNN7EXAMPLE',
  secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Storage.update('myOrg', 'myProject', 'myId', 1, {
  '@type': 'S3Storage',
  default: true,
  bucket: 'mybucket',
  endpoint: 'https://s3.us-west-1.amazonaws.com',
  accessKey: 'AKIAIOSFODNN7EXAMPLE',
  secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Storage.deprecate('myOrg', 'myProject', 'myId', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
