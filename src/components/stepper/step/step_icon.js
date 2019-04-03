import React from "react";
import PropTypes from "prop-types";
import IconCheckCircle from "../../../icons/check_circle/icon.js";
import StepPositionIcon from "./step_position_icon";

const StepIcon = props => {
  const {
    active,
    completed,
    icon,
    iconCompleteColor,
    iconIncompleteColor,
    iconTextColor,
    numberIcons,
  } = props;
  if (typeof icon === "number" || typeof icon === "string") {
    if (completed) {
      return <IconCheckCircle color={props.iconCompleteColor} />;
    }
    return (
      <StepPositionIcon
        active={active}
        iconCompleteColor={iconCompleteColor}
        iconIncompleteColor={iconIncompleteColor}
        iconTextColor={iconTextColor}
        numberIcons={numberIcons}
        position={icon}
      />
    );
  }
  return icon;
};

StepIcon.propTypes = {
  /** Sets whether the step is active -- passed from parent */
  active: PropTypes.bool,
  /** Sets whether the step is completed -- passed from parent */
  completed: PropTypes.bool,
  /** Icon displayed by stepLabel */
  icon: PropTypes.node.isRequired,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when incomplete **/
  iconCompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when complete **/
  iconIncompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when complete **/
  iconTextColor: PropTypes.string,
  /** Sets whether default position icon displays numbers */
  numberIcons: PropTypes.bool,
};

StepIcon.defaultProps = {
  active: false,
  completed: false,
};

export default StepIcon;
