# # Realms

[`Back to Readme`](../../#readme)

[`Realm Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/admin/admin-orgs-api.html)

```typescript
// Orgs
nexus.Realm.list()
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.create('myOrg', {
  description: 'What a fine description of my project.',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.update('myOrg', 1, {
  description: 'What a fine description of my project.',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.deprecate('myOrg', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.get('myOrg')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.poll('myOrg', { pollTime: 1000 })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```

[`Back to Readme`](../../#readme)

[`Realm Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/iam/iam-realms-api.html)

```typescript
// Realms

nexus.Realm.get('myRealmLabel')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.list()
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.create('myRealmLabel', {
  name: 'Nexus Dev',
  openIdConfig:
    'https://nexus.example.com/auth/realms/bbp-test/.well-known/openid-configuration',
  logo: 'http://nexus.example.com/logo.png',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.update('myRealmLabel', 1, {
  name: 'Nexus Dev',
  openIdConfig:
    'https://nexus.example.com/auth/realms/bbp-test/.well-known/openid-configuration',
  logo: 'http://nexus.example.com/logo.png',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.deprecate('myRealmLabel', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Realm.poll('myRealmLabel', { pollTime: 1000 })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
