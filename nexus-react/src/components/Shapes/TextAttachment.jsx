import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function requestImageWithBearerToken(src, token) {
  return fetch(src, {
    headers: {
      'Authorization': "Bearer " + token
    }
  })
  .then(resp => resp.text())
}

class TextAttachmentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textData: null
    };
  }
  componentDidMount() {
    const { src, token } = this.props;
    requestImageWithBearerToken(src, token)
      .then(imageData => {
        this.setState({ imageData });
      })
      .catch(console.error);
  }
  render() {
    const { render, ...props } = this.props;
    return render({ ...props, textData: this.state.textData });
  }
}

function mapStateToProps({ auth }) {
  return {
    token: auth.token
  };
}

TextAttachmentContainer.propTypes = {
  src: PropTypes.string.isRequired,
  token: PropTypes.string
};

export default connect(mapStateToProps)(TextAttachmentContainer);
