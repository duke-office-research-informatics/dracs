import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Portal = props => {
  const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    style: PropTypes.object,
  };

  // static defaultProps = {
  //   className: "",
  // };

  const [container, setContainer] = useState(getContainer(props.container));
  // state = {
  //   // container: document.body,
  //   container: document.getElementsByTagName("main")[0],
  // };

  // componentDidMount() {// I think this might definitely be what's going on
  //   console.log("Portal (from ExpandedCard) has entered the chat")
  //   // this.setState({ container: getContainer(props.container) });
  // }

  // componentDidUpdate(prevProps) {
  //   console.log("Portal (from ExpandedCard) props changed")
  //   if (prevProps.container !== props.container) {
  //     // this.setState({ container: getContainer(props.container) });
  //   }
  // }

  // componentWillUnmount() {
  //   console.log("Portal (from ExpandedCard) has left the chat")
  // }

  useEffect(() => {
    console.log("Portal (from ExpandedCard) props changed");
    const newContainer = getContainer(props.container);
    if (newContainer != container) {
      setContainer(newContainer);
    }
  }, [props.container]);

  useEffect(() => {
    console.log("Portal (from ExpandedCard) has entered the chat");
    return () => {
      console.log("Portal (from ExpandedCard) has left the chat");
    };
  }, []);

  console.log("Portal (from ExpandedCard) is rendering");
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

export default Portal;
