import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StepWrapper = styled.div`
  position: ${p => (p.justifyLabelsToBottom ? "relative" : null)};
  display: flex;
  flex: ${p => (p.justifyLabelsToBottom ? "1 1 auto" : null)};
  flex-direction: ${p => (p.orientation === "vertical" ? "column" : "row")};
  justify-content: ${p => (p.justifyLabelsToBottom ? "center" : null)};
  padding-left: ${p =>
    p.orientation === "horizontal" ? `${p.theme.sizing.base}px` : null};
  padding-right: ${p =>
    p.orientation === "horizontal" ? `${p.theme.sizing.base}px` : null};
  padding-bottom: ${p =>
    p.orientation === "vertical"
      ? p.justifyLabelsToBottom
        ? null
        : "8px"
      : null};
  margin-bottom: ${p =>
    p.orientation === "vertical"
      ? p.justifyLabelsToBottom
        ? "48px"
        : null
      : null};
  &:first-child {
    padding-left: ${p =>
      p.orientation === "horizontal"
        ? p.justifyLabelsToBottom
          ? null
          : "0"
        : null};
  }
  &:last-child {
    padding-right: ${p =>
      p.orientation === "horizontal"
        ? p.justifyLabelsToBottom
          ? null
          : "0"
        : null};
  }
`;

const Step = props => {
  const {
    active,
    justifyLabelsToBottom,
    children,
    completed,
    customConnector,
    disabled,
    iconActiveColor,
    iconCompleteColor,
    iconIncompleteColor,
    iconTextColor,
    idx,
    last,
    numberIcons,
    orientation,
    wrapperStyle,
    ...other
  } = props;
  return (
    <StepWrapper
      justifyLabelsToBottom={justifyLabelsToBottom}
      orientation={orientation}
      style={wrapperStyle}
      {...other}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          ...child.props,
          active,
          justifyLabelsToBottom,
          completed,
          disabled,
          icon: child.props.icon ? child.props.icon : idx + 1,
          iconActiveColor,
          iconCompleteColor,
          iconIncompleteColor,
          iconTextColor,
          last,
          numberIcons,
          orientation,
        })
      )}
      {customConnector &&
        justifyLabelsToBottom &&
        !last &&
        React.cloneElement(customConnector, {
          orientation,
          justifyLabelsToBottom,
        })}
    </StepWrapper>
  );
};

Step.propTypes = {
  /** Sets Step and children of Step as active */
  active: PropTypes.bool,
  /** Should be 'Step-' components to ensure proper operation of stepper */
  children: PropTypes.node,
  /** Marks step as completed -- passed to child components */
  completed: PropTypes.bool,
  /** Passed down from Stepper component if justifyLabelsToBottom is also set */
  customConnector: PropTypes.element,
  /** Step displays as 'disabled' -- passed to child components */
  disabled: PropTypes.bool,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when actove **/
  iconActiveColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when complete **/
  iconCompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when incomplete **/
  iconIncompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the text color of the icon **/
  iconTextColor: PropTypes.string,
  /** Index set by Stepper parent component, used to track/number children */
  idx: PropTypes.number,
  /** Sets whether label is below or next to the Step Item -- set internally by Stepper component */
  justifyLabelsToBottom: PropTypes.bool,
  /** Passed down from Stepper component -- so the step can evaluate if it needs to add a connector */
  last: PropTypes.bool,
  /** Passed from Stepper component -- sets whether non-active steps will have numbers in them or not */
  numberIcons: PropTypes.bool,
  /** Passed from Stepper component -- sets orientation of stepper */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /** JS style object for the Step wrapper div */
  wrapperStyle: PropTypes.object,
};

Step.defaultProps = {
  active: false,
  completed: false,
  disabled: false,
};

export default Step;
