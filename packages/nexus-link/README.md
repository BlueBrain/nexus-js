# `@bbp/nexus-link`

> Utilities for creating links 🔗. 

Links are sort of middlewares, they allow us to control a request flow.

A link receives a request and pass it forward to the next link, unless it is a "terminating" link, in this case, the link does something of that request, for example sends it to the server.

A link returns an observable for the previous link to subscribe to.

The flow looks like:

```
request  -> | LINK1 | -> | LINK2 | -> server   |
response <- |       | <- |       | <- result <-|
```

Example:

A Link for logging how long it took to resolve the request, called logger

request  -> logger creates start=Date.now()   -> forward to next and subscribe -> request goes to server  |
response <- logger does log(Date.now()-start) <- bubble the chain of handlers  <- response from server  <-|

There are 2 types of Links:
 - stateless
 - stateful

A little bit like a react component can be:

```typescript
const myComponent: React.FunctionComponent = () => <p>Hello</p>
```

or

```typescript
class MyComponent extends React.Component {
 render() {
   return <p>Hello</p>
 }
}
```


A Link can be

```typescript
const link: Link = (operation: Operation, forward: Link) => forward(operation);
```

or

```typescript
class MyLink extends StatefulLink {
  request(operation: Operation, forward: NextLink) {
    return forward(operation);
  }
}
```

## Documentation


### some links

`setMethod` link that sets the method of the request (GET, POST, etc...)

`poll` link that polls every x seconds

`triggerFetch` (terminal link)

### utils

`concat` concat 2 links together

`pipe` compose all links into 1

`toLink` transforms a stateless link into a stateful link

`toPromise` transform an observable into a promise

