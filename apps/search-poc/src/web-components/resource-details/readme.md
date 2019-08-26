
# Resource details web component

## Basics

Custom element: `resource-details`

Required attributes:
* access-token
* self-url

## Build

Production build can be triggered by:
```bash
$ webpack --config src/web-components/resource-details/webpack.config.prod.js
```
from `seach-poc` root folder.

Build task will produce ready to use bundle `./dist-wc/resource-details.bundle.min.js`;

## Development

Dev server can be started with:
```bash
$ npx webpack-cli serve --config src/web-components/resource-details/webpack.config.dev.js
```

## Usage

In target page:
* import js bundle
* add `resource-details` element with required attributes, see example below.


Example:
```html
<resource-details
  access-token="[accessToken]"
  self-url="[selfUrl]"
/>
```
