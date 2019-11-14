import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import Label from "../label.js";
import HelpText from "../help-text.js";
import {
  text,
  placeholder,
  textareaBorder,
  textareaBorderFocus,
} from "../input_style_maps.js";

const ComponentWrapper = styled.div`
  width: ${p => (p.width ? p.width : "100%")};
  cursor: ${p => (p.inputState === "disabled" ? "not-allowed" : "auto")};
  background-color: ${p =>
    p.inputState === "disabled" ? p.theme.colors.dashBG : p.theme.colors.bg};
`;

const TextareaWrapper = styled.div`
  position: relative;
  padding: ${p => (p.isFocused ? "19px 0 0 0" : "20px 0 0 0")};

  height: ${p => (p.height ? p.height : "auto")};
  width: 100%;
  background-color: ${p =>
    p.inputState === "disabled" ? p.theme.colors.dashBG : p.theme.colors.bg};
  border: ${p => (p.isFocused ? textareaBorderFocus : textareaBorder)};
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextareaInput = styled.textarea.attrs({
  disabled: props => (props.inputState === "disabled" ? true : false),
  required: props => props.required,
  readOnly: props => props.readOnly,
  type: props => props.type,
})`
  padding: ${p => (p.isFocused ? "0 7px 7px 7px" : "0 8px 8px 8px")};
  min-height: 64px;
  height: 100%;
  width: 100%;
  color: ${text};
  resize: none;
  overflow: auto;
  border-radius: 4px;
  border: none;
  background-color: ${p =>
    p.inputState === "disabled" ? p.theme.colors.dashBG : p.theme.colors.bg};
  cursor: ${p => (p.inputState === "disabled" ? "not-allowed" : "auto")};
  box-sizing: border-box;
  &::placeholder {
    color: transparent;
  }
  &:focus {
    outline: none;
    &::placeholder {
      color: ${placeholder};
    }
  }
  &:required {
    box-shadow: none;
  }
`;

class TextArea extends React.Component {
  static propTypes = {
    /** Sets whether or not the input gains focus automatically on initial mount */
    autoFocus: propTypes.bool,
    /** Optional string that displays beneath the textarea that displays help and error messages */
    helpText: propTypes.string,
    /** Icon passed as a function that can display to the left of the help text below the textarea */
    helpIcon: propTypes.func,
    /** html id attr, falls back to name attr if not passed -- both name and ID are used to correlate labels to the input node for aria/accessibliity **/
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    /** A functional ref that can be passed to the input node from a parent component */
    inputRef: propTypes.func,
    /** Sets whether the textarea is in an error, disabled, or primary/default state */
    inputState: propTypes.oneOf(["primary", "error", "disabled"]),
    /** String that sets the text displayed in the floating label */
    labelText: propTypes.string.isRequired,
    /**Number that sets the HTML maxlength property on the input */
    maxLength: propTypes.number,
    /** String that sets the HTML name attribute of the textarea, useful for accessibility */
    name: propTypes.string.isRequired,
    /** Function that is called when the textarea node loses focus */
    onBlur: propTypes.func,
    /** Function that is called by a change event in the textarea -- the component's built-in change handler returns the 1) the textarea's `name` and 2) the textarea's `value`*/
    onChange: propTypes.func.isRequired,
    /** Function called when the textarea is clicked */
    onClick: propTypes.func,
    /** Function called when the textarea gains focus */
    onFocus: propTypes.func,
    /** Function that will trigger when the user begins a keypress while the textarea is focused */
    onKeyDown: propTypes.func,
    /** Function that will trigger when the user ends a keypress while the textarea is focused */
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
    /** String that sets the placeholder that will display in the textarea (when focused with a label, and by default without the label) if the textarea's value is blank */
    placeholder: propTypes.string,
    /** Sets the HTML read-only attribute on the textarea, so that the textarea will display a value but cannot be interacted with by the user to textarea text */
    readOnly: propTypes.bool,
    /** Sets whether or not the textarea is required (adds a red asterisk to the label) -- this prop is mostly meant for use when the textarea is part of an HTML <form> */
    required: propTypes.bool,
    /** Sets the textarea's HTML `type` attibute */
    type: propTypes.string,
    /** Sets the value of the text displayed in the textarea */
    value: propTypes.string,
    /** CSS-consumable string (px, vw, em, calc(), etc) that sets the component's height */
    height: propTypes.string,
    /** CSS-consumable string (px, vw, em, calc(), etc) that sets the component's width */
    width: propTypes.string,
    /** Style object for the component wrapper */
    wrapperStyle: propTypes.object,
  };

  static defaultProps = {
    value: "",
    inputState: "primary",
  };

  constructor(props) {
    super(props);
    let touched = false;
    if (this.props.value !== "") {
      touched = true;
    }
    this.state = {
      currentValue: this.props.value,
      isTouched: touched,
      isFocused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isFocused && nextProps.value !== this.state.currentValue) {
      this.setState({ isTouched: true, currentValue: nextProps.value });
    }
    if (nextProps.value !== this.props.value && nextProps.value === "") {
      this.setState({ isTouched: false });
    }
  }

  handleChange = e => {
    if (e.target.value !== "") {
      this.setState({
        isTouched: true,
        currentValue: e.target.value,
      });
    } else {
      this.setState({
        isTouched: false,
        currentValue: "",
      });
    }

    if (this.props.onChange) {
      this.props.onChange(e.target.value, e.target.name);
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
      <ComponentWrapper
        inputState={this.props.inputState}
        width={this.props.width}
        style={this.props.wrapperStyle}
      >
        <TextareaWrapper
          onClick={this.props.onClick}
          height={this.props.height}
          inputState={this.props.inputState}
          isFocused={this.state.isFocused}
          isTouched={this.state.isTouched}
          onMouseDown={this.props.onMouseDown}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          onMouseUp={this.props.onMouseUp}
          onTouchStart={this.props.onTouchStart}
          onTouchEnd={this.props.onTouchEnd}
        >
          <Label
            value={this.props.labelText}
            htmlFor={this.props.id ? this.props.id : this.props.name}
            isFocused={this.state.isFocused}
            isTouched={this.state.isTouched}
            inputState={this.props.inputState}
            required={this.props.required}
            textAreaLabel
          />
          <TextareaInput
            aria-controls={
              this.props.id
                ? `${this.props.id}-statusText`
                : `${this.props.name}-statusText`
            }
            autoFocus={this.props.autoFocus}
            id={this.props.id ? this.props.id : this.props.name}
            innerRef={this.props.inputRef}
            value={this.state.currentValue}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.props.onKeyDown}
            onKeyUp={this.props.onKeyUp}
            isFocused={this.state.isFocused}
            maxLength={this.props.maxLength}
            name={this.props.name}
            placeholder={this.props.placeholder}
            inputState={this.props.inputState}
            type={this.props.type}
            readOnly={this.props.readOnly}
            required={this.props.required}
            tabIndex="0"
          />
        </TextareaWrapper>
        <HelpText
          dense
          value={this.props.helpText}
          htmlFor={this.props.id ? this.props.id : this.props.name}
          icon={this.props.helpIcon}
          inputState={this.props.inputState}
          textAreaHelp
        />
      </ComponentWrapper>
    );
  }
}

export default TextArea;
