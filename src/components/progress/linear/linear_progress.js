import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import theme from "../../../theme/theme.js";
import {
  getRelativeValueFromRange,
  rescaleValue,
} from "../../../utils/utils/utils.js";

const LinearDash = keyframes`
  0%{
    stroke-dasharray: 100px, 100px;
    stroke-dashoffset: 100px;
  }
  20%{
    stroke-dasharray: 100px, 100px;
    stroke-dashoffset: 80px;
  }
  40%{
    stroke-dasharray: 100px, 100px;
    stroke-dashoffset: 60px;
  }
  60%{
    stroke-dasharray: 100px, 100px;
    stroke-dashoffset: 40px;
  }
  80%{
    stroke-dasharray: 100px, 100px;
    stroke-dashoffset: 20px;
  }
  100%{
    stroke-dasharray: 100px, 100px;
    stroke-dashoffset: 0px;
  }
`;

const LinearLoad = keyframes`
0%{
  stroke-dasharray: 100px, 100px;
  stroke-dashoffset: 100px;
}
`;

const ElementWrap = styled.div`
  position: relative;
  height: ${p => p.height};
  width: ${p => p.width};
`;

const SvgContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transition: 20s transform linear 0ms;
`;

const BackgroundLine = styled.path`
  fill: none;
  stroke: ${p => p.color};
  stroke-width: ${p => `${p.strokeWidth}px`};
  stroke-dasharray: 100px, 100px;
  stroke-dashoffset: 0px;
`;

const ProgressLine = styled.path`
  fill: none;
  stroke: ${p => p.color};
  stroke-width: ${p => p.strokeWidth};
  stroke-dasharray: ${p => p.dashArray};
  stroke-dashoffset: ${p => p.dashOffset};
  transition: ${p => `${p.animationDuration}ms all linear 0ms`};
  animation: ${p =>
    p.type === "uncontrolled"
      ? css`
          ${LinearDash} 6000ms ease-in-out infinite
        `
      : p.animateOnMount
      ? css`
          ${LinearLoad} 3000ms
        `
      : null};
`;

const LinearProgress = props => {
  const {
    animateOnMount,
    animationDuration,
    backgroundLine,
    backgroundLineColor,
    height,
    progressLineColor,
    range,
    strokeLinecap,
    strokeWidth,
    type,
    width,
    wrapperStyle,
    ...other
  } = props;

  const rootProps = {};
  const progLine = {};

  const center = strokeWidth / 2;
  const right = 100 - strokeWidth / 2;
  const line = `M ${strokeLinecap === "round" ? center : 0},${center} L ${
    strokeLinecap === "round" ? right : 100
  },${center}`;

  if (type === "controlled") {
    if (
      (range.valueBegin || range.valueBegin === 0) &&
      (range.valueEnd || range.valueEnd === 0)
    ) {
      const rangeVal = range.valueEnd - range.valueBegin;
      const relVal =
        getRelativeValueFromRange(rangeVal, range.min, range.max) * 100;

      rootProps["aria-valuenow"] = Math.round(relVal);
      const arrayValue = rescaleValue(range.valueEnd, range.min, range.max);
      const offsetValue = rescaleValue(range.valueBegin, range.min, range.max);
      progLine.dashArray = `${Math.round(arrayValue - offsetValue)}px, 100px`;
      progLine.dashOffset = `${-offsetValue}px`;
    } else {
      console.warn(
        "DRACS: you must provide the range.valueBegin and range.valueEnd properties when using the controlledRange type of LinearProgress"
      );
    }
  }

  return (
    <ElementWrap width={width} height={height} style={wrapperStyle}>
      <SvgContainer
        height={height}
        preserveAspectRatio="none"
        role="progressbar"
        type={type}
        viewBox={`0 0 100 ${strokeWidth}`}
        width={"100%"}
        {...rootProps}
        {...other}
      >
        <BackgroundLine
          color={backgroundLine ? backgroundLineColor : "transparent"}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          d={line}
        />
        <ProgressLine
          animateOnMount={animateOnMount}
          animationDuration={animationDuration}
          color={progressLineColor}
          d={line}
          dashArray={progLine.dashArray}
          dashOffset={progLine.dashOffset}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          type={type}
        />
      </SvgContainer>
    </ElementWrap>
  );
};

LinearProgress.propTypes = {
  /** Sets whether the progress bar animates on mount */
  animateOnMount: PropTypes.bool,
  /** Sets how long the line-update animation takes to complete in ms */
  animationDuration: PropTypes.number,
  /** Sets whether a background line is transparent or visible */
  backgroundLine: PropTypes.bool,
  /** CSS consumable string color value (hex, rgba, etc) that sets the color of the background line */
  backgroundLineColor: PropTypes.string,
  height: PropTypes.string,
  /** CSS consumable string color value (hex, rgba, etc) that sets the color of the progress line */
  progressLineColor: PropTypes.string,
  range: PropTypes.shape({
    /** Sets the max of the range at which the value will be evaluated (defaults to 100) -- bgline x2*/
    max: PropTypes.number.isRequired,
    /** Sets the min of the range at which the value will be evaluated (defaults to 0) -- bgline x1*/
    min: PropTypes.number.isRequired,
    /** Sets the point in the range provided where the progress line ends --progline x1 */
    valueBegin: PropTypes.number.isRequired,
    /** Sets the point in the range provided where the progress line starts -- progline x2 */
    valueEnd: PropTypes.number.isRequired,
  }).isRequired,
  /** sets whether the line ends in a rounded or straight edge */
  strokeLinecap: PropTypes.oneOf(["round", "square"]),
  /** Sets width of the line stroke in px */
  strokeWidth: PropTypes.number,
  /** sets what type of progress is being displayed: `controlled` (has a value), `uncontrolled` (no value, animates on loop) */
  type: PropTypes.oneOf(["controlled", "uncontrolled"]),
  width: PropTypes.string,
  /** JS style object to set custom styles on the component wrapper */
  wrapperStyle: PropTypes.object,
};

LinearProgress.defaultProps = {
  animationDuration: 600,
  backgroundLine: true,
  backgroundLineColor: theme.colors.border,
  height: "8px",
  progressLineColor: theme.colors.action,
  range: { max: 100, min: 0, valueBegin: 0, valueEnd: 0 },
  strokeLinecap: "square",
  strokeWidth: 1,
  type: "controlled",
  width: "100%",
};

export default LinearProgress;
