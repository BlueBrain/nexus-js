import React from "react";
import PropTypes from "prop-types";
import debounce from "../../libs/debounce";
import SearchFormComponent from "./SearchFormComponent.jsx";

const DEFAULT_COMPONENT = SearchFormComponent;

class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props);
    // TODO add debounce that feels right
    this.debouncedSearch = debounce(this.search.bind(this), 100, true);
    this.input = React.createRef();
    this.component = this.props.component
      ? this.props.component
      : DEFAULT_COMPONENT;
  }
  handleSubmit(e) {
    e.preventDefault();
    let val = this.input.value + "";
    this.input.value = null;
    if (this.props.onSubmit) {
      return this.props.onSubmit(val);
    }
    this.props.search(val);
  }
  refCallback(ref) {
    this.input = ref;
  }
  search(e) {
    let keyCode = Number(e.keyCode);
    // dont fire search for arrow keys
    if (keyCode <= 40 && keyCode >= 37) { return; }
    this.props.search(this.input.value);
  }
  render() {
    let { search, className, children, component } = this.props;
    let status = this.props.pending
      ? "pending"
      : this.props.error
        ? "error"
        : "default";
    return this.component({
      status,
      onSubmit: this.handleSubmit.bind(this),
      onKeyPress: this.debouncedSearch.bind(this),
      inputRef: this.refCallback.bind(this),
      value: this.input.value,
      className,
      children
    });
  }
}

SearchFormContainer.propTypes = {
  pending: PropTypes.bool.isRequired,
  error: PropTypes.any,
  search: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.element
};

export default SearchFormContainer;
