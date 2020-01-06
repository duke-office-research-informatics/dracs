import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const ActionBtn = styled.button.attrs(props => ({
  disabled: props.disabled ? true : false,
}))`
  align-items: center;
  margin: 4px;
  transition: all 0.2s ease-in-out;
  opacity: 0.4;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  &:hover,
  &:focus {
    opacity: ${p => (p.disabled ? null : 1)};
  }
  &:focus {
    outline-offset: 2px;
    outline: dotted 1px rgb(59, 153, 252);
  }
  ${p => (p.mediaQuery ? p.mediaQuery : null)};
`;

const ActionButton = props => {
  return (
    <ActionBtn
      autoFocus={props.autoFocus}
      buttonRef={props.buttonRef}
      className={props.className}
      data-testid={props["data-testid"]}
      disabled={props.disabled}
      mediaQuery={props.mediaQuery}
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
    >
      {props.children}
    </ActionBtn>
  );
};

ActionButton.propTypes = {
  /** Boolean that sets whether or not the button gains focus when rendered */
  autoFocus: propTypes.bool,
  /** Ref for button */
  buttonRef: propTypes.func,
  /** React element(s) to display in the button - intended to be an icon */
  children: propTypes.node,
  /** CSS classname to add to component if needed */
  className: propTypes.string,
  /**html data- attribute to add a testid to the action butons dom markup */
  "data-testid": propTypes.string,
  /** Boolean that sets whether or not the button is disabled (including setting the HTML disabled property) */
  disabled: propTypes.bool,
  /** HTML value for the button type (submit, button) */
  htmlType: propTypes.oneOf(["button", "submit", "reset"]),
  /** CSS-consumable media query passed as a string */
  mediaQuery: propTypes.string,
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
};

export default ActionButton;
