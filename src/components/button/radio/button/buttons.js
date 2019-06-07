import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import RadioButtonChecked from "./radio_button_checked.svg";
import RadioButtonUnchecked from "./radio_button_unchecked.svg";
import RadioButtonCheckedDisabled from "./radio_button_checked_disabled.svg";
import RadioButtonUncheckedDisabled from "./radio_button_unchecked_disabled.svg";

const RadioInput = styled.input.attrs({
  disabled: props => (props.disabled ? true : false),
})``;

const RadioWrap = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 24px;
  min-width: 24px;
  margin: 4px;

  input[type="radio"] {
    opacity: 0;
  }
  input[type="radio"]:focus + label::before {
    outline-offset: 2px;
    outline: dotted 1px rgb(59, 153, 252);
  }
  input[type="radio"] + label {
    position: absolute;
    left: 0px;
    top: 0px;
    display: inline-block;
    cursor: pointer;
  }
  input[type="radio"]:checked + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${RadioButtonChecked});
  }
  input[type="radio"] + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${RadioButtonUnchecked});
  }
  input[type="radio"]:checked:disabled + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${RadioButtonCheckedDisabled});
    cursor: not-allowed;
  }
  input[type="radio"]:not(:checked):disabled + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${RadioButtonUncheckedDisabled});
    cursor: not-allowed;
  }
  span {
    margin-left: 24px;
    font-size: 1em;
    color: ${props =>
      props.disabled ? props.theme.colors.muted : props.theme.colors.base};
    cursor: ${p =>
      p.disabled ? "not-allowed" : p.changeOnLabelClick ? "pointer" : null};
  }
`;

const RadioButton = props => {
  const handleCheck = event => {
    if (!props.disabled && !props.checked && props.onChange)
      props.onChange(event);
  };

  return (
    <RadioWrap
      disabled={props.disabled}
      changeOnLabelClick={props.changeOnLabelClick}
    >
      <RadioInput
        aria-labelledby={props.label ? `${props.value}-label` : null}
        aria-checked={props.checked}
        checked={props.checked}
        disabled={props.disabled}
        id={props.value}
        name={props.name}
        onChange={() => {}}
        onClick={handleCheck}
        type="radio"
        value={props.value}
      />
      <label htmlFor={props.value} />
      {props.label ? (
        <span
          className={props.labelClassName}
          style={props.labelStyle}
          onClick={props.changeOnLabelClick ? handleCheck : null}
          id={`${props.value}-label`}
          disabled={props.disabled}
        >
          {props.label}
        </span>
      ) : null}

      {props.children}
    </RadioWrap>
  );
};

RadioButton.propTypes = {
  /** Boolean that sets whether clicking the label will trigger a change in the input */
  changeOnLabelClick: propTypes.bool,
  /** Boolean value that sets whether or not the button is checked (controlled by RadioGroup) */
  checked: propTypes.bool,
  /** React element or string that renders to the right of the component */
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.element,
    propTypes.node,
  ]),
  /** Boolean that sets whether or not the button is disabled */
  disabled: propTypes.bool,
  /** String that acts as a text label for the button */
  label: propTypes.oneOfType([propTypes.string, propTypes.object]),
  /**CSS classname for the label */
  labelClassName: propTypes.string,
  /** CSS style-oject that styles the label */
  labelStyle: propTypes.object,
  /** HTML name atribute */
  name: propTypes.string.isRequired,
  /** Function that is called on input change/click */
  onChange: propTypes.func,
  /** Value that is returned to RadioGroup to evaluate whether the button is active */
  value: propTypes.oneOfType([
    propTypes.string.isRequired,
    propTypes.number.isRequired,
  ]),
};

RadioButton.defaultProps = {
  isRadioButton: true,
};

export default RadioButton;
