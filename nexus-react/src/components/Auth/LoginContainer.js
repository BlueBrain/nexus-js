import React from "react";
import PropTypes from "prop-types";
import LoginComponent from "./LoginComponent.jsx";

const DEFAULT_COMPONENT = LoginComponent;

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.component = this.props.component
      ? this.props.component
      : DEFAULT_COMPONENT;
  }
  componentDidMount() {
    this.props.authenticate(this.props.location);
  }
  render() {
    let { name, className, loginURI, logout } = this.props;
    return this.component({ className, name, loginURI, logout });
  }
}

LoginContainer.propTypes = {
  logout: PropTypes.func.isRequired,
	authenticate: PropTypes.func.isRequired,
	location: PropTypes.string.isRequired,
	name: PropTypes.string,
	className: PropTypes.string,
	loginURI: PropTypes.string
};

export default LoginContainer;
