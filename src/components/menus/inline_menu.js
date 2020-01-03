import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import styledMap from "styled-map";
import Portal from "../../utils/portal/portal.js";
import events from "../../utils/events/events.js";
import { getViewport } from "../../utils/utils/utils.js";
import IconEdit from "../../icons/edit/edit.js";
import colors from "../../theme/colors/colorTheme.js";
/**
This menu uses a portal and reactDOM to position itself
so that it can display outside of wrappers that hide their overflow,
escaped stacking contexts and z-indices, etc
for more info --
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
https://reactjs.org/docs/portals.html
*/
const inactiveTransform = styledMap("position", {
  aboveleft: "scale(0) translateX(0) translateY(-100%) translateZ(0)",
  aboveright: "scale(0) translateX(-100%) translateY(-100%) translateZ(0)",
  belowleft: "scale(0) translateX(0) translateZ(0)",
  belowright: "scale(0) translateX(-100%) translateZ(0)",
});

const activeTransform = styledMap("position", {
  aboveleft: "scale(1) translateX(0) translateY(-100%) translateZ(0)",
  aboveright: "scale(1) translateX(-100%) translateY(-100%) translateZ(0)",
  belowleft: "scale(1) translateX(0) translateZ(0)",
  belowright: "scale(1) translateX(-100%) translateZ(0)",
});

const ComponentWrap = styled.div`
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  width: ${p => (p.width ? p.width : "auto")};
`;

const MenuTrigger = styled.div`
  position: absolute;
  right: 0;
  bottom: -21px;
  margin: 0;
  padding: 0;
  opacity: 0;
  vertical-align: top;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  border: solid 1px ${p => p.theme.colors.actionHover};
  border-radius: 0 0 3px 3px;
  z-index: ${p => p.theme.zIndex.xl};
  box-shadow: ${p => p.theme.boxShadow.shadow2px};
  background-color: #fff;
  height: 18px;
`;

const TriggerWrap = styled.div.attrs({
  disabled: p => (p.disabled ? true : false),
})`
  position: relative;
  display: inline-flex;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 100%;
  border-bottom: ${p =>
    p["aria-haspopup"] && p.role === "button" ? "solid 4px transparent" : null};
  cursor: ${p =>
    p["aria-haspopup"] && p.role === "button" ? "pointer" : null};
  text-align: left;
  margin-bottom: ${p => (p.displayTrigger ? "8px" : null)};
  &:hover,
  &:focus {
    ${MenuTrigger} {
      opacity: 1;
    }
    border-bottom: ${p =>
      p["aria-haspopup"] && p.role === "button"
        ? `solid 4px ${p.theme.colors.actionHover}`
        : null};
  }
  &:focus::before {
    outline: dotted 1px rgb(59, 153, 252);
  }
`;

//any child of this div should not change opacity
const MenuWrap = styled.div`
  position: absolute;
  display: ${p => (p.visible ? "flex" : "none")};
  top: ${p => (p.top ? `${p.top}px` : null)};
  bottom: ${p => (p.bottom ? `${p.bottom}px` : null)};
  left: ${p => `${p.left}px`};
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${p => p.theme.colors.bg};
  box-shadow: ${props => props.theme.boxShadow.shadow3px};
  padding: ${p => (p.padding ? p.padding : null)};
  height: ${p => (p.height ? p.height : "auto")};
  max-height: ${p => (p.maxHeight ? p.maxHeight : null)};
  width: ${p => (p.width ? p.width : "auto")};
  max-width: ${p => (p.maxWidth ? p.maxWidth : null)};
  z-index: ${p => p.theme.zIndex.xl};
  will-change: transform;
  transform: ${p => (p.active ? activeTransform : inactiveTransform)};
  transform-origin: ${p => (p.active ? "center" : "bottom left")};
  transition: ${p =>
    p.animateMenu ? "all 0.3s linear" : "transform-origin 1ms"};
`;

const ORIENT = {
  AUTO: "auto",
  ABOVE: "above",
  BELOW: "below",
};

const JUSTIFY = {
  AUTO: "auto",
  LEFT: "left",
  RIGHT: "right",
};

class InlineMenu extends React.Component {
  static propTypes = {
    /** Sets whether or not menu is displayed on mount/update */
    active: propTypes.bool,
    /** Sets whether menu animates when activated */
    animateMenu: propTypes.bool,
    /** React element(s) passed as a child of the menu --  where the action happens */
    children: propTypes.node,
    /** Sets whether a click/touch outside of the menu will close it */
    closeMenuOnOutsideClick: propTypes.bool,
    /** Sets whether menu covers the composed component or displays below/above it */
    coverTriggerOnActive: propTypes.bool,
    /** function that is triggered in parent component when menu is deactivated and props.active = true */
    deactivateCallback: propTypes.func,
    /** sets whether the inline menu trigger is disabled */
    disabled: propTypes.bool,
    /* Sets whether the menu trigger is rendered */
    displayTrigger: propTypes.oneOf(["onHover", true, false]),
    /** sets whether the menu is justified automatically based on viewport space, or to the left or right side of the component */
    justify: propTypes.oneOf(Object.keys(JUSTIFY).map(key => JUSTIFY[key])),
    /** CSS classname to attach to menu node */
    menuClassName: propTypes.string,
    /** Number (in miliseconds) that delays the menu's mount/dismount to allow its' enter/exit animations to render */
    menuDelay: propTypes.number,
    /** HTML ID to attach to menu node */
    menuId: propTypes.string,
    /** Style object for the menu */
    menuStyle: propTypes.object,
    /** Sets an offset (number in px values) to the menu's top position (currently only when `oritentation` = `below`)*/
    menuTopOffset: propTypes.number,
    /** Function called when the composed element loses focus */
    onBlur: propTypes.func,
    /** Function called when the composed element is clicked */
    onClick: propTypes.func,
    /** Function called when the composed element gains focus */
    onFocus: propTypes.func,
    /** Function called on wrapper keyUp */
    onKeyUp: propTypes.func,
    /** Function called when the cursor enters the composed element */
    onMouseEnter: propTypes.func,
    /** Function called when the cursor leaves the composed element */
    onMouseLeave: propTypes.func,
    /** Function called on end of touch press of composed component/wrapper */
    onTouchEnd: propTypes.func,
    /** Function called on start of touch press of composed component/wrapper */
    onTouchStart: propTypes.func,
    /** Sets whether the menu body is oriented automatically or above or below the composed component. */
    orient: propTypes.oneOf(Object.keys(ORIENT).map(key => ORIENT[key])),
    /** sets whether the menu trigger will automatically open the menu on click --- defaults to true **/
    renderMenuOnWrapperClick: propTypes.bool,
    /** sets whether the menu trigger will automatically open the menu on touchend --- defaults to true **/
    renderMenuOnWrapperTouchEnd: propTypes.bool,
    /** Element that is to be edited/displayed in the menu, passed in a a child of the 'trigger' */
    triggerChild: propTypes.oneOfType([
      propTypes.node,
      propTypes.element,
      propTypes.object,
    ]),
    /** DRACS icon to be used in the trigger button */
    triggerIcon: propTypes.func,
    /** Functional ref that gets passed to trigger/trigger button as required */
    triggerRef: propTypes.func,
    /** Style object for the trigger */
    triggerStyle: propTypes.object,
    /** CSS-consumable string (px, em, calc, etc) that sets the width of the menu trigger wrapper div */
    triggerWidth: propTypes.string,
    /** classname for wrapper */
    wrapperClassName: propTypes.string,
    /** html id for wrapper */
    wrapperId: propTypes.string,
    /** Style object for the wrapper */
    wrapperStyle: propTypes.object,
  };

  static defaultProps = {
    animateMenu: true,
    closeMenuOnOutsideClick: true,
    coverTriggerOnActive: true,
    displayTrigger: true,
    justify: JUSTIFY.AUTO,
    menuDelay: 0,
    openOnClick: true,
    orient: ORIENT.AUTO,
    renderMenuOnWrapperClick: true,
    renderMenuOnWrapperTouchEnd: true,
    triggerIcon: IconEdit,
  };

  state = {
    active: false,
    position: null,
    visible: false,
  };

  componentDidMount() {
    if (this.props.active && this.componentWrapper) {
      this.setMenu();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      if (
        prevProps.active === false &&
        this.props.active === true &&
        this.componentWrapper
      ) {
        this.setMenu();
      } else if (prevProps.active === true && this.props.active === false) {
        this.deactivate();
      }
    }
  }

  componentWillUnmount() {
    if (this.menuNode)
      events.removeEventListenerOnTransitionEnd(
        this.menuNode,
        this.onTransformEnd
      );

    if (this.timeout) clearTimeout(this.timeout);

    if (this.props.closeMenuOnOutsideClick)
      events.removeEventsFromDocument(this.getDocumentEvents());
  }

  onTransformEnd = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e && e.propertyName === "transform-origin") {
      events.removeEventListenerOnTransitionEnd(
        this.menuNode,
        this.onTransformEnd
      );
      this.setState({ visible: false }, () => {
        if (this.trigger) this.trigger.focus();
      });
    }
  };

  getOrientation(element) {
    const { orient } = this.props;
    if (orient === ORIENT.AUTO && element) {
      const origin = element.getBoundingClientRect();
      const { height: wh } = getViewport();
      const toBottom = origin.top < wh / 2 - origin.height / 2;
      return toBottom ? ORIENT.BELOW : ORIENT.ABOVE;
    } else if (element) {
      return orient;
    } else {
      return undefined;
    }
  }

  getJustification(element) {
    const { justify } = this.props;
    if (justify === JUSTIFY.AUTO && element) {
      const origin = element.getBoundingClientRect();
      const { width: ww } = getViewport();
      const toRight = origin.left < ww / 2 - origin.width / 2;
      return toRight ? JUSTIFY.RIGHT : JUSTIFY.LEFT;
    } else if (element) {
      return justify;
    } else {
      return undefined;
    }
  }

  calculatePosition(element) {
    const orientation = this.getOrientation(element);
    const justification = this.getJustification(element);
    const position = `${orientation}${justification}`;

    const { top, left, width, bottom } = element.getBoundingClientRect();
    const xOffset = window.scrollX || window.pageXOffset;
    const yOffset = window.scrollY || window.pageYOffset;
    if (orientation === ORIENT.BELOW) {
      const newTop = () => {
        if (this.props.coverTriggerOnActive) {
          if (this.props.menuTopOffset) {
            return (top - this.props.menuTopOffset).toFixed(3);
          } else {
            return top.toFixed(3);
          }
        } else {
          if (this.props.menuTopOffset) {
            return (bottom - this.props.menuTopOffset).toFixed(3);
          } else {
            return bottom.toFixed(3);
          }
        }
      };
      if (justification === JUSTIFY.LEFT) {
        return {
          top: parseInt(newTop()),
          left: parseInt((left + xOffset).toFixed(3)),
          position,
        };
      } else if (justification === JUSTIFY.RIGHT) {
        return {
          top: parseInt(newTop()),
          left: parseInt((left + width + xOffset).toFixed(3)),
          position,
        };
      }
    } else if (orientation === ORIENT.ABOVE) {
      const newTop = () => {
        if (this.props.coverTriggerOnActive) {
          if (this.props.menuTopOffset) {
            return (bottom + yOffset - this.props.menuTopOffset).toFixed(3);
          } else {
            return (bottom + yOffset).toFixed(3);
          }
        } else {
          if (this.props.menuTopOffset) {
            return (top + yOffset - this.props.menuTopOffset).toFixed(3);
          } else {
            return (top + yOffset).toFixed(3);
          }
        }
      };
      if (justification === JUSTIFY.LEFT) {
        return {
          top: parseInt(newTop()),
          left: parseInt((left + xOffset).toFixed(3)),
          position,
        };
      } else if (justification === JUSTIFY.RIGHT) {
        return {
          top: parseInt(newTop()),
          left: parseInt((left + width + xOffset).toFixed(3)),
          position,
        };
      }
    }
    return undefined;
  }

  setMenu = () => {
    this.activate(this.calculatePosition(this.componentWrapper));
  };

  updateMenuPosition = () => {
    if (this.state.active && this.state.visible && this.componentWrapper) {
      const newPos = this.calculatePosition(this.componentWrapper);
      this.setState({
        position: newPos.position,
        top: newPos.top,
        left: newPos.left,
      });
    }
  };

  activate({ top, left, position }) {
    if ((top, left, position)) {
      if (this.timeout) clearTimeout(this.timeout);
      this.setState({ visible: true, position });
      window.addEventListener("scroll", this.updateMenuPosition, true);
      window.addEventListener("resize", this.updateMenuPosition);
      window.addEventListener("keydown", this.handleMenuEscKeyDown);
      this.timeout = setTimeout(() => {
        this.setState({ active: true, top, left }, () => {
          this.menuNode.focus();
          if (this.props.closeMenuOnOutsideClick) {
            // console.log("add close on outside click");
            events.addEventsToDocument(this.getDocumentEvents());
          }
        });
      }, this.props.menuDelay);
    } else {
      return console.warn(
        "The inline menu component does not have a parent element defined."
      );
    }
  }

  deactivate(e) {
    window.removeEventListener("scroll", this.updateMenuPosition);
    window.removeEventListener("resize", this.updateMenuPosition);
    window.removeEventListener("keydown", this.handleMenuEscKeyDown);
    if (this.timeout) clearTimeout(this.timeout);
    if (this.state.active) {
      events.addEventListenerOnTransitionEnd(
        this.menuNode,
        this.onTransformEnd
      );
      this.setState({ active: false }, () => {
        if (this.props.closeMenuOnOutsideClick) {
          // console.log("remoce close on outside click events");
          events.removeEventsFromDocument(this.getDocumentEvents());
        }
      });
    } else if (this.state.visible) {
      this.setState({ visible: false }, () => {
        if (this.trigger) this.trigger.focus();
      });
    }
    if (this.props.active && this.props.deactivateCallback) {
      this.props.deactivateCallback(e);
    }
  }

  getDocumentEvents = () => {
    return {
      click: this.handleDocumentClick,
      focusin: this.handleDocumentClick,
      focusout: this.handleDocumentClick,
      touchend: this.handleDocumentClick,
    };
  };

  handleDocumentClick = e => {
    if (
      this.state.active &&
      this.componentWrapper &&
      !events.targetIsDescendant(e, this.menuNode) &&
      !events.targetIsDescendant(e, this.componentWrapper)
    ) {
      this.deactivate(e);
    }
  };

  handleMenuEscKeyDown = e => {
    if (
      this.state.active &&
      this.menuNode &&
      events.targetIsDescendant(e, this.menuNode)
    ) {
      if (e.keyCode === 27) {
        this.deactivate(e);
      }
    }
  };

  handleClick = e => {
    if (e.type === "click") {
      if (!this.state.active && this.componentWrapper) {
        this.setMenu();
      }
      if (this.state.active) {
        this.deactivate(e);
      }
      if (this.props.onClick) this.props.onClick(e);
    }
  };

  handleTouchEnd = e => {
    if (e.type === "touchend") {
      if (!this.state.active && this.componentWrapper) {
        this.setMenu();
      }
      if (this.state.active) {
        this.deactivate(e);
      }
      if (this.props.onTouchEnd) this.props.onTouchEnd(e);
    }
  };

  render() {
    const { active, bottom, left, top, position, visible } = this.state;
    const {
      animateMenu,
      children,
      disabled,
      displayTrigger,
      onKeyUp,
      menuClassName,
      menuId,
      menuStyle,
      renderMenuOnWrapperClick,
      renderMenuOnWrapperTouchEnd,
      triggerChild,
      triggerRef,
      triggerStyle,
      triggerWidth,
      wrapperStyle,
    } = this.props;

    return (
      <ComponentWrap
        innerRef={node => (this.componentWrapper = node)}
        style={wrapperStyle}
        width={triggerWidth}
      >
        <TriggerWrap
          aria-expanded={active}
          aria-haspopup={true}
          role={
            renderMenuOnWrapperClick && renderMenuOnWrapperTouchEnd
              ? "button"
              : null
          }
          displayTrigger={displayTrigger}
          innerRef={node => {
            if (triggerRef) triggerRef(node);
            this.trigger = node;
          }}
          onClick={renderMenuOnWrapperClick ? this.handleClick : null}
          onTouchEnd={renderMenuOnWrapperTouchEnd ? this.handleTouchEnd : null}
          onKeyUp={onKeyUp}
          tabIndex={
            renderMenuOnWrapperClick && renderMenuOnWrapperTouchEnd ? "0" : null
          }
        >
          {triggerChild ? triggerChild : null}
          {displayTrigger ? (
            <MenuTrigger style={triggerStyle}>
              <this.props.triggerIcon
                size={16}
                color={disabled ? colors.muted : colors.actionHover}
              />
            </MenuTrigger>
          ) : null}
        </TriggerWrap>
        {visible ? (
          <Portal
            style={{
              display: "flex",
              flex: "1 1 auto",
              position: "absolute",
              top: 0,
            }}
          >
            <MenuWrap
              active={active}
              animateMenu={animateMenu}
              bottom={bottom}
              aria-hidden={!active}
              role="menu"
              className={menuClassName}
              id={menuId}
              innerRef={node => (this.menuNode = node)}
              left={left}
              position={position}
              style={menuStyle}
              top={top}
              visible={visible}
            >
              {children}
            </MenuWrap>
          </Portal>
        ) : null}
      </ComponentWrap>
    );
  }
}

export default InlineMenu;
