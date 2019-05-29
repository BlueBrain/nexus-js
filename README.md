<p align="center"><a href="https://github.com/BlueBrain/nexus-sdk-js" target="_blank" rel="noopener noreferrer"><img width="100" src="https://raw.githubusercontent.com/BlueBrain/nexus-webapp-commons/HEAD/nexus-js-logo.png" alt="Nexus Sdk logo"></a></p>

<p align="center">
 <a href="https://twitter.com/intent/follow?screen_name=bluebrainnexus"><img alt="Follow on Twitter" src="https://img.shields.io/twitter/follow/bluebrainnexus.svg?style=social&label=Follow"></a>
</p>

<p align="center">
  <a href="https://www.epfl.ch/research/domains/bluebrain/">Blue Brain Project</a> |
  <a href="https://bluebrainnexus.io">Nexus</a> |
  <a href="https://bluebrainnexus.io/docs/">Nexus API Docs</a> |
  <a href="https://sandbox.bluebrainnexus.io">Sandbox</a>
</a>

<p align="center">
  <a href="https://codesandbox.io/search?refinementList%5Btags%5D%5B0%5D=bluebrainnexus&page=1&configure%5BhitsPerPage%5D=12">Examples</a> |
  <a href="#Packages">Packages</a> |
  <a href="#Development">Development</a> |
  <a href="#License">License</a>
</p>

<p align="center">
Javascript tools to make developing on top of <a href="https://bluebrainnexus.io">Blue Brain Nexus</a> even easier.
</p>

## Packages

### [`@bbp/nexus-sdk`](./packages/nexus-sdk/README.md#readme)

An abstracted sdk layer over Blue Brain Nexus to make developing clients and services more simple.
[npm](https://www.npmjs.com/package/@bbp/nexus-sdk) | [Readme](./packages/nexus-sdk#readme)

### `@bbp/nexus-link`

A middleware or "link" library that makes chaining operations very simple, especially useful for things like making requests.
[npm](https://www.npmjs.com/package/@bbp/nexus-link) | [Readme](./packages/nexus-link#readme)

#### How is the repo structured?

This repo is managed as a _monorepo_ using [lerna](https://github.com/lerna/lerna) that is composed of multiple npm packages.

## Development

> Make sure you perform the make actions in the repository root directory!

### Using Docker

> If you don't have Node.js installed on your machine, you can run a "docker shell" with `make dshell` from which you'll have a fully working Node.js environment.
> Make sure you have already installed both [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Do things

- Install: `make install`
- Build: `make build`
- Test: `make test`
- Lint: `makelint`

# License

[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
