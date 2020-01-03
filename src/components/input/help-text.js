import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import colors from "../../theme/colors/colorTheme.js";
import { help, helpPadding } from "./input_style_maps.js";

const HelpLabel = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${help};
  font-size: 12px;
  pointer-events: none;
  padding: ${p => (p.noLabel ? (p.dense ? "4px 0 0 0" : 0) : helpPadding)};
  padding-left: ${p => (p.textAreaHelp ? "2px" : null)};
`;

const HelpIcon = styled.span`
  display: inline-block;
  margin-right: 2px;
  width: 12px;
  height: 12px;
`;

const HelpText = props => {
  const getIconColor = () => {
    let color = colors.base57pct;
    if (props.inputState === "disabled") {
      color = colors.base45pct;
    } else if (props.inputState === "error") {
      color = colors.error87pct;
    }
    return color;
  };
  return (
    <HelpLabel
      dense={props.dense}
      id={`${props.htmlFor}-statusText`}
      innerRef={props.helpLabelRef}
      inputState={props.inputState}
      isFocused={props.isFocused}
      isTouched={props.isTouched}
      noLabel={props.noLabel}
      role="status"
      textAreaHelp={props.textAreaHelp}
    >
      {props.icon ? (
        <HelpIcon>
          <props.icon color={getIconColor()} size={12} />
        </HelpIcon>
      ) : null}
      {props.value}
    </HelpLabel>
  );
};

HelpText.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.object]),
  helpLabelRef: propTypes.func,
  htmlFor: propTypes.string,
  isFocused: propTypes.bool,
  isTouched: propTypes.bool,
  inputState: propTypes.oneOf(["disabled", "error", "primary"]),
  dense: propTypes.bool,
  icon: propTypes.func,
  noLabel: propTypes.bool,
  textAreaHelp: propTypes.bool,
};

export default HelpText;
