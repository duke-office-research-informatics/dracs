import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const CardWrapper = styled.section`
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex: ${props => (props.flex ? props.flex : null)};
  background-color: ${p => (p.bgColor ? p.bgColor : "#fff")};
  height: ${props => props.height};
  width: ${props => props.width};
  border: ${p => (p.border ? `solid 1px ${p.theme.colors.border}` : null)};
  border-radius: ${props =>
    props.borderRadius
      ? props.borderRadius
      : `${props.theme.sizing.borderRadius}px`};
  overflow: hidden;
  transform: translateZ(0);
  -ms-overflow-style: none;
  cursor: ${p => (p.onClick ? "pointer" : null)};
  ${p => (p.minHeight ? `min-height: ${p.minHeight}` : null)};
  ${p => (p.minWidth ? `min-width: ${p.minWidth}` : null)};
  ${props => (props.margin ? "margin: " + props.margin : null)};
  ${props => (props.padding ? "padding: " + props.padding : null)};
  ${props =>
    props.raised ? `box-shadow: ${props.theme.boxShadow.card}` : null};
  ${p => (p.mediaQuery ? p.mediaQuery : null)} ${p =>
    p.animation ? p.animation : null}
  .react-draggable-dragging & {
    box-shadow: ${p => p.theme.boxShadow.card};
    transform: scale(1.01);
    z-index: ${p => p.theme.zIndex.md};
  }
`;

const Card = props => {
  return (
    <CardWrapper
      animation={props.animation}
      bgColor={props.bgColor}
      border={props.border}
      borderRadius={props.borderRadius}
      className={props.className}
      flex={props.flex}
      raised={props.raised}
      height={props.height}
      width={props.width}
      id={props.id}
      minHeight={props.minHeight}
      minWidth={props.minWidth}
      margin={props.margin}
      mediaQuery={props.mediaQuery}
      onClick={props.onClick}
      padding={props.padding}
      ref={props.cardRef}
      style={props.style}
    >
      {props.children}
    </CardWrapper>
  );
};

Card.propTypes = {
  animation: propTypes.string,
  /** CSS-consumable (hex, rgba, etc) string that sets background color of the card */
  bgColor: propTypes.string,
  /** Boolean that sets whether the card displays a 1px gray border */
  border: propTypes.bool,
  /** String (number) that sets the border radius */
  borderRadius: propTypes.string,
  /** React element(s) that will be children of this component */
  children: propTypes.node,
  /** String to set an optional classname on the card */
  className: propTypes.string,
  /** string that sets the flex shorthand for the outer card wrapper */
  flex: propTypes.string,
  /** CSS consumable (px, vh, em, etc) string that sets the height of the component */
  height: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Functional ref that can be passed to the component */
  cardRef: propTypes.func,
  /** CSS consumable (px, vh, em, etc) string that sets the margin of the component */
  margin: propTypes.string,
  /** CSS consumable (px, vh, em, etc) string that sets the minimum height of the component */
  minHeight: propTypes.string,
  /** CSS consumable (px, vw, em, etc) string that sets the minimum width of the component */
  minWidth: propTypes.string,
  /** Function that will be called if the card is clicked */
  onClick: propTypes.func,
  /** CSS consumable (px, vh, em, etc) string that sets the padding of the component */
  padding: propTypes.string,
  /** Boolean that sets whether or not the card has a drop-shadow */
  raised: propTypes.bool,
  /** Style object for the card */
  style: propTypes.object,
  /** CSS consumable (px, vw, em, etc) string that sets the width of the component */
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** String that sets the HTML id attribute of the element */
  id: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** CSS-consumable (@media) string */
  mediaQuery: propTypes.string,
};

Card.defaultProps = {
  height: "auto",
  width: "auto",
  border: true,
};

export default Card;
