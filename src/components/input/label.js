import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import {
  label,
  labelFocus,
  labelTop,
  labelTopFocus,
} from "./input_style_maps.js";

const LabelField = styled.label`
  display: inline-block;
  position: absolute;
  color: ${props => (props.isFocused ? labelFocus : label)};
  top: ${props =>
    props.textAreaLabel
      ? props.isFocused || props.isTouched
        ? "2px"
        : "12px"
      : props.isFocused || props.isTouched
        ? labelTopFocus
        : labelTop};
  left: ${p => (p.textAreaLabel ? "8px" : null)};
  font-size: ${props => (props.isFocused || props.isTouched ? "12px" : "16px")};
  pointer-events: none;
  position: absolute;
  transform: ${p =>
    p.textAreaLabel ? null : "translate3d(0, 24px, 0) scale( 1 )"};
  transform-origin: left top;
  transition: 340ms;
  cursor: ${p => (p.inputState === "disabled" ? "not-allowed" : "auto")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
`;

const Label = props => {
  if (props.noLabel) {
    return null;
  } else {
    return (
      <LabelField
        isFocused={props.isFocused}
        isTouched={props.isTouched}
        htmlFor={props.htmlFor}
        inputState={props.inputState}
        dense={props.dense}
        textAreaLabel={props.textAreaLabel}
      >
        {props.value}
        {props.required ? (
          <span style={{ color: "hsla(15,100%,40%,0.5)", marginLeft: "2px" }}>
            *
          </span>
        ) : null}
      </LabelField>
    );
  }
};

Label.propTypes = {
  value: propTypes.string,
  htmlFor: propTypes.string,
  noLabel: propTypes.bool,
  isFocused: propTypes.bool,
  isTouched: propTypes.bool,
  inputState: propTypes.oneOf(["disabled", "error", "primary"]),
  dense: propTypes.bool,
  required: propTypes.bool,
  textAreaLabel: propTypes.bool,
};

export default Label;
