import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { H3 } from "../../typography/typography.js";

const CardHeaderWrap = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
  width: 100%;
  ${props =>
    props.border
      ? "border-bottom: solid 1px " + props.theme.colors.border
      : null};
  padding: ${props => `${props.theme.sizing.base}px`};
  cursor: ${props => (props.dragHandle ? "move" : null)};
  overflow: hidden;
  align-self: flex-start;
  &:hover {
    ${props =>
      props.dragHandle ? "background-color: rgba(0, 0, 0, 0.1)" : null};
  }
`;

const Title = styled(H3)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: auto;
  margin-left: ${p => `${p.theme.sizing.base}px`};
`;

const CardHeader = props => {
  return (
    <CardHeaderWrap
      border={props.border}
      className={props.className}
      dragHandle={props.dragHandle}
      style={props.style}
    >
      {props.icon ? props.icon : null}
      {props.title ? (
        props.htmlTitle ? (
          <Title bold dangerouslySetInnerHTML={{ __html: props.title }} />
        ) : (
          <Title bold>{props.title}</Title>
        )
      ) : null}
      {props.children}
    </CardHeaderWrap>
  );
};

CardHeader.propTypes = {
  /** Boolean that sets whether the header has a 1px gray border-bottom */
  border: propTypes.bool,
  /** React element(s) that will be children of this component, will render to the right of the title */
  children: propTypes.node,
  /** String to set optional css className */
  className: propTypes.string,
  /** Adds cursor and background-color styling if header is meant to be used as a draggable handle */
  dragHandle: propTypes.bool,
  /** Boolean that sets whether the `title` string is HTML, in which case the title is set using `dangerouslySetInnerHTML` */
  htmlTitle: propTypes.bool,
  /** DRACS icon (or any react element) that will render to the left of the title */
  icon: propTypes.object,
  /** Style object for the header */
  style: propTypes.object,
  /** String that sets title text */
  title: propTypes.string,
};

export default CardHeader;
