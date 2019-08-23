/**
 * Create an element tree containing html annd body elements
 * to make it possible to use third party stylesheets
 * which target those elements
 */
export function createShadowDomRootTree() {
  const htmlEl = document.createElement('html');

  const bodyEl = document.createElement('body');
  htmlEl.appendChild(bodyEl);

  const mountPoint = document.createElement('div');
  bodyEl.appendChild(mountPoint);

  return htmlEl;
}
