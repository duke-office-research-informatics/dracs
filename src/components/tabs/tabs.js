import React from "react";
import propTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import _ from "lodash";

import TabPanel from "./panel/panel.js";
import IconChevLeft from "../../icons/chevron_left/chevron_left.js";
import IconChevRight from "../../icons/chevron_right/chevron_right.js";

const TabsWrap = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateZ(0);
  ${p =>
    p.separatePanel
      ? "min-height: 26px;"
      : "flex: 1 1 auto; min-height: 100%;"};
  -ms-overflow-style: none;
`;

const TabNavWrap = styled.nav`
  display: flex;
  border-bottom: solid 1px ${p => p.theme.colors.border};
  min-height: 25px;
`;

const TabRow = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  position: relative;
  overflow: hidden;
`;

//this should be using tranform() translate() instead of absolute positioning
const Underline = styled.span`
  position: absolute;
  top: ${p => p.position.top};
  left: ${p => p.position.left};
  width: ${p => p.position.width};
  background-color: #000;
  height: 2px;
  transform: translateZ(0);
  transition-duration: 0.3s;
  transition-property: left, width;
  transition-timing-function: ease-in-out;
  margin-top: -2px;
`;

const CaretContainer = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const gridConfig = {
  flexboxgrid: {
    gridSize: 12,
    gutterWidth: 0.5,
    outerMargin: 0,
  },
};

class Tabs extends React.Component {
  static propTypes = {
    children: propTypes.node,
    disableAnimatedUnderline: propTypes.bool,
    fixed: propTypes.bool,
    hide: propTypes.oneOf(["display", "unmounted"]),
    index: propTypes.number,
    inverse: propTypes.bool,
    onChange: propTypes.func,
    panel: propTypes.bool,
    resizeTimeout: propTypes.number,
    separatePanel: propTypes.bool,
    value: propTypes.string,
    wrapperStyle: propTypes.object,
  };

  static defaultProps = {
    fixed: false,
    inverse: false,
    hide: "display",
    resizeTimeout: 310,
  };

  state = {
    underline: {
      top: null,
      left: null,
      width: null,
    },
    carets: {},
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  componentDidMount() {
    if (!this.props.panel) {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.panel) {
      if (
        this.props.value !== prevProps.value ||
        this.props.children !== prevProps.children
      ) {
        this.updateUnderline(this.props.value);
      }
    }
  }

  componentWillUnmount() {
    if (!this.props.panel) {
      window.removeEventListener("resize", this.handleResize);
      clearTimeout(this.resizeTimeout);
      if (this.updateUnderlineAnimationFrame)
        cancelAnimationFrame(this.updateUnderlineAnimationFrame);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
    );
  }

  handleResize = () => {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.navNode) {
        this.updateUnderline(this.props.value);
        this.updateCarets();
      }
    }, this.props.resizeTimeout); //account for animations in timing
  };

  updateUnderline = idx => {
    if (this.navNode && this.navNode.querySelector(`[name="${idx}"]`)) {
      const nav = this.navNode.getBoundingClientRect();
      const label = this.navNode
        .querySelector(`[name="${idx}"]`)
        .getBoundingClientRect();
      const scrollLeft = this.navNode.scrollLeft;
      if (this.updateUnderlineAnimationFrame)
        cancelAnimationFrame(this.updateUnderlineAnimationFrame);
      this.updateUnderlineAnimationFrame = requestAnimationFrame(() => {
        this.setState(prevState => ({
          underline: {
            ...prevState.underline,
            top: `${nav.height.toFixed(3)}px`,
            left: `${(label.left + scrollLeft - nav.left).toFixed(3)}px`,
            width: `${label.width.toFixed(3)}px`,
          },
        }));
      });
    }
  };

  updateCarets = () => {
    const idx = this.navNode.children.length - 2;
    if (idx >= 0) {
      const scrollLeft = this.navNode.scrollLeft;
      const nav = this.navNode.getBoundingClientRect();
      const lastLabel = this.navNode.children[idx].getBoundingClientRect();
      this.setState(prevState => ({
        carets: {
          ...prevState.carets,
          left: scrollLeft > 0,
          right: nav.right < lastLabel.right - 5,
        },
      }));
    }
  };

  scrollNavigation = factor => {
    const oldScrollLeft = this.navNode.scrollLeft;
    this.navNode.scrollLeft += factor * this.navNode.clientWidth;
    if (this.navNode.scrollLeft !== oldScrollLeft) {
      this.updateCarets();
    }
  };

  scrollRight = () => this.scrollNavigation(-1);

  scrollLeft = () => this.scrollNavigation(+1);

  parseChildren() {
    const tabRow = [];
    const panels = [];

    React.Children.forEach(this.props.children, item => {
      if (item.props.isTab) {
        tabRow.push(item);
        if (item.props.children) {
          panels.push(
            <TabPanel name={item.props.name}>{item.props.children}</TabPanel>
          );
        }
      } else if (item.props.isTabPanel) {
        panels.push(item);
      }
    });
    return { tabRow, panels };
  }

  handleRowItemClick = (e, name, itemOnClick) => {
    e.stopPropagation();
    if (this.props.onChange) {
      this.props.onChange(name, e);
    }
    if (itemOnClick) {
      itemOnClick(e, name);
    }
  };

  renderTabRow(tabRow) {
    return tabRow.map((item, idx) =>
      React.cloneElement(item, {
        children: null,
        key: idx,
        index: idx,
        name: item.props.name,
        active: this.props.value === item.props.name,
        fixed: this.props.fixed,
        inverse: this.props.inverse,
        underline: this.state.underline,
        itemClick: this.handleRowItemClick,
      })
    );
  }

  renderPanels(panels) {
    const panelElements = panels.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        name: item.props.name,
        active: this.props.value === item.props.name,
        hide:
          this.props.value !== item.props.name && this.props.hide === "display",
        tabIndex: idx,
      });
    });
    return this.props.hide === "display"
      ? panelElements
      : panelElements.filter(item => item.props.name === this.props.value);
  }

  render() {
    const {
      disableAnimatedUnderline,
      fixed,
      inverse,
      separatePanel,
      wrapperStyle,
    } = this.props;
    const { left: hasLeftCaret, right: hasRightCaret } = this.state.carets;
    const { tabRow, panels } = this.parseChildren();
    return (
      <ThemeProvider theme={gridConfig}>
        <TabsWrap separatePanel={separatePanel} style={wrapperStyle}>
          {tabRow.length ? (
            <TabNavWrap>
              {hasLeftCaret && (
                <CaretContainer onClick={this.scrollRight}>
                  <IconChevLeft size={22} hoverColor="#53a4dc" />
                </CaretContainer>
              )}
              <TabRow
                role="tablist"
                ref={node => {
                  this.navNode = node;
                }}
              >
                {this.renderTabRow(tabRow)}
                <Underline
                  position={this.state.underline}
                  animated={disableAnimatedUnderline}
                  fixed={fixed}
                  inverse={inverse}
                />
              </TabRow>
              {hasRightCaret && (
                <CaretContainer onClick={this.scrollLeft}>
                  <IconChevRight size={22} hoverColor="#53a4dc" />
                </CaretContainer>
              )}
            </TabNavWrap>
          ) : null}

          {this.renderPanels(panels)}
        </TabsWrap>
      </ThemeProvider>
    );
  }
}
export default Tabs;
