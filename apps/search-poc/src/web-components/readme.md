
# BBP Studio web components

This project contains web component wrappers for different parts of BBP Studio

Web components:
* resource details
* dashboard

Required attributes:
* access-token
* self-url

## Build

Production build can be triggered by:
```bash
$ webpack --config src/web-components/[component-name]/webpack.config.prod.js
```
from `seach-poc` root folder.

Build task will produce ready to use bundle `./dist-wc/[component-name].bundle.min.js`;

## Development

Dev server can be started with:
```bash
$ npx webpack-cli serve --config src/web-components/[component-name]/webpack.config.dev.js
```

## Usage

In target page:
* import js bundle
* add `[component-name]` element with required attributes, see example below.


Example:
```html
<component-name
  access-token="[accessToken]"
  self-url="[selfUrl]"
/>
```
