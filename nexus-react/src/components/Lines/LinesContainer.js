import React from "react";
import PropTypes from 'prop-types';
import LinesComponent from "./LinesComponent.jsx";
import generateLineGeometry from "./lines-geometry";

class LinesContainer extends React.Component {
  componentDidMount() {
    generateLineGeometry(this.ref);
  }
  canvasReferenceCallback(ref) {
    this.ref = ref;
  }
  render() {
    let animate = this.props.animate || true;
    return LinesComponent(this.canvasReferenceCallback.bind(this), animate);
  }
}

LinesContainer.propTypes = {
  animate: PropTypes.bool
};

export default LinesContainer;
