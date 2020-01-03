import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import colors from "../../theme/colors/colorTheme.js";

const IconLeftWrapper = styled.div`
  align-self: ${p => (p.noLabel ? null : "flex-end")};
  padding-bottom: ${p =>
    p.noLabel ? null : p.helpText ? (p.dense ? "20px" : "28px") : "8px"};
  padding-right: 8px;
  margin-bottom: ${p =>
    p.noLabel
      ? p.dense
        ? p.helpText
          ? null
          : "-12px"
        : p.helpText
        ? null
        : "-8px"
      : null};
  cursor: ${props =>
    props.inputState === "disabled"
      ? "not-allowed"
      : props.active
      ? "pointer"
      : "auto"};
  &:focus {
    outline: dotted 1px rgb(59, 153, 252);
  }
`;

const InputIconLeft = props => {
  const getIconColor = () => {
    let color = colors.base57pct;
    if (props.inputState === "disabled") {
      color = colors.base45pct;
    }
    return color;
  };

  const handleKeyUp = e => {
    if (props.onClick) {
      if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 10) {
        props.onClick(e);
      }
    }
  };

  return (
    <IconLeftWrapper
      data-toggle={props.datepicker}
      active={props.active}
      dense={props.dense}
      helpText={props.helpText}
      inputState={props.inputState}
      noLabel={props.noLabel}
      onClick={props.inputState === "disabled" ? null : props.onClick}
      onKeyUp={props.inputState === "disabled" ? null : handleKeyUp}
      tabIndex={
        props.inputState === "disabled" ? null : props.onClick ? "0" : null
      }
    >
      {props.icon ? <props.icon color={getIconColor()} size={24} /> : null}
      {props.child ? props.child : null}
    </IconLeftWrapper>
  );
};

InputIconLeft.propTypes = {
  active: propTypes.bool,
  child: propTypes.node,
  dense: propTypes.bool,
  helpText: propTypes.bool,
  datepicker: propTypes.bool,
  icon: propTypes.func.isRequired,
  inputState: propTypes.oneOf(["disabled", "error", "primary"]),
  noLabel: propTypes.bool,
  onClick: propTypes.func,
};

export default InputIconLeft;
