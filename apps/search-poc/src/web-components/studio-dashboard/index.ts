import { NexusClient } from '@bbp/nexus-sdk';

import { SETTINGS } from '../../config';
import { saveAccessToken } from '../../utils/auth';
import { parseNexusUrl } from '../../utils';
import { HandleClickParams } from '../../types';

import WebComponent from '../web-component';
import DashboardComponent from '../../containers/ResultTable';

import 'antd/dist/antd.css';
import '../../index.css';

class StudioDashboard extends WebComponent {
  getStyleElFuncName = 'getStudioDashboardStyleEl';

  constructor() {
    super();

    this.ReactComponent = DashboardComponent;
  }

  fetchDashboardResource(selfUrl: string) {
    return (this.nexusClient as NexusClient).httpGet({ path: selfUrl });
  }

  setComponentProps(dashboardResource: { dataQuery: string }) {
    this.reactComponentProps = {
      dataQuery: dashboardResource.dataQuery,
      orgLabel: SETTINGS.studioOrg,
      projectLabel: SETTINGS.studioProject,
      // TODO: query viewId by dashboard's selfUrl
      viewId: 'nxv:StudioSparqlView',
      handleClick: (params: HandleClickParams) => this.handleClick(params),
    };
  }

  connectedCallback() {
    const selfUrl = this.getAttribute('self-url');
    if (!selfUrl) throw new Error('self-url should be defined');

    const accessToken = this.getAttribute('access-token');
    if (accessToken) saveAccessToken(accessToken);

    const parsedUrl = parseNexusUrl(selfUrl);
    this.createNexusClient(parsedUrl.deployment);

    this.fetchDashboardResource(selfUrl).then(deshboardResource => {
      this.setComponentProps(deshboardResource);
      this.init();
    });
  }

  static get observedAttributes() {
    return ['self-url', 'access-token'];
  }
  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (name === 'access-token') {
      saveAccessToken(newVal);
    } else if (name === 'self-url') {
      this.render();
    }
  }
}

customElements.define('studio-dashboard', StudioDashboard);
