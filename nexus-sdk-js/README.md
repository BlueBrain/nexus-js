# SDK for nexus

## Develop

- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
- Generate Documentation: `npm run documentation`

## Usage

```typescript
import Nexus from 'nexus-sdk';

const nexus: Nexus = new Nexus({
  environment: 'http://api.url',
  token: 'my_bearer_token',
});
```
