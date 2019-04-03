import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
// import Transition from 'react-transition-group/Transition';
import theme from "../../../theme/theme.js";
import { getRelativeValueFromRange } from "../../../utils/utils/utils.js";
//sets the viewport and svg ratio value
const SIZE = 50;

//animates the progressCircle when type is uncontrolled
const CircularDash = keyframes`
  0%{
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0px;
  }
  50%{
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100%{
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -120px;
  }
`;

//animates the svg when type is uncontrolled
const rotate = keyframes`
  100%{
    transform: rotate(360deg);
  }
`;

const load = keyframes`
  0%{
    stroke-dashoffset: 150px;
  }
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const SvgContainer = styled.svg`
  animation: ${p =>
    p.type === "uncontrolled"
      ? `${rotate} ${p.uncontrolledAnimationDuration}ms linear infinite`
      : null};
  transition: 20s transform linear 0ms;
  overflow: visible !important;
`;

const BackgroundCircle = styled.circle`
  fill: none;
  stroke: ${p => p.color};
`;

const ProgressCircle = styled.circle.attrs({
  transform: p => (p.transform ? p.transform : null),
})`
  fill: none;
  stroke: ${p => p.color};
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: ${p => (p.dashArray ? p.dashArray : 0)};
  stroke-dashoffset: ${p => (p.dashOffset ? p.dashOffset : 0)};
  transition: ${p => `${p.controlledAnimationDuration}ms all linear 0ms`};
  animation: ${p =>
    p.type === "uncontrolled"
      ? `${CircularDash} ${
          p.uncontrolledAnimationDuration
        }ms ease-in-out infinite`
      : p.animateOnMount
        ? `${load} 3s`
        : null};
`;

const InnerText = styled.text`
  fill: ${p => p.color};
  font-size: ${p => `${p.size / 5}px`};
  font-weight: lighter;
`;

const BottomLabel = styled.div`
  padding: 8px 0;
  font-size: 1.2em;
`;

const CircularProgress = props => {
  const {
    animateOnMount,
    backgroundCircleColor,
    bottomLabel,
    bottomLabelStyle,
    controlledAnimationDuration,
    insideLabel,
    insideLabelColor,
    insideLabelStyle,
    max,
    min,
    progressCircleColor,
    size,
    strokeWidth,
    type,
    uncontrolledAnimationDuration,
    value,
    wrapperStyle,
    ...other
  } = props;

  const rootProps = {};
  const circleStyle = {};
  const textProps = {};

  if (type === "controlled") {
    const relVal = getRelativeValueFromRange(value, min, max) * 100;
    const circumference = 2 * Math.PI * ((SIZE - strokeWidth) / 2);

    rootProps["aria-valuenow"] = Math.round(relVal);
    circleStyle.strokeDashArray = circumference.toFixed(3);
    circleStyle.strokeDashOffset = `${(
      ((100 - relVal) / 100) *
      circumference
    ).toFixed(3)}px`;
    circleStyle.transform = `rotate( -90 ${SIZE / 2} ${SIZE / 2})`;
    textProps.relVal = Math.round(relVal);
  }

  return (
    <ComponentWrapper style={wrapperStyle} {...other}>
      <SvgContainer
        height={size}
        width={size}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        preserveAspectRatio="xMidYMin slice"
        role="progressbar"
        type={type}
        {...rootProps}
      >
        <title> circular progress bar </title>
        <desc> {`circle indicating ${insideLabel} progress`} </desc>
        <BackgroundCircle
          color={backgroundCircleColor}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={(SIZE - strokeWidth) / 2}
          strokeWidth={`${strokeWidth}`}
        />
        <ProgressCircle
          animateOnMount={animateOnMount}
          color={progressCircleColor}
          controlledAnimationDuration={controlledAnimationDuration}
          cx={SIZE / 2}
          cy={SIZE / 2}
          dashArray={circleStyle.strokeDashArray}
          dashOffset={circleStyle.strokeDashOffset}
          r={(SIZE - strokeWidth) / 2}
          size={size}
          strokeWidth={`${strokeWidth}`}
          transform={circleStyle.transform}
          uncontrolledAnimationDuration={uncontrolledAnimationDuration}
          type={type}
        />
        {insideLabel || textProps.relVal ? (
          <InnerText
            color={insideLabelColor}
            size={SIZE}
            style={insideLabelStyle}
            x="50%"
            y="50%"
            dy=".35em"
            dx=".1em"
            textAnchor="middle"
          >
            {insideLabel || insideLabel === 0
              ? insideLabel
              : textProps.relVal || textProps.relVal === 0
                ? `${textProps.relVal}%`
                : null}
          </InnerText>
        ) : null}
      </SvgContainer>
      {bottomLabel && (
        <BottomLabel style={bottomLabelStyle}>{bottomLabel}</BottomLabel>
      )}
    </ComponentWrapper>
  );
};

CircularProgress.propTypes = {
  /** Sets whether the progress bar animates on initial mount when component is 'controlled' */
  animateOnMount: PropTypes.bool,
  /** CSS consumable color string (hex, rgba, etc) that sets the color of the background circle */
  backgroundCircleColor: PropTypes.string,
  /** Sets the label that displays below the progress circle svg */
  bottomLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  /** JS style object to set custom styles on the bottom label */
  bottomLabelStyle: PropTypes.object,
  /** sets the animation duration of the progress circle on value change */
  controlledAnimationDuration: PropTypes.number,
  /** sets the label that will display inside the progress circle, generally a percentage or ratio */
  insideLabel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** CSS consumable color string (hex, rgba, etc) that sets the color of the inside label */
  insideLabelColor: PropTypes.string,
  /** JS style obhect to add custom styles to the inside label  -- ie. to never show the label: {display: 'none'} */
  insideLabelStyle: PropTypes.object,
  /** Sets the max range value by which the value prop is evaluated */
  max: PropTypes.number,
  /** Sets the min range value by which the value prop is evaluated */
  min: PropTypes.number,
  /** CSS consumable color string (hex, rgba, etc) that sets the color of the procress circle */
  progressCircleColor: PropTypes.string,
  /** sets the desired size (height/width) of the svg */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** sets how thick the desired progress indicator will be */
  strokeWidth: PropTypes.number,
  /** sets what type of progress is being displayed: controlled (has a value), uncontrolled (no value, just a spin) */
  type: PropTypes.oneOf(["controlled", "uncontrolled"]),
  /** sets how long it takes the circle to complete a revolution when type is `uncontrolled` */
  uncontrolledAnimationDuration: PropTypes.number,
  /** Progress value to be displayed -- a number relative to min/max props */
  value: PropTypes.number,
  /** JS style object to set custom styles on the component wrapper */
  wrapperStyle: PropTypes.object,
};

CircularProgress.defaultProps = {
  backgroundCircleColor: theme.colors.border,
  controlledAnimationDuration: 400,
  insideLabelColor: theme.colors.subheading,
  max: 100,
  min: 0,
  progressCircleColor: theme.colors.action,
  size: 200,
  strokeWidth: 2,
  type: "uncontrolled",
  uncontrolledAnimationDuration: 2000,
  value: 0,
};

export default CircularProgress;
