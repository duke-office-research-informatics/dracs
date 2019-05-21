/** This component is inspired by Material-UI's stepper component, and follows many similar patterns.
 Material-UI's MIT license can be found here: https://github.com/mui-org/material-ui/blob/v1-beta/LICENSE */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import Transition from 'react-transition-group/Transition'; ---may or may  not need this
import StepConnector from "./step_connector.js";
import theme from "../../theme/theme.js";

const ComponentWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: ${p => (p.orientation === "horizontal" ? "row" : "column")};
  align-items: ${p =>
    p.justifyLabelsToBottom
      ? p.orientation === "vertical"
        ? "center"
        : "flex-start"
      : p.orientation === "horizontal"
      ? "center"
      : null};
  justify-content: ${p =>
    p.justifyLabelsToBotom
      ? null
      : p.orientation === "vertical"
      ? "flex-start"
      : null};
  padding: ${p => `${p.theme.sizing.base * 2}px`};
  width: 100%;
`;

const Stepper = props => {
  const {
    activeStep,
    children,
    controlSteps,
    customConnector,
    iconActiveColor,
    iconCompleteColor,
    iconIncompleteColor,
    iconTextColor,
    justifyLabelsToBottom,
    numberIcons,
    orientation,
    wrapperStyle,
  } = props;

  const connector = React.isValidElement(customConnector)
    ? React.cloneElement(customConnector, { orientation })
    : null;

  const stepperChildren = React.Children.toArray(children);

  const steps = stepperChildren.map((step, idx) => {
    const stepProps = {
      idx,
      orientation,
      active: false,
      completed: false,
      disabled: false,
      last: idx + 1 === stepperChildren.length,
      iconActiveColor,
      iconCompleteColor,
      iconIncompleteColor,
      iconTextColor,
      justifyLabelsToBottom,
      numberIcons,
      customConnector,
    };

    if (activeStep === idx) {
      stepProps.active = true;
    } else if (!controlSteps && activeStep > idx) {
      stepProps.completed = true;
    } else if (!controlSteps && activeStep < idx) {
      stepProps.disabled = true;
    }

    return [
      !justifyLabelsToBottom &&
        connector &&
        idx > 0 &&
        React.cloneElement(connector, { key: idx }),
      React.cloneElement(step, { ...step.props, ...stepProps }),
    ];
  });

  return (
    <ComponentWrapper
      justifyLabelsToBottom={justifyLabelsToBottom}
      orientation={orientation}
      style={wrapperStyle}
    >
      {steps}
    </ComponentWrapper>
  );
};

Stepper.propTypes = {
  /** Sets which step is active */
  activeStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** React elements passed as children of the stepper component */
  children: PropTypes.node,
  /** Sets whether the stepper controls the step progression or if it is controlled from the outside -- defaults to false -- currently stepper is not able to control steps internally anyway */
  controlSteps: PropTypes.bool,
  /** React element that will display between steps instead of the default connector */
  customConnector: PropTypes.element,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when actve **/
  iconActiveColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when complete **/
  iconCompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the bg color of the icon when incomplete **/
  iconIncompleteColor: PropTypes.string,
  /** css-readable color string (hex, rgba, etc) that sets the text color of the icon **/
  iconTextColor: PropTypes.string,
  /** Sets whether the step labels justify to the bottom of the step or to the right */
  justifyLabelsToBottom: PropTypes.bool,
  /** Passed from Stepper component -- sets whether non-active steps will have numbers in them or not */
  numberIcons: PropTypes.bool,
  /** Sets whether the stepper displays in a horizontal or vertical orientation */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /** Style object for the component wrapper */
  wrapperStyle: PropTypes.object,
};

Stepper.defaultProps = {
  controlSteps: false,
  customConnector: <StepConnector />,
  iconActiveColor: theme.colors.action,
  iconCompleteColor: theme.colors.action,
  iconIncompleteColor: theme.colors.muted,
  iconTextColor: "#fff",
  justifyLabelsToBottom: false,
  numberIcons: false,
  orientation: "horizontal",
};

export default Stepper;
