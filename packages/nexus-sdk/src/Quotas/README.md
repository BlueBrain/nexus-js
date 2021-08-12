# Quotas

Quotas restrict volume of data in Projects.

[`Back to Readme`](../../#readme)

```typescript
// Quotas
nexus.Quotas.get('myOrg', 'myProject')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
