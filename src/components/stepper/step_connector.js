import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ConnectorContainer = styled.div`
  position: ${p => (p.justifyLabelsToBottom ? "absolute" : null)};
  top: ${p =>
    p.justifyLabelsToBottom
      ? p.orientation === "vertical"
        ? "calc( 50% + 24px)"
        : `${p.theme.sizing.base + 3}px`
      : null};
  bottom: ${p =>
    p.justifyLabelsToBottom
      ? p.orientation === "vertical"
        ? "calc( 50% - 72px)"
        : null
      : null};
  left: ${p =>
    p.justifyLabelsToBottom
      ? p.orientation === "vertical"
        ? "20%"
        : "calc(50% + 16px)"
      : null};
  right: ${p =>
    p.justifyLabelsToBottom
      ? p.orientation === "vertical"
        ? null
        : "calc(-50% + 16px)"
      : null};
  display: flex;
  flex: 1 1 auto;
  margin-left: ${p => (p.orientation === "horizontal" ? null : "12px")};
  padding: ${p =>
    p.orientation === "horizontal" ? null : `0 0 ${p.theme.sizing.base}px`};
  @media (max-width: 768px) {
    display: ${p => (p.orientation === "horizontal" ? "none" : null)};
  }
`;

const ConnectorLine = styled.span`
  display: block;
  min-height: ${p =>
    p.orientation === "horizontal" ? null : `${p.theme.sizing.base * 3}px`};
  width: 100%;
  border-color: ${p => p.theme.colors.subheading};
  border-left-style: ${p => (p.orientation === "horizontal" ? null : "solid")};
  border-left-width: ${p => (p.orientation === "horizontal" ? null : "1px")};
  border-top-style: ${p => (p.orientation === "horizontal" ? "solid" : null)};
  border-top-width: ${p => (p.orientation === "horizontal" ? "1px" : null)};
`;

const StepConnector = props => {
  const { justifyLabelsToBottom, orientation, ...other } = props;

  return (
    <ConnectorContainer
      justifyLabelsToBottom={justifyLabelsToBottom}
      orientation={orientation}
      {...other}
    >
      <ConnectorLine orientation={orientation} />
    </ConnectorContainer>
  );
};

StepConnector.propTypes = {
  /** Sets whether the connecting line allows space for a label or accounts for a label below the step indicator */
  justifyLabelsToBottom: PropTypes.bool,
  /** Sets whether the orientation displayed in the stepper is horizontal or vertical */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

StepConnector.defaultProps = {
  justifyLabelsToBottom: false,
  orientation: "horizontal",
};

export default StepConnector;
