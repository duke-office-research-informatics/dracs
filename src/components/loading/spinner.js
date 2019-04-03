import React from "react";
import propTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
`;

const ElementWrap = styled.div`
  position: relative;
  height: ${p => `${p.size / 2}px`};
  width: ${p => `${p.size / 2}px`};
  margin: ${p => p.margin};
`;

const SpinnerWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const SpinnerBar = styled.div`
  animation: ${rotation} 1.2s linear infinite;
  position: absolute;
  top: -3.9%;
  left: -10%;
  width: 20%;
  height: 7.8%;
  background-color: ${props => props.color};
  border-radius: 5px;
`;

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

const Spinner = props => {
  let bars = [];

  for (let i = 0; i < 12; i++) {
    let barStyle = {};
    barStyle.WebkitAnimationDelay = barStyle.animationDelay =
      (i - 12) / 10 + "s";

    barStyle.WebkitTransform = barStyle.transform =
      "rotate(" + i * 30 + "deg) translate(146%)";

    bars.push(<SpinnerBar color={props.color} style={barStyle} key={i} />);
  }

  return (
    <ElementWrap
      margin={props.margin}
      size={props.size}
      style={props.wrapperStyle}
    >
      <SpinnerWrap size={props.size} id={props.id}>
        {bars}
      </SpinnerWrap>
    </ElementWrap>
  );
};

Spinner.propTypes = {
  /** CSS-consumable (hex, rgba, etc) string that sets the color of the spinner bars */
  color: propTypes.string,
  /** html/aria ID attribute to hool spinner to ui component that is loading via putting aria-describedby and aria-busy props on the component that is loading */
  id: propTypes.string,
  /** CSS-consumable (px, em, calc(), etc) string that sets the component wrapper's margin */
  margin: propTypes.string,
  /** Number (maps to CSS px value) that sets how large the spinner component will be */
  size: propTypes.number,
  /** Style object to customize the component wrapper's style */
  wrapperStyle: propTypes.object,
};

Spinner.defaultProps = {
  size: 32,
  color: "#0680cd",
  margin: "4px",
};

export default Spinner;
