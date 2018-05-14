import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Relationship from "../Shapes/Relationship";

const LinksComponent = (links, which, goToEntityByID) => {
  return (
    <div className={links.length ? "links fade in" : "links fade"}>
      <div>{links.length && <h3>{which} links</h3>}</div>
      <ul>
        {links.map(({ source }) => {
          return (
            <li key={source["@id"]}>
              <Relationship value={source} goToEntityByID={goToEntityByID} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

class LinksContainer extends React.Component {
  constructor(props) {
    super(props);
    const { resolvedLinks, which } = props;
    this.state = {
      links: resolvedLinks ? resolvedLinks[which] : []
    };
  }
  componentWillReceiveProps({ resolvedLinks, which }) {
    if (resolvedLinks && which) {
      this.setState({ links: resolvedLinks[which] });
    } else {
      this.setState({ links: [] });
    }
  }
  render() {
    return LinksComponent(this.state.links, this.props.which, this.props.goToEntityByID);
  }
}

LinksContainer.propTypes = {
  resolvedLinks: PropTypes.any,
  which: PropTypes.string.isRequired,
  goToEntityByID: PropTypes.func.isRequired
};

export default LinksContainer;
