import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const RadioGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

class RadioGroup extends React.Component {
  static propTypes = {
    /** React element that renders as a child of radio group -- generally RadioButton */
    children: propTypes.node,
    /** Boolean that sets whether or not the entire radio group is disabled */
    disabled: propTypes.bool,
    /** Function that is called on change of any child component that has an onChange handler */
    onChange: propTypes.func,
    /** String or Number that sets the value on which a pressed radio button will be set to checked */
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    /** String that sets the HTML name attripbute of the radio group -- helpful for accessiblity and dom traversal */
    name: propTypes.string.isRequired,
    /**CSS classname for radio group wrapper */
    wrapperClassName: propTypes.string,
    /** CSS inline-style object to manipulate the style of the outer wrapper */
    wrapperStyle: propTypes.object,
  };

  handleChange = value => {
    if (this.props.onChange) this.props.onChange(value, this.props.name);
  };

  renderRadioButtons = () => {
    return React.Children.map(this.props.children, child =>
      !child.props.isRadioButton
        ? child
        : React.cloneElement(child, {
            checked: child.props.value === this.props.value,
            disabled: this.props.disabled || child.props.disabled,
            onChange: this.handleChange.bind(this, child.props.value),
          })
    );
  };

  render() {
    return (
      <RadioGroupWrap
        aria-activedescendant={this.props.value}
        className={this.props.wrapperClassName}
        name={this.props.name}
        style={this.props.wrapperStyle}
        tabindex="0"
      >
        {this.renderRadioButtons()}
      </RadioGroupWrap>
    );
  }
}

export default RadioGroup;
