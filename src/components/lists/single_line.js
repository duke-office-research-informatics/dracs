import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

export const ItemWrap = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${p => `${p.theme.sizing.base / 2}px 0`};
  list-style-type: none;
  cursor: ${p => (p.clickable ? "pointer" : null)};
  width: 100%;
  border-bottom: ${p =>
    p.bottomBorder ? `solid 1px ${p.theme.colors.border}` : null};
  &:focus {
    outline: dotted 1px rgb(59, 153, 252);
    outline-offset: -1px;
  }
`;

const ItemLeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemRightContainer = styled.div``;

const LeftItemWrap = styled.div`
  padding: ${p =>
    p.dense
      ? `0 ${p.theme.sizing.base}px 0 0`
      : `0 ${p.theme.sizing.base * 2}px 0 ${p.theme.sizing.base}px`};
`;

export const TitleWrap = styled.div`
  color: ${p => (p.clickable ? p.theme.colors.action : null)};
  padding: ${p => `${p.theme.sizing.base}px`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${ItemWrap}:hover & {
    color: ${p => (p.clickable ? p.theme.colors.actionHover : null)};
    text-decoration: ${p => (p.underlineTitleOnHover ? "underline" : null)};
  }
  ${ItemWrap}:focus & {
    color: ${p => (p.clickable ? p.theme.colors.actionHover : null)};
    text-decoration: ${p => (p.underlineTitleOnHover ? "underline" : null)};
  }
`;

const SingleLineListItem = props => {
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
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      onKeyUp={handleKeyUp}
      style={props.wrapperStyle}
      tabIndex={props.clickable && props.onClick ? "0" : null}
    >
      <ItemLeftContainer>
        {props.leftIcon ? (
          <LeftItemWrap
            onClick={props.onLeftIconClick}
            onKeyUp={handleLeftIconKeyUp}
            tabIndex={props.onLeftIconClick ? "0" : null}
          >
            {props.leftIcon}
          </LeftItemWrap>
        ) : null}
        {props.title ? (
          <TitleWrap
            clickable={props.clickable}
            underlineTitleOnHover={props.underlineTitleOnHover}
          >
            {props.title}
          </TitleWrap>
        ) : null}
      </ItemLeftContainer>
      <ItemRightContainer>{props.children}</ItemRightContainer>
    </ItemWrap>
  );
};

SingleLineListItem.propTypes = {
  /** Sets whether the list item displays a solid 1px gray border on the bottom */
  bottomBorder: propTypes.bool,
  /** React element that is passed as a child of the list item -- children render on the right-hand side of the component */
  children: propTypes.node,
  /** Sets whether or not the whole item has a single clickable action, and sets the first line text color to the action color to denote that the item is clickable */
  clickable: propTypes.bool,
  /** Icon or react element that renders on the far left of the component */
  leftIcon: propTypes.oneOfType([
    propTypes.node,
    propTypes.object,
    propTypes.func,
    propTypes.number,
  ]),
  /** Function that is called when the item component is clicked (to be used in conjunction with the `clickable` prop) */
  onClick: propTypes.func,
  /** function called on keyDown when element is active */
  onKeyDown: propTypes.func,
  /** Function that is called when the icon/element on the left side of the component is clicked */
  onLeftIconClick: propTypes.func,
  /** String or react element that sets the title of the list item */
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  /** Boolean that sets whether list item title is underlined on hover **/
  underlineTitleOnHover: propTypes.bool,
  /** css class name to apply to the wrapper */
  wrapperClassName: propTypes.oneOfType([propTypes.string, propTypes.func]),
  /** Style object that sets any desired custom styles on the component wrapper */
  wrapperStyle: propTypes.object,
};

export default SingleLineListItem;
