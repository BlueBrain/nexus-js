import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function convertBlobToBase64 (blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    }
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  })
}

function requestImageWithBearerToken(src, token) {
  return fetch(src, {
    headers: {
      'Authorization': "Bearer " + token
    }
  })
  .then(resp => resp.blob())
  .then(convertBlobToBase64)
}

class ImageAttachmentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null
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
    return render({ ...props, imageData: this.state.imageData });
  }
}

function mapStateToProps({ auth }) {
  return {
    token: auth.token
  };
}

ImageAttachmentContainer.propTypes = {
  src: PropTypes.string.isRequired,
  token: PropTypes.string
};

export default connect(mapStateToProps)(ImageAttachmentContainer);
