import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Header = styled.header`
  ${props => (props.fixed ? "position: absolute" : null)};
  top: ${props => (props.fixed ? 0 : null)};
  height: ${props => props.height + "px"};
  width: ${p => (p.width ? p.width : "100%")};
  background-color: ${props => props.backgroundColor};
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-clip: border-box;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
  ${props =>
    props.raised ? `box-shadow: ${props.theme.boxShadow.header}` : null};
  z-index: ${p => p.theme.zIndex.lg};
`;

const IconRightDiv = styled.div`
  margin-left: auto;
`;

const IconRightButton = styled.button`
  margin-left: auto;
`;

const IconLeftButton = styled.button``;

const HeaderWrap = styled.div`
  width: 100vw;
  ${p => (p.mediaQuery ? p.mediaQuery : null)};
`;

const FixedUnderlay = styled.div`
  height: ${props => props.height + "px"};
  width: 100vw;
`;

const AppHeader = props => {
  return (
    <HeaderWrap mediaQuery={props.mediaQuery}>
      {props.fixed ? <FixedUnderlay height={props.height} /> : null}
      <Header
        backgroundImage={props.backgroundImage}
        backgroundColor={props.backgroundColor}
        height={props.height}
        width={props.width}
        raised={props.raised}
        fixed={props.fixed}
      >
        {props.leftIcon ? (
          props.onLeftIconClick ? (
            <IconLeftButton tabIndex={0} onClick={props.onLeftIconClick}>
              {props.leftIcon}
            </IconLeftButton>
          ) : (
            props.leftIcon
          )
        ) : null}
        {props.childrenLeft}
        {props.children}
        {props.rightIcon ? (
          props.onRightIconClick ? (
            <IconRightButton tabIndex={0} onClick={props.onRightIconClick}>
              {props.rightIcon}
            </IconRightButton>
          ) : (
            <IconRightDiv>{props.rightIcon}</IconRightDiv>
          )
        ) : null}
        {props.childrenRight ? (
          <IconRightDiv rightIcon={props.rightIcon ? true : false}>
            {props.childrenRight}
          </IconRightDiv>
        ) : null}
      </Header>
    </HeaderWrap>
  );
};

AppHeader.defaultProps = {
  backgroundImage: null,
  backgroundColor: "#0680cd",
  height: 56,
};

AppHeader.propTypes = {
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  backgroundColor: propTypes.string,
  /** img (jpg, png, etc) declared in require syntax for css background image */
  backgroundImage: propTypes.oneOfType([propTypes.string, propTypes.object]),
  /** React element that will render on the left of the header (after icon) */
  childrenLeft: propTypes.node,
  /** React element that will render on the right side of the header (after icon) */
  childrenRight: propTypes.node,
  /** Number that sets desired height of the header in pixels */
  height: propTypes.number,
  /** Boolean that sets the app header to be fixed to the top of its container (also sets a div of the same height beneath it so content does not get obscured under the header) */
  fixed: propTypes.bool,
  /** CSS-consumable string (@media...) media-query declaration */
  mediaQuery: propTypes.string,
  /** Boolean that sets whether there is a drop-shadow under the header */
  raised: propTypes.bool,
  /** React element that places an icon in the far-right corner of the header before elements declared as `childrenRight`*/
  rightIcon: propTypes.object,
  /** OnClick handler for right icon that wraps the icon in a button for a11y purposes */
  onRightIconClick: propTypes.func,
  /** React element that places an icon in the far left corner of the header before elements declared as 'childrenLeft' */
  leftIcon: propTypes.object,
  /** OnClick handler for left icon that wraps the icon in a button for a11y purposes */
  onLeftIconClick: propTypes.func,
  /** React element that is placed in the center of the header between the left icon/children and right icon/children */
  children: propTypes.node,
  /** CSS-consumable string to declare desired width of the header */
  width: propTypes.string,
};

export default AppHeader;
