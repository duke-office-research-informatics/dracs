import React from "react";
import propTypes from "prop-types";
import { StyledBtn } from "../base/button.js";

const ButtonWithLink = StyledBtn.withComponent("a");

const LinkButton = props => {
  return (
    <ButtonWithLink
      autoFocus={props.autoFocus}
      bgColor={props.bgColor}
      bgHoverColor={props.bgHoverColor}
      className={props.className}
      dense={props.dense}
      href={props.href}
      id={props.id}
      innerRef={props.innerRef}
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
      target={props.target}
      title={props.title}
      type={props.htmlType}
      styleType={props.type}
    >
      {props.label}
      {props.children}
    </ButtonWithLink>
  );
};

LinkButton.propTypes = {
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
  /** Boolean that sets whether or not the button has 'dense' or regular sizing and spacing */
  dense: propTypes.bool,
  /**HTML Href value for the link url */
  href: propTypes.string,
  /** HTML value for the button type (submit, button) */
  htmlType: propTypes.oneOf(["button", "submit", "reset"]),
  /** CSS/HTML ID element to add to component if needed */
  id: propTypes.string,
  /** Ref (functional) that targets the button's html/dom node */
  innerRef: propTypes.func,
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
  onClick: propTypes.func,
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
  /**HTML targe property to specify if link opens in tab, new window, this window, etc */
  target: propTypes.string,
  /** string that is set as the title of the button, generally set on hover by browser */
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

LinkButton.defaultProps = {
  target: "_blank",
};

export default LinkButton;
