import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import styledMap from "styled-map";
import FocusTrap from "focus-trap-react";

import TutorialHeader from "./tutorial-header.js";
import TutorialBody from "./tutorial-body.js";
import TutorialFooter from "./tutorial-footer.js";

const POSITION = {
  BOTTOM: "bottom",
  HORIZONTAL: "horizontal",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  VERTICAL: "vertical",
};

const inactiveTransform = styledMap("position", {
  top:
    "scale(0) translateX(-50%) translateY(-100%) translateZ(0) perspective(1px)",
  left:
    "scale(0) translateX(-100%) translateY(-50%) translateZ(0) perspective(1px)",
  right:
    "scale(0) translateX(0) translateY(-50%) translateZ(0) perspective(1px)",
  bottom: "scale(0) translateX(-50%) translateZ(0) perspective(1px)",
});

const activeTransform = styledMap("position", {
  top:
    "scale(1) translateX(-50%) translateY(-102%) translateZ(0) perspective(1px)",
  left:
    "scale(1) translateX(-102%) translateY(-50%) translateZ(0) perspective(1px)",
  right:
    "scale(1) translateX(2%) translateY(-50%) translateZ(0) perspective(1px)",
  bottom:
    "scale(1) translateY(2%) translateX(-50%) translateZ(0) perspective(1px)",
});

const CardWrapper = styled.aside`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  top: ${p => `${p.top}px`};
  left: ${p => `${p.left}px`};
  width: ${p => `${p.theme.sizing.base * 38}px`};
  z-index: 1000;
  background: ${p => p.theme.colors.bg};
  border-radius: ${p => `${p.theme.sizing.borderRadius}px`};
  padding: 0;
  box-shadow: ${p => p.theme.boxShadow.zdepth5};
  backface-visibility: hidden;
  overflow: hidden;
  transform: ${p => (p.active ? activeTransform : inactiveTransform)};
  transform-origin: top left;
  transition: all ${p => `${p.delay}ms`}
    ${props =>
      props.active
        ? "cubic-bezier(0.4, 0, 0.2, 1)"
        : "cubic-bezier(0, 0, 0.2, 1)"};
`;

const TutorialCard = props => {
  return (
    <FocusTrap
      focusTrapOptions={{
        initialFocus: props.idToFocus ? props.idToFocus : null,
      }}
      active={props.active}
    >
      <CardWrapper
        innerRef={props.tutorialRef}
        active={props.active}
        delay={props.delay}
        left={props.left}
        position={props.position}
        top={props.top}
        id={props.id}
        role="tooltip"
      >
        {props.title || props.onClose ? (
          <TutorialHeader title={props.title} onClose={props.onClose} />
        ) : null}
        {props.body || props.image ? (
          <TutorialBody body={props.body} image={props.image} />
        ) : null}
        {props.actions ? (
          <TutorialFooter
            actions={props.actions}
            tipCount={props.tipCount}
            tipNumber={props.tipNumber}
          />
        ) : null}
      </CardWrapper>
    </FocusTrap>
  );
};

TutorialCard.propTypes = {
  actions: propTypes.oneOfType([propTypes.array, propTypes.object]),
  active: propTypes.bool,
  body: propTypes.oneOfType([propTypes.string, propTypes.node]),
  delay: propTypes.number,
  id: propTypes.string,
  idToFocus: propTypes.string,
  image: propTypes.oneOfType([propTypes.string, propTypes.node]),
  onClose: propTypes.func,
  onOpen: propTypes.func,
  position: propTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key])),
  tipCount: propTypes.number,
  tipNumber: propTypes.number,
  top: propTypes.number,
  left: propTypes.number,
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  tutorialRef: propTypes.func,
};

export default TutorialCard;
