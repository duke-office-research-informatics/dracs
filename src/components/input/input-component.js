import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import Input from "./input.js";
import Label from "./label.js";
import HelpText from "./help-text.js";
import InputIconLeft from "./input-icon-left.js";
import InputIconRight from "./input-icon-right.js";

const InputComponentWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  width: ${p => p.width};
  cursor: ${p => (p.inputState === "disabled" ? "not-allowed" : "auto")};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 40px;
`;

class InputGroup extends React.Component {
  static propTypes = {
    /** only use when no-label is set to true, gives a required label to input via screen-reader **/
    ariaLabel: propTypes.string,
    /** Sets whether or not the input gains focus automatically on initial mount */
    autoFocus: propTypes.bool,
    /** Sets whether the input uses the dense (~24px less height overall) layout */
    dense: propTypes.bool,
    /** functional ref that can optionally be passed to the help label */
    helpLabelRef: propTypes.func,
    /** Optional string that displays beneath the input that displays help and error messages */
    helpText: propTypes.oneOfType([propTypes.string, propTypes.object]),
    /** Icon passed as a function that can display to the left of the help text below the input */
    helpIcon: propTypes.func,
    /** sets certain specific data- and touched values that allow input to be used with react-flatpickr */
    datepicker: propTypes.bool,
    /** Value that can be set if the input is 'uncontrolled', should be used instead of the `value` and does not need an `onChange` handler -- this feature should only be used for a -very- good reason, as this component is a controlled component out-of-the-box */
    defaultValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
    /** Icon passed as a function that displays to the left of the input */
    iconLeft: propTypes.func,
    /** A react element that can be passed instead of or with the left icon and renders in the same place */
    iconLeftChild: propTypes.node,
    /** Icon passed as a function that displays to the right of the input */
    iconRight: propTypes.func,
    /** A react element that can be passed instead of or with the right icon and renders in the same place */
    iconRightChild: propTypes.node,
    /** html id attr, falls back to name attr if not passed -- both name and ID are used to correlate labels to the input node for aria/accessibliity **/
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    /** A functional ref that can be passed to the input node from a parent component */
    inputRef: propTypes.func,
    /** Sets whether the input is in an error, disabled, or primary/default state */
    inputState: propTypes.oneOf(["primary", "error", "disabled"]),
    /** A function that can be passed along with the right icon that will be called when the right icon is clicked */
    onIconRightClick: propTypes.func,
    /** A function that can be passed along with the left icon that will be called when the left icon is clicked */
    onIconLeftClick: propTypes.func,
    /** String that sets the text displayed in the floating label */
    labelText: propTypes.string,
    /**Number that sets the HTML maxlength property on the input */
    maxLength: propTypes.number,
    /** String that sets the HTML name attribute of the input, useful for accessibility */
    name: propTypes.string,
    /** Sets whether or not the input has a floating label */
    noLabel: propTypes.bool,
    /** Function that is called when the input node loses focus */
    onBlur: propTypes.func,
    /** Function that is called by a change event in the input -- the component's built-in change handler returns the 1) the input's `name` and 2) the input's `value`*/
    onChange: propTypes.func,
    /** Function called when the input is clicked */
    onClick: propTypes.func,
    /** Function called when the input gains focus */
    onFocus: propTypes.func,
    /** Function that will trigger when the user begins a keypress while the input is focused */
    onKeyDown: propTypes.func,
    /** Function that will trigger when the user ends a keypress while the input is focused */
    onKeyUp: propTypes.func,
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
    /** String that sets the placeholder that will display in the input (when focused with a label, and by default without the label) if the input's value is blank */
    placeholder: propTypes.string,
    /** Sets the HTML read-only attribute on the input, so that the input will display a value but cannot be interacted with by the user to input text */
    readOnly: propTypes.bool,
    /** Sets whether or not the input is required (adds a red asterisk to the label) -- this prop is mostly meant for use when the input is part of an HTML <form> */
    required: propTypes.bool,
    /** Sets the input's HTML `type` attibute */
    type: propTypes.string,
    /** Sets the value of the text displayed in the input */
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    /** CSS-consumable string (px, vw, em, calc(), etc) that sets the component's width */
    width: propTypes.string,
  };

  static defaultProps = {
    inputState: "primary",
  };

  constructor(props) {
    super(props);
    let touched = false;
    if (
      (this.props.value !== "" && this.props.value !== undefined) ||
      (this.props.defaultValue !== undefined &&
        this.props.defaultValue !== "") ||
      this.props.datepicker
    ) {
      touched = true;
    }
    this.state = {
      isTouched: touched,
      isFocused: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.value !== this.props.value &&
      this.props.value === "" &&
      !this.props.datepicker
    ) {
      this.setState({ isTouched: false });
    } else if (
      prevProps.value !== this.props.value &&
      this.props.value !== ""
    ) {
      this.setState({ isTouched: true });
    }
  }

  handleChange = e => {
    if (e.target.value !== "") {
      this.setState({
        isTouched: true,
      });
    } else {
      this.setState({
        isTouched: false,
      });
    }

    if (this.props.onChange) {
      this.props.onChange(e.target.value, e.target.name, e);
    }
  };

  handleFocus = e => {
    this.setState({
      isFocused: true,
    });
    if (this.props.onFocus) this.props.onFocus(e);
  };

  handleBlur = e => {
    this.setState({
      isFocused: false,
    });
    if (this.props.onBlur) this.props.onBlur(e);
  };

  render() {
    return (
      <InputComponentWrapper
        inputState={this.props.inputState}
        width={this.props.width}
      >
        {this.props.iconLeft ? (
          <InputIconLeft
            active={this.props.onIconLeftClick ? true : false}
            child={this.props.iconLeftChild}
            dense={this.props.dense}
            datepicker={this.props.datepicker}
            helpText={this.props.helpText || this.props.helpIcon ? true : false}
            icon={this.props.iconLeft}
            inputState={this.props.inputState}
            noLabel={this.props.noLabel}
            onClick={this.props.onIconLeftClick}
          />
        ) : null}
        <InputWrapper>
          <Label
            dense={this.props.dense}
            htmlFor={this.props.id ? this.props.id : this.props.name}
            inputState={this.props.inputState}
            isFocused={this.state.isFocused}
            isTouched={this.state.isTouched}
            noLabel={this.props.noLabel}
            required={this.props.required}
            value={this.props.labelText}
          />
          <Input
            ariaLabel={this.props.ariaLabel}
            autoFocus={this.props.autoFocus}
            datepicker={this.props.datepicker}
            defaultValue={this.props.defaultValue}
            dense={this.props.dense}
            iconRight={this.props.iconRight ? true : false}
            id={this.props.id}
            inputRef={this.props.inputRef}
            inputState={this.props.inputState}
            isFocused={this.state.isFocused}
            name={this.props.name}
            maxLength={this.props.maxLength}
            noLabel={this.props.noLabel}
            onBlur={this.handleBlur}
            onClick={this.props.onClick}
            onChange={this.props.defaultValue ? null : this.handleChange}
            onFocus={this.handleFocus}
            onKeyDown={this.props.onKeyDown}
            onKeyUp={this.props.onKeyUp}
            onMouseDown={this.props.onMouseDown}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            onMouseUp={this.props.onMouseUp}
            onTouchStart={this.props.onTouchStart}
            onTouchEnd={this.props.onTouchEnd}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            tabIndex="0"
            type={this.props.type}
            required={this.props.required}
            value={this.props.value}
          />
          {this.props.iconRight || this.props.iconRightChild ? (
            <InputIconRight
              active={this.props.onIconRightClick ? true : false}
              child={this.props.iconRightChild}
              datepicker={this.props.datepicker}
              dense={this.props.dense}
              icon={this.props.iconRight}
              inputState={this.props.inputState}
              noLabel={this.props.noLabel}
              onClick={this.props.onIconRightClick}
            />
          ) : null}
          <HelpText
            dense={this.props.dense}
            helpLabelRef={this.props.helpLabelRef}
            htmlFor={this.props.id ? this.props.id : this.props.name}
            icon={this.props.helpIcon}
            inputState={this.props.inputState}
            noLabel={this.props.noLabel}
            value={this.props.helpText}
          />
        </InputWrapper>
      </InputComponentWrapper>
    );
  }
}

export default InputGroup;
