# ACLs

[`Back to Readme`](../../#readme)

[`ACLs Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/iam/iam-acls-api.html)

```typescript
// Access Control Lists
nexus.ACL.list('myOrg/myProject')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.ACL.create('myOrg/myProject', {
  acl: [
    {
      permissions: ['projects/read'],
      identity: {
        realm: 'myrealm',
        group: 'a-group',
      },
    },
    {
      permissions: ['projects/read', 'projects/write'],
      identity: {
        realm: 'realm',
        group: 'some-group',
      },
    },
  ],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.ACL.replace('myOrg/myProject', {
  acl: [
    {
      permissions: ['projects/read'],
      identity: {
        realm: 'myrealm',
        group: 'a-group',
      },
    },
    {
      permissions: ['projects/read', 'projects/write'],
      identity: {
        realm: 'realm',
        group: 'some-group',
      },
    },
  ],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.ACL.subtract('myOrg/myProject', {
  acl: [
    {
      permissions: ['projects/read'],
      identity: {
        group: 'a-group',
        realm: 'myrealm',
      },
    },
  ],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.ACL.append('myOrg/myProject', {
  acl: [
    {
      permissions: ['own', 'other'],
      identity: {
        realm: 'myrealm',
        group: 'a-group',
      },
    },
  ],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.ACL.delete('myOrg/myProject', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Organization.poll('myOrg/myProject', { pollTime: 1000 })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
