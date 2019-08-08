
import * as React from 'react';
import MorphoViewer from 'morphoviewer/es/morphoviewer';
import { Card } from 'antd';

import './ReconstructedNeuronMorphologyDetails.css';


class ReconstructedNeuronMorphologyDetails extends React.Component<{
  morphology: any;
}> {
  private containerEl = React.createRef<HTMLDivElement>();
  private viewer: any = null;

  componentDidMount() {
    this.viewer = new MorphoViewer.MorphoViewer(this.containerEl.current);
    this.viewer.addMorphology(this.props.morphology, { asPolyline: false });
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
      <div className='morphology' ref={this.containerEl}/>
    </Card>
  }
}


export default ReconstructedNeuronMorphologyDetails;
