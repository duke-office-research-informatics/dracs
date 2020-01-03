import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import colors from "../../theme/colors/colorTheme.js";
import { iconRtTop, iconRtTopNoLabel } from "./input_style_maps.js";

const IconRightWrapper = styled.div`
  position: absolute;
  top: ${p => (p.noLabel ? iconRtTopNoLabel : iconRtTop)};
  right: 0;
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

const InputIconRight = props => {
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
    <IconRightWrapper
      data-clear={props.datepicker}
      onBlur={props.inputState === "disabled" ? null : props.onBlur}
      onClick={props.inputState === "disabled" ? null : props.onClick}
      onFocus={props.inputState === "disabled" ? null : props.onFocus}
      onKeyUp={props.inputState === "disabled" ? null : handleKeyUp}
      active={props.active}
      dense={props.dense}
      noLabel={props.noLabel}
      tabIndex={
        props.inputState === "disabled" ? null : props.onClick ? "0" : null
      }
      inputState={props.inputState}
    >
      {props.icon ? (
        <props.icon size={props.dense ? 20 : 24} color={getIconColor()} />
      ) : null}
      {props.child ? props.child : null}
    </IconRightWrapper>
  );
};

InputIconRight.propTypes = {
  active: propTypes.bool,
  child: propTypes.node,
  datepicker: propTypes.bool,
  dense: propTypes.bool,
  icon: propTypes.func,
  noLabel: propTypes.bool,
  onClick: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  inputState: propTypes.oneOf(["disabled", "error", "primary"]),
};

export default InputIconRight;
