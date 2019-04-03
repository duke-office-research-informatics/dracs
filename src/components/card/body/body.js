import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const CardBodyWrap = styled.article`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: ${p => (p.padding ? p.padding : 0)};
  overflow-x: hidden;
  overflow-y: auto;
  height: ${p => p.height};
  align-content: flex-start;
  transform: translateZ(0);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CardBody = props => {
  return (
    <CardBodyWrap
      className={props.className}
      height={props.height}
      id={props.id}
      innerRef={props.innerRef}
      style={props.style}
      padding={props.padding}
    >
      {props.children}
    </CardBodyWrap>
  );
};

CardBody.propTypes = {
  /** CSS class name */
  className: propTypes.string,
  /** CSS conumable (px, em, vh, etc) string tht sets the height */
  height: propTypes.string,
  /** CSS/HTML ID attribute */
  id: propTypes.string,
  /** Functional ref that can be passed to the component */
  innerRef: propTypes.func,
  /** React element(s) that will be children of this component */
  children: propTypes.node,
  /** CSS consumable (px, vh, em, etc) string that sets the padding of the component */
  padding: propTypes.string,
  /** Style object for the body */
  style: propTypes.object,
};

export default CardBody;
