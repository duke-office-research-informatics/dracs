import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import styledMap from "styled-map";
import Transition from "react-transition-group/Transition";
import theme from "../../theme/theme.js";

const trackColorActive = styledMap({
  disabled: theme.colors.border,
  default: theme.colors.action,
});

const trackColorInactive = styledMap({
  disabled: theme.colors.border,
  default: theme.colors.muted,
});

const thumbColorActive = styledMap({
  disabled: theme.colors.muted,
  default: theme.colors.darkBlue,
});

const thumbColorInactive = styledMap({
  disabled: theme.colors.muted,
  default: theme.colors.bg,
});

const ElWrap = styled.div`
  display: inline-flex;
  height: 32px;
  align-items: center;
`;

const SwitchLabel = styled.label`
  margin-left: 8px;
  font-size: 0.875em;
  color: ${props =>
    props.disabled ? props.theme.colors.muted : props.theme.colors.base};
  padding-top: 4px;
`;

const SwitchWrap = styled.div`
  display: block;
  position: relative;
  white-space: normal;
  &:focus-within {
    outline-offset: 2px;
    outline: dotted 1px rgb(59, 153, 252);
  }
`;

const SwitchTrack = styled.label`
  display: inline-block;
  border-radius: ${props => props.theme.sizing.base}px;
  height: ${props => props.theme.sizing.base * 1.75}px;
  margin-top: ${props => props.theme.sizing.base / 2}px;
  position: relative;
  vertical-align: top;
  width: ${props => props.theme.sizing.base * 4.5}px;
  background-color: ${props =>
    props.checked ? trackColorActive : trackColorInactive};
  transition: background-color ${p => `${p.delay}ms`} ease-in-out;

  input[type="checkbox"] {
    height: 0;
    opacity: 0;
    overflow: hidden;
    width: 0;
  }
`;

const Thumb = styled.span`
  background-color: ${props =>
    props.checked ? thumbColorActive : thumbColorInactive};
  left: ${props => (props.checked ? props.theme.sizing.base * 2.2 + "px" : 0)};
  border-radius: 50%;
  cursor: pointer;
  height: ${props => props.theme.sizing.base * 2.5}px;
  position: absolute;
  cursor: pointer;
  top: calc(
    (
        ${props => props.theme.sizing.base * 1.7}px -
          ${props => props.theme.sizing.base * 2.5}px
      ) / 2
  );
  transition: left ${p => `${p.delay}ms`} ease-in-out;
  width: ${props => props.theme.sizing.base * 2.5}px;
  box-shadow: ${props =>
    props.checked
      ? props.theme.boxShadow.shadow3px
      : props.theme.boxShadow.shadow2px};
`;

class Switch extends React.Component {
  static propTypes = {
    /** Sets whether or not the switch is checked */
    checked: propTypes.bool,
    /** Number (in miliseconds) that allows for enter/exit animations to render before mount/dismount */
    delay: propTypes.number,
    /** Sets whether or not the switch renders as `disabled`, adds the html `disabled` attribute to the input and changes the cursor */
    disabled: propTypes.bool,
    /** String Label that displays to the right of the switch */
    label: propTypes.string,
    /** HTML name attribute, essential for accessibility */
    name: propTypes.string,
    /** Function called when switch element loses focus */
    onBlur: propTypes.func,
    /** Function called when switch element is checked/unchecked*/
    onChange: propTypes.func,
    /** Function called when switch element gains focus */
    onFocus: propTypes.func,
  };

  static defaultProps = {
    checked: false,
    delay: 280,
    disabled: false,
  };

  handleToggle = () => {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, this.props.name);
    }
  };

  render() {
    return (
      <Transition in={this.props.checked} timeout={this.props.delay}>
        <ElWrap>
          <SwitchWrap>
            <SwitchTrack
              checked={this.props.checked}
              delay={this.props.delay}
              disabled={this.props.disabled}
            >
              <input
                type="checkbox"
                onChange={this.handleToggle}
                name={this.props.name}
                checked={this.props.checked}
                disabled={this.props.disabled}
              />
              <Thumb
                checked={this.props.checked}
                delay={this.props.delay}
                disabled={this.props.disabled}
              />
            </SwitchTrack>
          </SwitchWrap>
          <SwitchLabel htmlFor={this.props.name} disabled={this.props.disabled}>
            {this.props.label}
          </SwitchLabel>
        </ElWrap>
      </Transition>
    );
  }
}

export default Switch;
