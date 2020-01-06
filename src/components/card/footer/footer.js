import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const CardFooterWrap = styled.footer`
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  justify-content: ${p => (p.multipleActions ? "space-between" : "flex-end")};
  align-self: flex-end;
  width: 100%;
  padding: calc(${props => props.theme.sizing.base / 2}px);
  border-top: ${p =>
    p.border ? `solid 1px ${p.theme.colors.border}` : "none"};
  background-color: ${p => (p.bgColor ? p.bgColor : "transparent")};
  overflow: hidden;
`;

const CardFooter = props => {
  return (
    <CardFooterWrap
      bgColor={props.bgColor}
      border={props.border}
      className={props.className}
      ref={props.ref}
      multipleActions={props.multipleActions}
      style={props.style}
    >
      {props.children}
    </CardFooterWrap>
  );
};

CardFooter.propTypes = {
  /** CSS-consumable (hex, rgba, etc) string that sets background color of the footer */
  bgColor: propTypes.string,
  /** Boolean that sets whether the card displays a 1px gray top border */
  border: propTypes.bool,
  /** React element(s) that will be children of this component */
  children: propTypes.node,
  /** Functional ref that can be passed to the component */
  ref: propTypes.func,
  /** Boolean that sets whether the footer will have one or multiple children -- manipulates css justify-content ( 'space-between' : 'flex-end' ) */
  multipleActions: propTypes.bool,
  /** Style object for the footer */
  style: propTypes.object,
  /**CSS classname to apply to the footer */
  className: propTypes.string,
};

CardFooter.defaultProps = {
  border: true,
};

export default CardFooter;
