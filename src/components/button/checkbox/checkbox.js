import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import IconCheckbox from "./check_box.svg";
import IconCheckboxOutline from "./check_box_outline.svg";
import IconCheckboxDisabled from "./check_box_disabled.svg";
import IconCheckboxOutlineDisabled from "./check_box_outline_disabled.svg";
import IconCheckboxIndeterminate from "./check_box_indeterminate.svg";

const CheckboxInput = styled.input.attrs(props => ({
  disabled: props.disabled ? true : false,
  checked: props.checked ? true : false,
}))``;

const CheckboxWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 24px;
  min-width: 24px;
  margin-right: 4px;
  vertical-align: top;
  line-height: 0px;
  input[type="checkbox"] {
    opacity: 0;
  }
  input[type="checkbox"]:focus + label::before {
    outline-offset: 2px;
    outline: dotted 1px rgb(59, 153, 252);
  }
  input[type="checkbox"] + label {
    position: absolute;
    left: 0px;
    top: 2px;
    display: inline-block;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${IconCheckbox});
  }
  input[type="checkbox"] + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${IconCheckboxOutline});
  }
  input[type="checkbox"]:not(:checked):disabled + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${IconCheckboxOutlineDisabled});
  }
  input[type="checkbox"]:not(:checked):disabled + label {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${IconCheckboxOutlineDisabled});
    cursor: not-allowed;
  }
  input[type="checkbox"]:disabled + label:before {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${IconCheckboxDisabled});
  }
  input[type="checkbox"]:disabled + label {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${IconCheckboxDisabled});
    cursor: not-allowed;
  }
  input[type="checkbox"]:indeterminate + label {
    content: " ";
    display: inline-block;
    height: 24px;
    width: 24px;
    background: url(${IconCheckboxIndeterminate});
  }
`;

const ElWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4px 0;
`;

const BoxLabelWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const CheckboxLabel = styled.span`
  cursor: ${p =>
    p.disabled ? "not-allowed" : p.changeOnLabelClick ? "pointer" : null};
  margin-top: 2px;
  color: ${props =>
    props.disabled ? props.theme.colors.muted : props.theme.colors.base};
  &:hover {
    text-decoration: ${p => (p.underlineLabelOnHover ? "underline" : null)};
  }
`;

class Checkbox extends React.Component {
  static propTypes = {
    /** Boolean that sets whether or not you can call the onChange handler for the checkbox on the click of the label */
    changeOnLabelClick: propTypes.bool,
    /** Boolean that sets whether or not the checkbox is checked */
    checked: propTypes.bool.isRequired,
    /** React element that displays after the checkbox label */
    children: propTypes.node,
    /** Boolean that sets whether or not the checkbox is disabled (which sets the html disabled attribute and changes the svg) */
    disabled: propTypes.bool,
    /** Boolean that sets whtehter or not the checkbox is indterminate */
    indeterminate: propTypes.bool,
    /** String or React element that serves as the label for the checkbox element */
    label: propTypes.oneOfType([propTypes.string, propTypes.node]),
    /** Object that accepts an inline css style object to customize the look and feel of the checkbox label */
    labelStyle: propTypes.object,
    /** String that describes the HTML name element -- essential for setting the ARIA label and accessibility DOM settings */
    name: propTypes.oneOfType([
      propTypes.string.isRequired,
      propTypes.number.isRequired,
    ]),
    /** Function that will trigger when focus leaves the component */
    onBlur: propTypes.func,
    /** Function that will trigger when the component is clicked/changed */
    onChange: propTypes.func,
    /** Function that will trigger when the component gains focus */
    onFocus: propTypes.func,
    /** Function that triggers when the cursor enters the component */
    onMouseEnter: propTypes.func,
    /** Function that triggers when the cursor leaves the component */
    onMouseLeave: propTypes.func,
    /** Object that accepts an inline css style object to customize the look and feel of the component */
    style: propTypes.object,
    /** Boolean that sets whether or not the text in the checkbox label will become underlined on hover */
    underlineLabelOnHover: propTypes.bool,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
  };

  handleToggle = e => {
    if (e.pageX !== 0 && e.pageY !== 0) this.blur();
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, this.props.name, e);
    }
  };

  handleKeydown = e => {
    if (e.keyCode === 32) this.handleToggle(e);
  };

  blur = () => {
    if (this.inputNode) this.inputNode.blur();
  };

  focus = () => {
    if (this.inputNode) this.inputNode.focus();
  };

  render() {
    const {
      changeOnLabelClick,
      checked,
      children,
      disabled,
      indeterminate,
      label,
      name,
      style,
      labelStyle,
      onBlur,
      onFocus,
      underlineLabelOnHover, // eslint-disable-line
      onMouseEnter,
      onMouseLeave,
      ...others
    } = this.props;
    return (
      <ElWrap style={style}>
        <BoxLabelWrap>
          <CheckboxWrapper
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <CheckboxInput
              {...others}
              aria-labelledby={label ? `${name}-label` : null}
              checked={checked}
              disabled={disabled}
              id={name}
              indeterminate={indeterminate}
              ref={node => (this.inputNode = node)}
              name={name}
              onBlur={onBlur}
              onChange={() => {}}
              onClick={this.handleToggle}
              onFocus={onFocus}
              onKeyDown={this.handleKeydown}
              type="checkbox"
            />
            <label htmlFor={name} aria-checked={checked} />
          </CheckboxWrapper>
          {label ? (
            <CheckboxLabel
              changeOnLabelClick={changeOnLabelClick}
              onClick={changeOnLabelClick ? this.handleToggle : null}
              style={labelStyle}
              id={`${name}-label`}
              underlineLabelOnHover={underlineLabelOnHover}
              disabled={disabled}
            >
              {label}
            </CheckboxLabel>
          ) : null}
        </BoxLabelWrap>
        {children}
      </ElWrap>
    );
  }
}

export default Checkbox;
