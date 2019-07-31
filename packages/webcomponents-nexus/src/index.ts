import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import OrgList from './components/OrgList';

class MyElement2 extends HTMLElement {
  private nexus;

  constructor() {
    super();
    console.log('constructed!');
    this.nexus = createNexusClient({
      uri: 'http://dev.nexus.ocp.bbp.epfl.ch/v1',
      fetch,
    });
  }

  connectedCallback() {
    console.log('connected!');
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    ReactDOM.render(
      React.createElement(
        NexusProvider,
        { nexusClient: this.nexus },
        React.createElement(OrgList),
      ),
      mountPoint,
    );
  }

  disconnectedCallback() {
    console.log('disconnected!');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`Attribute: ${name} changed!`);
  }

  adoptedCallback() {
    console.log('adopted!');
  }
}

window.customElements.define('simple-element', MyElement2);
