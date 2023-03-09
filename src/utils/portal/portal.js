import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Portal = props => {
  const [container, setContainer] = useState(getContainer(props.container));

  useEffect(() => {
    const newContainer = getContainer(props.container);
    if (newContainer != container) {
      setContainer(newContainer);
    }
  }, [props.container]);

  /** adding the wrapping div is to make sure that legacy classes and styles
   * from previous portal implementations are applied as expected
   *
   * TODO: React 16's createPortal function makes this component effectively obsolete,
   * we should look into how we want to create/consume non-legacy portals moving forward
   *
   * - Byron 1/3/20
   * */
  return ReactDOM.createPortal(
    <div className={props.className} style={props.style}>
      {props.children}
    </div>,
    container
  );
};

function getContainer(container) {
  const _container = typeof container === "function" ? container() : container;
  return ReactDOM.findDOMNode(_container) || document.body; //eslint-disable-line
}

Portal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  style: PropTypes.object,
};

export default Portal;
