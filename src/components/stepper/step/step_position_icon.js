import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PositionIcon = styled.svg`
  fill: ${p => (p.active ? p.iconCompleteColor : p.iconIncompleteColor)};
  height: 24px;
  width: 24px;
  vertical-align: top;
`;

const PositionText = styled.text`
  fill: ${p => p.iconTextColor};
  font-size: 0.875em;
  font-family: inherit;
  line-height: 0;
`;

const StepPositionIcon = props => {
  const {
    active,
    iconCompleteColor,
    iconIncompleteColor,
    iconTextColor,
    numberIcons,
    position,
  } = props;

  return (
    <PositionIcon
      active={active}
      iconCompleteColor={iconCompleteColor}
      iconIncompleteColor={iconIncompleteColor}
      viewBox="0 0 24 24"
      aria-label={`icon for stepper position ${position}`}
      role="img"
    >
      <title>stepper position icon</title>
      <desc>{`filled circle indicating a step in position ${position}`}</desc>
      <circle cx="12" cy="12" r="11" />
      {numberIcons ? (
        <PositionText
          x="12"
          y="16"
          textAnchor="middle"
          iconTextColor={iconTextColor}
        >
          {position}
        </PositionText>
      ) : null}
    </PositionIcon>
  );
};

StepPositionIcon.propTypes = {
  /** sets whether the icon shows active styling -- set by parent */
  active: PropTypes.bool,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when incomplete **/
  iconCompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when complete **/
  iconIncompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when complete **/
  iconTextColor: PropTypes.string,
  /** sets whether the Icon shows a position number/text */
  numberIcons: PropTypes.bool,
  /** the step position to be displayed in the icon */
  position: PropTypes.node,
};

StepPositionIcon.defaultProps = {
  numberIcons: false,
};

export default StepPositionIcon;
