import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import {
  text,
  border,
  borderFocus,
  placeholder,
  inputMargin,
  inputLineHeight,
  inputHeight,
  elFontsize,
} from "./input_style_maps.js";

const InputField = styled.input.attrs(props => ({
  disabled: props.inputState === "disabled" ? true : false,
  pattern: props.pattern,
  readOnly: props.readOnly ? "readonly" : false,
  required: props.required,
  type: props.type,
}))`
  box-sizing: border-box;
  display: block;
  color: ${text};
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  padding-right: ${props => (props.iconRight ? "24px" : null)};
  margin: ${inputMargin};
  transition: border-bottom padding-bottom ease-in-out 0.2s;
  border-bottom: ${border};
  padding-bottom: ${props => (props.isFocused ? "0px" : "1px")};
  font-size: ${elFontsize};
  line-height: ${inputLineHeight};
  height: ${inputHeight};
  border-radius: 0px;
  cursor: ${p =>
    p.inputState === "disabled"
      ? "not-allowed"
      : p.datePicker
      ? "pointer"
      : "auto"};
  &::placeholder {
    font-weight: 400;
    color: ${props =>
      props.noLabel
        ? placeholder
        : props.datepicker
        ? placeholder
        : "transparent"};
    transition: 240ms;
  }
  &:focus {
    border-bottom: ${borderFocus};
    &::placeholder {
      color: ${placeholder};
    }
  }
  &::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  &:invalid {
    box-shadow: none;
  }
`;

const Input = props => {
  return (
    <InputField
      aria-controls={
        props.id ? `${props.id}-statusText` : `${props.name}-statusText`
      }
      aria-label={props.ariaLabel ? props.ariaLabel : null}
      autoFocus={props.autoFocus}
      data-input={props.datepicker}
      data-lpignore={props.type !== "password" ? true : false}
      datepicker={props.datepicker}
      defaultValue={props.defaultValue}
      dense={props.dense}
      iconRight={props.iconRight}
      id={props.id ? props.id : props.name}
      ref={props.inputRef}
      inputState={props.inputState}
      isFocused={props.isFocused}
      isTouched={props.isTouched}
      maxLength={props.maxLength}
      name={props.name}
      noLabel={props.noLabel}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseUp={props.onMouseUp}
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
      onPaste={props.onPaste}
      pattern={props.pattern}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      required={props.required}
      tabIndex="0"
      type={props.type}
      value={props.value}
    />
  );
};

Input.propTypes = {
  ariaLabel: propTypes.string,
  id: propTypes.oneOfType([propTypes.string, propTypes.number]),
  datepicker: propTypes.bool,
  autoFocus: propTypes.bool,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  defaultValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  placeholder: propTypes.string,
  maxLength: propTypes.number,
  name: propTypes.string,
  onChange: propTypes.func,
  onClick: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  onKeyUp: propTypes.func,
  onKeyDown: propTypes.func,
  onMouseDown: propTypes.func,
  onMouseEnter: propTypes.func,
  onMouseLeave: propTypes.func,
  onMouseUp: propTypes.func,
  onTouchStart: propTypes.func,
  onTouchEnd: propTypes.func,
  onPaste: propTypes.func,
  pattern: propTypes.string,
  inputRef: propTypes.func,
  noLabel: propTypes.bool,
  isFocused: propTypes.bool,
  isTouched: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  inputState: propTypes.oneOf(["disabled", "error", "primary"]),
  type: propTypes.string,
  dense: propTypes.bool,
  iconRight: propTypes.bool,
};

export default Input;
