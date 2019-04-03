import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { H4, H5 } from "../typography/typography.js";

const ItemWrap = styled.li`
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: ${p =>
    p.dense
      ? `${p.theme.sizing.base / 2}px ${p.theme.sizing.base}px`
      : `${p.theme.sizing.base}px`};
  list-style-type: none;
  cursor: ${p => (p.clickable ? "pointer" : null)};
  border-bottom: ${p =>
    p.bottomBorder ? `solid 1px ${p.theme.colors.border}` : null};
  &:focus {
    outline: dotted 1px rgb(59, 153, 252);
    outline-offset: -1px;
  }
`;

const ItemLeftContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const LeftItemWrap = styled.div`
  padding: ${p =>
    p.dense
      ? `0 ${p.theme.sizing.base}px 0 0`
      : `0 ${p.theme.sizing.base * 2}px 0 ${p.theme.sizing.base}px`};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const LineOne = H4.extend`
  color: ${p => (p.clickable ? p.theme.colors.action : p.theme.colors.base)};
  min-height: 21px;
  margin-bottom: ${p => (p.dense ? "0px" : null)};
  width: 100%;
  ${ItemWrap}:hover & {
    color: ${p => (p.clickable ? p.theme.colors.actionHover : null)};
  }
  ${ItemWrap}:focus & {
    color: ${p => (p.clickable ? p.theme.colors.actionHover : null)};
  }
`;

const LineTwo = H5.extend`
  width: 100%;
  min-height: 15px;
  margin-bottom: ${p => (p.dense ? "0px" : null)};
`;

const ItemRightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DoubleLineListItem = props => {
  const handleKeyUp = e => {
    if (props.onClick) {
      if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 10) {
        props.onClick(e);
      }
    }
  };

  const handleLeftIconKeyUp = e => {
    if (props.onLeftIconClick) {
      if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 10) {
        props.onLeftIconClick(e);
      }
    }
  };

  return (
    <ItemWrap
      bottomBorder={props.bottomBorder}
      className={props.wrapperClassName}
      clickable={props.clickable}
      dense={props.dense}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      onKeyUp={handleKeyUp}
      style={props.wrapperStyle}
      tabIndex={props.clickable && props.onClick ? "0" : null}
    >
      <ItemLeftContainer>
        {props.leftIcon ? (
          <LeftItemWrap
            dense={props.dense}
            onClick={props.onLeftIconClick}
            onKeyUp={handleLeftIconKeyUp}
            tabIndex={props.onLeftIconClick ? "0" : null}
          >
            {props.leftIcon}
          </LeftItemWrap>
        ) : null}
        <TextContainer>
          <LineOne
            clickable={props.clickable}
            dense={props.dense}
            style={props.lineOneStyle}
          >
            {props.lineOne}
          </LineOne>
          <LineTwo dense={props.dense} style={props.lineTwoStyle}>
            {props.lineTwo}
          </LineTwo>
        </TextContainer>
      </ItemLeftContainer>
      <ItemRightContainer>{props.children}</ItemRightContainer>
    </ItemWrap>
  );
};

DoubleLineListItem.propTypes = {
  /** Sets whether the list item displays a solid 1px gray border on the bottom */
  bottomBorder: propTypes.bool,
  /** React element that is passed as a child of the list item -- children render on the right-hand side of the component */
  children: propTypes.node,
  /** Sets whether or not the whole item has a single clickable action, and sets the first line text color to the action color to denote that the item is clickable */
  clickable: propTypes.bool,
  /** Sets whether the item has a dense or regular layout */
  dense: propTypes.bool,
  /** Icon or react element that renders on the far left of the component */
  leftIcon: propTypes.oneOfType([
    propTypes.string,
    propTypes.node,
    propTypes.element,
    propTypes.number,
  ]),
  /** String or react element that displays as the first line in the item */
  lineOne: propTypes.oneOfType([propTypes.string, propTypes.node]),
  /** Style object for the text/element passed into line one */
  lineOneStyle: propTypes.object,
  /** String or react element that displays as the second line in the item */
  lineTwo: propTypes.oneOfType([propTypes.string, propTypes.node]),
  /** Style object for the text/element passed into line two */
  lineTwoStyle: propTypes.object,
  /** Function that is called when the icon/element on the left side of the component is clicked */
  onLeftIconClick: propTypes.func,
  /** Function that is called when the item component is clicked (to be used in conjunction with the `clickable` prop) */
  onClick: propTypes.func,
  /** function called on keyDown when element is active */
  onKeyDown: propTypes.func,
  /** css class name to apply to the wrapper */
  wrapperClassName: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /** Style object that sets any desired custom styles on the component wrapper */
  wrapperStyle: propTypes.object,
};

export default DoubleLineListItem;
