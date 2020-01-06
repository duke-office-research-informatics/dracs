import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import styledMap from "styled-map";
import Portal from "../../utils/portal/portal.js";
import events from "../../utils/events/events.js";
import { getViewport } from "../../utils/utils/utils.js";
// import ReactDOM, { findDOMNode } from 'react-dom';

const inactiveTransform = styledMap("position", {
  top: "scale(0) translateX(-50%) translateY(-100%)",
  left: "scale(0) translateX(-100%) translateY(-50%)",
  right: "scale(0) translateX(0) translateY(-50%)",
  bottom: "scale(0) translateX(-50%)",
});

const activeTransform = styledMap("position", {
  top: "scale(1) translateX(-50%) translateY(-100%)",
  left: "scale(1) translateX(-100%) translateY(-50%)",
  right: "scale(1) translateX(0) translateY(-50%)",
  bottom: "scale(1) translateX(-50%)",
});

const TooltipOuter = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  font-size: 14px;
  font-weight: 400;
  max-width: ${props => `${props.theme.sizing.base * 30}px`};
  white-space: nowrap;
  pointer-events: none;
  text-align: center;
  transform: ${props => (props.active ? activeTransform : inactiveTransform)};
  transform-origin: top left;
  transition: ease-in-out 0.3s transform;
  text-transform: none;
  z-index: ${p => p.theme.zIndex.xl};
  line-height: 0;
  opacity: ${props => (props.active ? 0.9 : 0)};
  height: ${p => `${p.theme.sizing.base * 4}px`};
  background: ${p => p.theme.colors.subheading};
  border-radius: ${props => `${props.theme.sizing.borderRadius}px`};
  padding: ${props => `${props.theme.sizing.base}px`};
`;

const TooltipInner = styled.span`
  color: #fff;
  display: block;
`;

const POSITION = {
  BOTTOM: "bottom",
  HORIZONTAL: "horizontal",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  VERTICAL: "vertical",
};

const defaults = {
  delay: 0,
  hideOnClick: true,
  passthrough: true,
  showOnClick: false,
  position: POSITION.VERTICAL,
};

const Tooltip = (options = {}) => {
  const {
    delay: defaultDelay,
    hideOnClick: defaultHideOnClick,
    showOnClick: defaultShowOnClick,
    position: defaultPosition,
  } = { ...defaults, ...options };

  return ComposedComponent => {
    return class TooltippedComponent extends React.Component {
      static propTypes = {
        /** React element(s) passed as a child of the tooltip */
        children: propTypes.node,
        /** Function called when the composed element loses focus */
        onBlur: propTypes.func,
        /** Function called when the composed element is clicked */
        onClick: propTypes.func,
        /** Function called when the composed element gains focus */
        onFocus: propTypes.func,
        /** Function called when the cursor enters the composed element */
        onMouseEnter: propTypes.func,
        /** Function called when the cursor leaves the composed element */
        onMouseLeave: propTypes.func,
        /** String or react element that displays as the tooltips label/body */
        tooltip: propTypes.oneOfType([propTypes.string, propTypes.node]),
        /** Number (in miliseconds) that delays the tooltip's mount/dismount to allow its' enter/exit animations to render */
        tooltipDelay: propTypes.number,
        /** Sets whether or not the tooltip will dismount if the composed element is clicked while the tooltip is active */
        tooltipHideOnClick: propTypes.bool,
        /** Sets whether or not the tooltip will dismount if the composed element loses focus */
        tooltipHideOnBlur: propTypes.bool,
        /** String that sets an HTML/CSS ID attribute on the tooltip */
        tooltipId: propTypes.string,
        /** Sets whether the tooltip displays above, below, to the left, or to the right of the composed component.  If 'horizontal', the tooltip will evaluate where there is more space to the left or right, 'vertical' top/bottom, then display where there is more space */
        tooltipPosition: propTypes.oneOf(
          Object.keys(POSITION).map(key => POSITION[key])
        ),
        /** Sets whether or not the tooltip renders on click of the composed component */
        tooltipShowOnClick: propTypes.bool,
        /** Sets whether the tooltip renders when the composed element gains focus */
        tooltipShowOnFocus: propTypes.bool,
      };

      static defaultProps = {
        tooltipDelay: defaultDelay,
        tooltipHideOnBlur: true,
        tooltipHideOnClick: defaultHideOnClick,
        tooltipPosition: defaultPosition,
        tooltipShowOnClick: defaultShowOnClick,
        tooltipShowOnFocus: true,
      };

      state = {
        active: false,
        position: this.props.tooltipPosition,
        visible: false,
      };

      componentWillUnmount() {
        if (this.tooltipNode)
          events.removeEventListenerOnTransitionEnd(
            this.tooltipNode,
            this.onTransformEnd
          );
        if (this.timeout) clearTimeout(this.timeout);
      }

      onTransformEnd = e => {
        if (e.propertyName === "transform") {
          events.removeEventListenerOnTransitionEnd(
            this.tooltipNode,
            this.onTransformEnd
          );
          this.setState({ visible: false });
        }
      };

      getPosition(element) {
        const { tooltipPosition } = this.props;
        if (tooltipPosition === POSITION.HORIZONTAL) {
          const origin = element.getBoundingClientRect();
          const { width: ww } = getViewport();
          const toRight = origin.left < ww / 2 - origin.width / 2;
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } else if (tooltipPosition === POSITION.VERTICAL) {
          const origin = element.getBoundingClientRect();
          const { height: wh } = getViewport();
          const toBottom = origin.top < wh / 2 - origin.height / 2;
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        }
        return tooltipPosition;
      }

      activate({ top, left, position }) {
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ visible: true, position });
        this.timeout = setTimeout(() => {
          this.setState({ active: true, top, left });
        }, this.props.tooltipDelay);
      }

      deactivate() {
        if (this.timeout) clearTimeout(this.timeout);
        if (this.state.active) {
          events.addEventListenerOnTransitionEnd(
            this.tooltipNode,
            this.onTransformEnd
          );
          this.setState({ active: false });
        } else if (this.state.visible) {
          this.setState({ visible: false });
        }
      }

      calculatePosition(element) {
        const position = this.getPosition(element);
        const { top, left, height, width } = element.getBoundingClientRect();
        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;
        if (position === POSITION.BOTTOM) {
          return {
            top: top + height + yOffset,
            left: left + width / 2 + xOffset,
            position,
          };
        } else if (position === POSITION.TOP) {
          return {
            top: top + yOffset,
            left: left + width / 2 + xOffset,
            position,
          };
        } else if (position === POSITION.LEFT) {
          return {
            top: top + height / 2 + yOffset,
            left: left + xOffset,
            position,
          };
        } else if (position === POSITION.RIGHT) {
          return {
            top: top + height / 2 + yOffset,
            left: left + width + xOffset,
            position,
          };
        }
        return undefined;
      }

      handleMouseEnter = e => {
        if (e.type === "mouseenter") {
          this.activate(this.calculatePosition(e.currentTarget));
          if (this.props.onMouseEnter) this.props.onMouseEnter(e);
        }
      };

      handleMouseLeave = e => {
        if (e.type === "mouseleave") {
          this.deactivate();
          if (this.props.onMouseLeave) this.props.onMouseLeave(e);
        }
      };

      handleClick = e => {
        if (this.props.tooltipHideOnClick && this.state.active) {
          this.deactivate();
        }
        if (this.props.tooltipShowOnClick && !this.state.active) {
          this.activate(this.calcuatePosition(e.currentTarget));
        }
        if (this.props.onClick) this.props.onClick(e);
      };

      handleFocus = e => {
        if (this.props.tooltipShowOnFocus && !this.state.active)
          this.activate(this.calculatePosition(e.currentTarget));
        if (this.props.onFocus) this.props.onFocus(e);
      };

      handleBlur = e => {
        if (this.props.tooltipHideOnBlur && this.state.active)
          this.deactivate();
        if (this.props.onBlur) this.props.onBlur(e);
      };

      render() {
        const { active, left, top, position, visible } = this.state;
        const {
          children,
          onClick, // eslint-disable-line no-unused-vars
          onMouseEnter, // eslint-disable-line no-unused-vars
          onMouseLeave, // eslint-disable-line no-unused-vars
          tooltip,
          tooltipDelay, // eslint-disable-line no-unused-vars
          tooltipHideOnClick, // eslint-disable-line no-unused-vars
          tooltipPosition, // eslint-disable-line no-unused-vars
          tooltipShowOnClick, // eslint-disable-line no-unused-vars
          tooltipId,
          ...other
        } = this.props;

        const childProps = {
          ...other,
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        };

        return React.createElement(
          ComposedComponent,
          childProps,
          children,
          visible && (
            <Portal>
              <TooltipOuter
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                top={top}
                left={left}
                position={position}
                active={active}
                ref={node => {
                  this.tooltipNode = node;
                }}
                role="tooltip"
                id={tooltipId}
              >
                <TooltipInner
                  innerRef={node => {
                    this.innerNode = node;
                  }}
                >
                  {tooltip}
                </TooltipInner>
              </TooltipOuter>
            </Portal>
          )
        );
      }
    };
  };
};

export default Tooltip();
