import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const TabWrap = styled.div.attrs(props => ({
  disabled: props.disabled ? true : false,
}))`
  display: ${p => (p.hidden ? "none" : "flex")};
  flex: ${p => (p.fixed ? "1 0 auto" : "0 0 auto")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  padding: ${p => p.theme.sizing.base / 2 + "px " + p.theme.sizing.base}px;
  padding-top: 0;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  color: ${p => (p.active ? p.theme.colors.base : p.theme.colors.muted)};
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  font-size: 1em;
  text-transform: uppercase;
  &:focus {
    outline-offset: -2px;
    outline: dotted 1px ${p => p.theme.colors.muted};
    color: ${p => (p.disabled ? null : p.theme.colors.base)};
  }
  &:hover {
    color: ${p => (p.disabled ? null : p.theme.colors.base)};
  }
`;

class Tab extends React.Component {
  static propTypes = {
    active: propTypes.bool,
    children: propTypes.node,
    disabled: propTypes.bool,
    hidden: propTypes.bool,
    icon: propTypes.node,
    index: propTypes.number,
    tabRef: propTypes.func,
    label: propTypes.node,
    name: propTypes.string,
    onActive: propTypes.func,
    onClick: propTypes.func,
    itemClick: propTypes.func,
    unableToSetUnderline: propTypes.bool,
    underline: propTypes.object,
  };

  static defaultProps = {
    active: false,
    disabled: false,
    hidden: false,
    isTab: true,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  handleClick = e => {
    e.stopPropagation();
    if (!this.props.disabled && this.props.itemClick) {
      if (this.props.onClick) {
        this.props.itemClick(e, this.props.name, this.props.onClick);
      } else {
        this.props.itemClick(e, this.props.name);
      }
    }
  };

  handleKeyDown = e => {
    const key = "which" in e ? e.which : e.keyCode;
    if (key === 13 && !this.props.disabled && this.props.onClick) {
      this.props.itemClick(e, this.props.name);
    }
  };

  render() {
    const { children, icon, label, tabRef, underline, ...other } = this.props;
    return (
      <TabWrap
        {...other}
        role="tab"
        tabIndex="0"
        onClickCapture={this.handleClick}
        onKeyDown={this.handleKeyDown}
        ref={tabRef}
        underline={underline}
      >
        {icon}
        {label}
        {children}
      </TabWrap>
    );
  }
}

export default Tab;
