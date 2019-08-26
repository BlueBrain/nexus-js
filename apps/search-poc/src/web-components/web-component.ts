import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

import { createNexusClient, NexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';

import { createShadowDomRootTree } from './shadow-dom-tools';
import { setToken } from '../utils/auth';

/**
 * Generic web component class
 *
 * Derived class shoud define:
 * * ReactComponent
 * * nexusDeployment
 * * reactComponentProps
 *
 * and then call .init to instantiate component
 */
export default class WebComponent extends HTMLElement {
  ReactComponent: FunctionComponent<any> | string = '';
  nexusDeployment: string | null = null;
  reactComponentProps: { [prop: string]: any } = {};

  private nexusClient: NexusClient | null = null;
  private mountPoint: HTMLElement;
  private initialized = false;

  constructor() {
    super();

    const containerEl = createShadowDomRootTree();
    this.mountPoint = containerEl.querySelector('div') as HTMLElement;

    this.attachShadow({ mode: 'open' }).appendChild(containerEl);

    const styleElClone = ((<any>(
      window
    )).getResourceDetailsStyleEl() as Node).cloneNode(true);

    containerEl.appendChild(styleElClone);
  }

  /**
   * Initialize component with an instance of nexusClient.
   *
   * Web component attributes are undefined in constructor,
   * coming one by one with attributeChangedCallback
   * and all become available only when connectedCallback is being called.
   *
   * If component needs to be rerendered on particular observedAttribute change -
   * it will skip render calls while it's not initiaziled
   *
   * This method also allows async logic for providing nexusDeployment
   */
  init() {
    if (!this.nexusDeployment) {
      throw new Error('nexusDeployment should be defined');
    }

    this.nexusClient = createNexusClient({
      fetch,
      uri: this.nexusDeployment,
      links: [setToken],
    });

    this.initialized = true;

    this.render();
  }

  render() {
    if (!this.initialized) return;

    ReactDOM.render(
      React.createElement(
        NexusProvider,
        { nexusClient: this.nexusClient },
        React.createElement(this.ReactComponent, this.reactComponentProps),
      ),
      this.mountPoint,
    );
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  dispatchCustomEvent(name: string, eventData: any) {
    const event = new CustomEvent(name, eventData);
    this.dispatchEvent(event);
  }

  disconnectedCallback() {
    this.destroy();
  }
}
