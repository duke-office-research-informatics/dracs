import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import ActionButton from "../button/action/action.js";
import IconClose from "../../icons/close/icon_close.js";
import { H4 } from "../typography/typography.js";

const TutHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${p => p.theme.colors.action};
  padding: ${p =>
    `${p.theme.sizing.base}px  ${p.theme.sizing.base}px ${
      p.theme.sizing.base
    }px ${p.theme.sizing.base * 2}px`};
  backface-visibility: hidden;
`;

const TitleWrap = H4.extend`
  color: ${p => p.theme.colors.bg};
  align-self: flex-start;
  font-weight: 400;
  text-transform: uppercase;
  white-space: nowrap;
  backface-visibility: hidden;
`;

const TutorialHeader = props => {
  return (
    <TutHeader>
      {props.title ? <TitleWrap>{props.title}</TitleWrap> : null}
      {props.onClose ? (
        <ActionButton onClick={props.onClose}>
          <IconClose size={20} color="#fff" hoverColor="#fff" />
        </ActionButton>
      ) : null}
    </TutHeader>
  );
};

TutorialHeader.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  onClose: propTypes.func,
};

export default TutorialHeader;
