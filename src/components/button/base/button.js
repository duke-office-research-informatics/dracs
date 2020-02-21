import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import styledMap from "styled-map";

import colors from "../../../theme/colors/colorTheme.js";

const bgColor = styledMap("styleType", {
  filled: colors.action,
  inverted: colors.bg,
  error: colors.bg,
  errorFilled: colors.error,
  disabled: colors.bg,
  disabledFilled: colors.muted,
  flat: colors.bg,
});

const bgHoverColor = styledMap("styleType", {
  filled: colors.actionHover,
  inverted: colors.bg,
  error: colors.bg,
  errorFilled: "hsla(15,100%,40%,0.8)",
  disabled: colors.bg,
  disabledFilled: colors.muted,
  flat: colors.bg,
});

const color = styledMap("styleType", {
  filled: colors.bg,
  inverted: colors.action,
  error: colors.error,
  errorFilled: colors.bg,
  disabled: colors.muted,
  disabledFilled: colors.bg,
  flat: colors.action,
});

const hoverColor = styledMap("styleType", {
  filled: colors.bg,
  inverted: colors.actionHover,
  error: "hsla(15,100%,40%,0.8)",
  errorFilled: colors.bg,
  disabled: colors.muted,
  disabledFilled: colors.bg,
  flat: colors.actionHover,
});

export const StyledBtn = styled.button.attrs(props => ({
  disabled:
    props.styleType === "disabled" || props.styleType === "disabledFilled"
      ? true
      : false,
}))`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  height: ${props => (props.dense ? "32px" : " 36px")};
  line-height: ${props => (props.dense ? "2.5em" : " 2.8em")};
  white-space: nowrap;
  min-width: 64px;
  padding: 0 8px;
  font-size: 0.875em;
  font-weight: 400;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  backface-visibility: hidden;
  cursor: ${props =>
    props.styleType === "disabled" || props.styleType === "disabledFilled"
      ? "not-allowed"
      : "pointer"};
  border-radius: 2px;
  appearance: none;
  background: none;
  border: 0;
  box-shadow: none;
  text-decoration: none;
  user-select: none;
  color: ${props => (props.labelColor ? props.labelColor : color)};
  ${props =>
    props.styleType === "raised"
      ? `box-shadow: ${props.theme.boxShadow.button};`
      : null};
  ${props =>
    props.styleType === "disabled" || props.styleType === "disabledFilled"
      ? "opacity: .7;"
      : null};
  background-color: ${props => (props.bgColor ? props.bgColor : bgColor)};
  -webkit-font-smoothing: inherit;
  svg {
    fill: ${props => (props.labelColor ? props.labelColor : color)};
  }
  &:hover,
  &:focus {
    color: ${props =>
      props.labelHoverColor ? props.labelHoverColor : hoverColor};
    background-color: ${props =>
      props.bgHoverColor ? props.bgHoverColor : bgHoverColor};
    ${props =>
      props.styleType === "raiseOnHover"
        ? `box-shadow: ${props.theme.boxShadow.button};`
        : null};
    svg {
      fill: ${props =>
        props.labelHoverColor ? props.labelHoverColor : hoverColor};
    }
  }
  &:focus {
    outline-offset: 2px;
    outline: dotted 1px rgb(59, 153, 252);
  }
  ${p => (p.mediaQuery ? p.mediaQuery : null)};
`;

const Button = props => {
  return (
    <StyledBtn
      ref={props.buttonRef}
      autoFocus={props.autoFocus}
      bgColor={props.bgColor}
      bgHoverColor={props.bgHoverColor}
      className={props.className}
      data-testid={props["data-testid"]}
      dense={props.dense}
      id={props.id}
      label={props.label}
      labelColor={props.labelColor}
      labelHoverColor={props.labelHoverColor}
      mediaQuery={props.mediaQuery}
      name={props.name}
      onBlur={props.onBlur}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseUp={props.onMouseUp}
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
      style={props.style}
      title={props.title}
      type={props.htmlType}
      styleType={props.type}
    >
      {props.label}
      {props.children}
    </StyledBtn>
  );
};

Button.propTypes = {
  /** Boolean that sets whether or not the button gains focus when rendered */
  autoFocus: propTypes.bool,
  /** CSS-consumable string (hex, rgba, etc) color declaration for button background*/
  bgColor: propTypes.string,
  /** CSS-consumable string (hex, rgba, etc) color declaration for button background on hover */
  bgHoverColor: propTypes.string,
  /** React element(s) to display in the button - intended to be text or text and icon (can be any react element) */
  children: propTypes.node,
  /** CSS classname to add to component if needed */
  className: propTypes.string,
  /**html data- attribute to add a testid to the butons dom markup */
  "data-testid": propTypes.string,
  /** Boolean that sets whether or not the button has 'dense' or regular sizing and spacing */
  dense: propTypes.bool,
  /** HTML value for the button type (submit, button) */
  htmlType: propTypes.oneOf(["button", "submit", "reset"]),
  /** CSS/HTML ID element to add to component if needed */
  id: propTypes.string,
  /** Ref (functional) that targets the button's html/dom node */
  buttonRef: propTypes.func,
  /** String or react element to be displayed in button -- meant to be text or an icon */
  label: propTypes.oneOfType([propTypes.string, propTypes.node]).isRequired,
  /** CSS-consumable string (hex, rgba, etc) color declaration for label color */
  labelColor: propTypes.string,
  /** CSS-consumable string (hex, rgba, etc) color declaration for label color on hover */
  labelHoverColor: propTypes.string,
  /** CSS-consumable string (@media...) media-query declaration */
  mediaQuery: propTypes.string,
  /** HTML name property - allows for the dom to track for accesibility reasons */
  name: propTypes.string,
  /** Function that will trigger when focus leaves the component */
  onBlur: propTypes.func,
  /** Function that will trigger when the component is clicked */
  onClick: propTypes.func.isRequired,
  /** Function that will trigger when the component gains focus */
  onFocus: propTypes.func,
  /** Function that will trigger when the user presses down on the mouse button */
  onMouseDown: propTypes.func,
  /** Function that triggers when the cursor enters the component */
  onMouseEnter: propTypes.func,
  /** Function that triggers when the cursor leaves the component */
  onMouseLeave: propTypes.func,
  /** Function that will trigger when the user depresses the mouse button */
  onMouseUp: propTypes.func,
  /** Function that will trigger at the start of a user (on touch devices) touching the element */
  onTouchStart: propTypes.func,
  /** Function that will trigger at the end of a user (on touch devices) touching the element */
  onTouchEnd: propTypes.func,
  /** Object that accepts an inline css style object to customize the look and feel of the component */
  style: propTypes.object,
  /**string that sets the title to that displays on hover of the button */
  title: propTypes.string,
  /** String that maps to one of 'raised', 'raiseOnHover', 'filled', 'inverted', 'error', 'errorFilled', 'disabled', 'disabledFilled', 'flat', and defaults to flat -- used to control presentational type of button */
  type: propTypes.oneOf([
    "raised",
    "raiseOnHover",
    "filled",
    "inverted",
    "error",
    "errorFilled",
    "disabled",
    "disabledFilled",
    "flat",
  ]),
};

export default Button;
