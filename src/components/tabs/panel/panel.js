import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Panel = styled.section`
  display: ${p => (p.hide ? "none" : "flex")};
  flex: ${p => (p.flex ? p.flex : "0 0 auto")};
  flex-direction: ${p => (p.flexDirection ? p.flexDirection : null)};
  flex-wrap: ${p => (p.flexWrap ? p.flexWrap : null)};
  justify-content: ${p => (p.justifyContent ? p.justifyContent : null)};
  align-content: ${p => (p.alignContent ? p.alignContent : null)};
  align-items: ${p => (p.alignItems ? p.alignItems : null)};
  height: ${p => (p.height ? p.height : null)};
  min-height: ${p => (p.minHeight ? p.minHeight : null)};
  max-height: ${p => (p.maxHeight ? p.maxHeight : null)};
  width: ${p => (p.width ? p.width : null)};
  min-width: ${p => (p.minWidth ? p.minWidth : null)};
  max-width: ${p => (p.maxWidth ? p.maxWidth : null)};
  padding: ${p => (p.padding ? p.padding : null)};
  margin: ${p => (p.margin ? p.margin : null)};
  background-color: ${p => (p.backgroundColor ? p.backgroundColor : null)};
  overflow-x: ${p => (p.overflowX ? p.overflowX : "hidden")};
  overflow-y: ${p => (p.overflowY ? p.overflowY : "hidden")};
  transform: translateZ(0);
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  ${p => (p.mediaQuery ? p.mediaQuery : null)};
`;

class TabPanel extends React.PureComponent {
  static propTypes = {
    active: propTypes.bool,
    alignContent: propTypes.string,
    alignItems: propTypes.string,
    backgroundColor: propTypes.string,
    children: propTypes.node,
    display: propTypes.string,
    flex: propTypes.string,
    flexDirection: propTypes.string,
    flexWrap: propTypes.string,
    height: propTypes.string,
    hide: propTypes.bool,
    panelRef: propTypes.func,
    justifyContent: propTypes.string,
    margin: propTypes.string,
    maxHeight: propTypes.string,
    maxWidth: propTypes.string,
    mediaQuery: propTypes.string,
    minHeight: propTypes.string,
    minWidth: propTypes.string,
    name: propTypes.string,
    overflowX: propTypes.string,
    overflowY: propTypes.string,
    padding: propTypes.string,
    style: propTypes.object,
    width: propTypes.string,
  };

  static defaultProps = {
    active: false,
    isTabPanel: true,
  };

  render() {
    const {
      active,
      alignContent,
      alignItems,
      backgroundColor,
      children,
      display,
      flex,
      flexDirection,
      flexWrap,
      hide,
      height,
      panelRef,
      justifyContent,
      margin,
      maxHeight,
      maxWidth,
      mediaQuery,
      minHeight,
      minWidth,
      name,
      overflowX,
      overflowY,
      padding,
      style,
      width,
    } = this.props;
    return (
      <Panel
        aria-expanded={active}
        alignContent={alignContent}
        alignItems={alignItems}
        backgroundColor={backgroundColor}
        display={display}
        flex={flex}
        flexDirection={flexDirection}
        flexWrap={flexWrap}
        height={height}
        hide={hide}
        panelRef={panelRef}
        justifyContent={justifyContent}
        margin={margin}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        mediaQuery={mediaQuery}
        minHeight={minHeight}
        minWidth={minWidth}
        name={name}
        overflowX={overflowX}
        overflowY={overflowY}
        padding={padding}
        role="tabpanel"
        style={style}
        width={width}
      >
        {children}
      </Panel>
    );
  }
}

export default TabPanel;
