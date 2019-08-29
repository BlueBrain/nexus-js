import React, { FunctionComponent, Context } from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import { createNexusClient, NexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';

import { createShadowDomRootTree } from './shadow-dom-tools';
import { setToken } from '../utils/auth';
import { HrefBuilderParams, LinkContext } from '../context/link';

/**
 * Generic web component class
 *
 * Derived class shoud define:
 * * ReactComponent
 * * nexusDeployment
 * * reactComponentProps
 *
 * and then call .init to instantiate component
 *
 * TODO: refactor
 */
export default class WebComponent extends HTMLElement {
  ReactComponent: FunctionComponent<any> | string = '';
  nexusDeployment: string | null = null;
  reactComponentProps: { [prop: string]: any } = {};
  getStyleElFuncName: string | null = null;
  nexusClient: NexusClient | null = null;

  private mountPoint: HTMLElement;
  private containerEl: HTMLElement;
  private initialized = false;

  constructor() {
    super();

    this.containerEl = createShadowDomRootTree();
    this.mountPoint = this.containerEl.querySelector('div') as HTMLElement;

    this.attachShadow({ mode: 'open' }).appendChild(this.containerEl);
  }

  onLinkClick(params: HrefBuilderParams) {
    this.dispatchCustomEvent('link-click', params);
  }

  createNexusClient(deployment: string) {
    this.nexusClient = createNexusClient({
      fetch,
      uri: deployment,
      links: [setToken],
    });
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
    if (!this.nexusClient) {
      throw new Error('createNexusClient should be called before init');
    }

    if (!this.getStyleElFuncName) {
      throw new Error('getStyleElMethodName should be defined');
    }

    const getStyleEl = (<any>window)[this.getStyleElFuncName] as () => Node;
    const styleElClone = getStyleEl().cloneNode(true);

    this.containerEl.appendChild(styleElClone);

    this.initialized = true;

    this.render();
  }

  render() {
    if (!this.initialized) return;

    const NexusProviderEl = React.createElement(
      NexusProvider,
      { nexusClient: this.nexusClient },
      React.createElement(this.ReactComponent, this.reactComponentProps),
    );

    const appEl = React.createElement(
      LinkContext.Provider,
      {
        value: {
          onLinkClick: this.onLinkClick.bind(this),
          buildHref: () => '',
        },
      },
      NexusProviderEl,
    );

    ReactDOM.render(appEl, this.mountPoint);
    retargetEvents(this.shadowRoot as ShadowRoot);
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  dispatchCustomEvent(name: string, eventData: any) {
    const event = new CustomEvent(name, { detail: eventData });
    this.dispatchEvent(event);
  }

  disconnectedCallback() {
    this.destroy();
  }
}
