
import * as React from 'react';
import MorphoViewer from 'morphoviewer/es/morphoviewer';
import { Card } from 'antd';

import './ReconstructedNeuronMorphologyDetails.css';


class ReconstructedNeuronMorphologyDetails extends React.Component<{
  morphology: any;
}, {
  hasError: boolean;
}> {
  private containerEl = React.createRef<HTMLDivElement>();
  private viewer: any = null;

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    this.viewer = new MorphoViewer.MorphoViewer(this.containerEl.current);
    this.viewer.addMorphology(this.props.morphology, { asPolyline: false });
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  componentWillUnmount() {
    this.viewer.destroy();
  }

  render() {
    return <Card
      title="Morphology viewer"
      hoverable
      bodyStyle={{padding: 0}}
    >
      <div className='morphology' ref={this.containerEl}>
        {this.state.hasError && <p>Can't init the viewer due to error</p>}
      </div>
    </Card>
  }
}


export default ReconstructedNeuronMorphologyDetails;
