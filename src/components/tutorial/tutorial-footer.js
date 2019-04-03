import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import Button from "../button/base/button.js";
import { H5 } from "../typography/typography.js";

const TutFooter = styled.footer`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: ${p => (p.multiple ? "space-between" : "flex-end")};
  padding: ${p => `${p.theme.sizing.base}px`};
  min-height: 52px;
  max-width: 304px;
  backface-visibility: hidden;
`;

const TipCount = styled.div`
  position: absolute;
  display: flex;
  width: 304px;
  align-items: center;
  justify-content: center;
  bottom: 14px;
  right: 0;
  backface-visibility: hidden;
`;

const TutorialFooter = props => {
  const renderActions = props.actions.map((action, idx) => {
    return (
      <Button
        key={idx}
        style={
          idx === 0 && props.actions.length > 1
            ? { zIndex: 1, marginRight: "auto" }
            : { zIndex: 1 }
        }
        {...action}
      />
    );
  });

  const multiple = () => {
    if (renderActions.length > 1) return true;
    else return false;
  };

  return (
    <TutFooter multiple={multiple()}>
      {renderActions}
      <TipCount>
        {props.tipCount ? (
          <H5>
            Tip {props.tipNumber + 1}/{props.tipCount}
          </H5>
        ) : null}
      </TipCount>
    </TutFooter>
  );
};

TutorialFooter.propTypes = {
  actions: propTypes.oneOfType([propTypes.object, propTypes.array]),
  tipCount: propTypes.number,
  tipNumber: propTypes.number,
};

export default TutorialFooter;
