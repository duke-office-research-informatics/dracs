import React from "react";
import propTypes from "prop-types";
import { StyledBtn } from "../base/button.js";
import styled from "styled-components";

const ButtonWithLink = styled(StyledBtn).attrs(props => ({ as: "a" }));

class LinkButton extends React.PureComponent {
  render() {
    return (
      <ButtonWithLink
        autoFocus={this.props.autoFocus}
        bgColor={this.props.bgColor}
        bgHoverColor={this.props.bgHoverColor}
        className={this.props.className}
        dense={this.props.dense}
        href={this.props.href}
        id={this.props.id}
        buttonRef={this.props.buttonRef}
        label={this.props.label}
        labelColor={this.props.labelColor}
        labelHoverColor={this.props.labelHoverColor}
        mediaQuery={this.props.mediaQuery}
        name={this.props.name}
        onBlur={this.props.onBlur}
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseDown={this.props.onMouseDown}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseUp={this.props.onMouseUp}
        onTouchStart={this.props.onTouchStart}
        onTouchEnd={this.props.onTouchEnd}
        style={this.props.style}
        target={this.props.target}
        title={this.props.title}
        type={this.props.htmlType}
        styleType={this.props.type}
      >
        {this.props.label}
        {this.props.children}
      </ButtonWithLink>
    );
  }
}

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
