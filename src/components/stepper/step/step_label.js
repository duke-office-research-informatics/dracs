import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StepIcon from "./step_icon.js";

const StepLabelContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${p => (p.justifyLabelsToBottom ? "column" : "row")};
  width: 100%;
`;

const IconContainer = styled.div`
  padding-right: ${p =>
    p.justifyLabelsToBottom ? 0 : `${p.theme.sizing.base}px`};
`;

const LabelContainer = styled.span`
  width: ${p => (p.orientation === "horizontal" ? "100%" : null)};
`;

const LabelText = styled.label`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${p =>
    p.active
      ? p.theme.colors.base
      : p.completed
      ? p.theme.colors.base
      : p.theme.colors.subheading};
  text-align: ${p => (p.justifyLabelsToBottom ? "center" : null)};
  font-size: 0.875em;
  font-weight: ${p => (p.active ? 700 : 400)};
`;

const StepLabel = props => {
  const {
    active,
    children,
    completed,
    disabled,
    justifyLabelsToBottom,
    icon,
    iconActiveColor,
    iconCompleteColor,
    iconIncompleteColor,
    iconTextClassName,
    iconTextColor,
    labelChild,
    labelTextClassname,
    labelStyle,
    last, //eslint-disable-line no-unused-vars
    numberIcons,
    orientation, //eslint-disable-line no-unused-vars
    ...other
  } = props;

  return (
    <StepLabelContainer
      justifyLabelsToBottom={justifyLabelsToBottom}
      disabled={disabled}
      {...other}
    >
      {icon && (
        <IconContainer justifyLabelsToBottom={justifyLabelsToBottom}>
          <StepIcon
            active={active}
            completed={completed}
            icon={icon}
            iconActiveColor={iconActiveColor}
            iconCompleteColor={iconCompleteColor}
            iconIncompleteColor={iconIncompleteColor}
            iconTextClassName={iconTextClassName}
            iconTextColor={iconTextColor}
            justifyLabelsToBottom={justifyLabelsToBottom}
            numberIcons={numberIcons}
          />
        </IconContainer>
      )}
      <LabelContainer orientation={orientation}>
        <LabelText
          active={active}
          className={labelTextClassname}
          completed={completed}
          justifyLabelsToBottom={justifyLabelsToBottom}
          style={labelStyle}
        >
          {children}
        </LabelText>
        {labelChild}
      </LabelContainer>
    </StepLabelContainer>
  );
};

StepLabel.propTypes = {
  /** Sets the layout/styling to active -- passed via parent */
  active: PropTypes.bool,
  /** Generally a string passed to the label, but could be a React element/node */
  children: PropTypes.node,
  /** Sets whether the component has 'completed' styling -- passed in from parent */
  completed: PropTypes.bool,
  /** Sets whether the component has 'disabled' styling -- passed in through parent */
  disabled: PropTypes.bool,
  /** Optional Icon that overrides the default check icon */
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
  ]),
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when actve **/
  iconActiveColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when complete **/
  iconCompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when incomplete **/
  iconIncompleteColor: PropTypes.string,
  /** CSS class for the icon text */
  iconTextClassName: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the text color of the icon **/
  iconTextColor: PropTypes.string,
  /** Sets whether the label is below or to the right of the icon -- passed via parent */
  justifyLabelsToBottom: PropTypes.bool,
  /** Sets whether the component will display styling/layout for being the last item in the stepper */
  last: PropTypes.bool,
  /** Optional child that will display next to the label text */
  labelChild: PropTypes.node,
  /** CSS ClassName for the label */
  labelTextClassname: PropTypes.string,
  /** JS style object for the label */
  labelStyle: PropTypes.object,
  /** Passed from Stepper component -- sets whether non-active steps will have numbers in them or not */
  numberIcons: PropTypes.bool,
  /** sets whether the component displays layout for vertical or horizontal orientation */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /** JS style object for label container */
  wrapperStyle: PropTypes.object,
};

StepLabel.defaultProps = {
  active: false,
  completed: false,
  disabled: false,
  justifyLabelsToBottom: false,
  last: false,
  orientation: "horizontal",
};

export default StepLabel;
