import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

class Portal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    style: PropTypes.object,
  };

  static defaultProps = {
    className: "",
  };

  state = {
    container: document.body,
  };

  componentDidMount() {
    this.setState({ container: getContainer(this.props.container) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.container !== this.props.container) {
      this.setState({ container: getContainer(this.props.container) });
    }
  }

  render() {
    /** adding the wrapping div is to make sure that legacy classes and styles
     * from previous portal implementations are applied as expected
     *
     * TODO: React 16's createPortal function makes this component effectively obsolete,
     * we should look into how we want to create/consume non-legacy portals moving forward
     *
     * - Byron 1/3/20
     * */
    return ReactDOM.createPortal(
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>,
      this.state.container
    );
  }
}

function getContainer(container) {
  const _container = typeof container === "function" ? container() : container;
  return ReactDOM.findDOMNode(_container) || document.body; //eslint-disable-line
}

export default Portal;
