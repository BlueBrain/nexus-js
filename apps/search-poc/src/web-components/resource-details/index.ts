import { saveAccessToken } from '../../utils/auth';
import { parseNexusUrl } from '../../utils';

import WebComponent from '../web-component';

import DetailsContainerComponent from '../../containers/ResourceDetails/ResourceDetails';

import 'antd/dist/antd.css';
import '../../index.css';

// workaround to import styles from components imported using React.lazy
// TODO: refactor
import '../../components/ResourceDetails/MorphologyViewer.css';
import '../../components/ResourceDetails/ResourceDetails.css';

class ResourceDetails extends WebComponent {
  constructor() {
    super();

    this.ReactComponent = DetailsContainerComponent;
  }

  connectedCallback() {
    const selfUrl = this.getAttribute('self-url');
    if (!selfUrl) throw new Error('self-url should be defined');

    const accessToken = this.getAttribute('access-token');
    if (accessToken) saveAccessToken(accessToken);

    const parsedUrl = parseNexusUrl(selfUrl);
    this.createNexusClient(parsedUrl.deployment);

    this.reactComponentProps = { selfUrl };

    this.init();
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

customElements.define('resource-details', ResourceDetails);
