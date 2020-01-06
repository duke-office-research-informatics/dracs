import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";
import Transition from "react-transition-group/Transition";
import ActivableRenderer from "../../utils/toggle-renderer/toggleRenderer.js";
import Portal from "../../utils/portal/portal.js";
import Overlay from "../overlay/overlay.js";

const DrawerEl = styled.aside`
  display: ${p => (p.insideTree ? (p.active ? "block" : "none") : null)};
  position: ${p => (p.insideTree ? null : "fixed")};
  top: 0;
  ${p => (p.type === "left" ? "left: 0;" : null)};
  ${p => (p.type === "right" ? "right: 0;" : null)};
  width: 400px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: ${p => p.theme.zIndex.xl + 1};
  pointer-events: ${p => (p.active ? "all" : "none")};
  box-shadow: ${p => p.theme.boxShadow.shadow2px};
  color: ${p => (p.textColor ? p.textColor : "#fff")};
  background-color: ${p =>
    p.backgroundColor ? p.backgroundColor : p.theme.colors.darkBlue};
  transform-style: preserve-3d;
  transition: transform ${p => `${p.delay}ms`} cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  transform: ${p =>
    p.insideTree
      ? null
      : p.active
      ? "translateX(0)"
      : p.type === "right"
      ? "translateX(100%)"
      : "translateX(calc(-1 * 100%))"};
  transform-origin: ${p => p.type};
  @media (max-width: 768px) {
    width: 280px;
  }
`;

class Drawer extends React.PureComponent {
  static propTypes = {
    /** Boolean that sets whether or not the Drawer will render */
    active: propTypes.bool,
    /** CSS-consumable string (hex, rgba, etc) color declaration for Drawer background color */
    backgroundColor: propTypes.string,
    /** React element(s) to display in the drawer */
    children: propTypes.node,
    /** style object to customize the drawer with inline styles */
    drawerStyle: propTypes.object,
    /** Number (in miliseconds) that will delay the drawer mount and dismount to allow for animations to render */
    delay: propTypes.number,
    /** Ref (functional) that targets the drawer's html/dom node */
    drawerRef: propTypes.func,
    /** Boolean that sets whether or not Drawer uses a portal */
    insideTree: propTypes.bool,
    insideTreeWrapper: propTypes.oneOfType([
      propTypes.node,
      propTypes.element,
      propTypes.object,
      propTypes.func,
    ]),
    /** Function that will be called when the user hits the `esc` key.  For accessibility reasons, this function should close the drawer */
    onEscKeyDown: propTypes.func,
    /** Function that will be called when the user clicks on the overlay beneath the dialog.  For accessibility reasons, this function should close the drawer */
    onOverlayClick: propTypes.func,
    /** CSS-consumable string (hex, rgba, etc) color declaration for unwrapped body text in the drawer body */
    textColor: propTypes.string,
    /** String that sets whether the Drawer moves in from the right or left */
    type: propTypes.oneOf(["left", "right"]),
    /** Boolean that sets whether or not the drawer has an overlay with a focus trap */
    withOverlay: propTypes.bool,
    /** JS style object for the drawer's wrapper */
    wrapperStyle: propTypes.object,
  };

  static defaultProps = {
    active: false,
    delay: 400,
    insideTree: false,
    type: "right",
    withOverlay: true,
  };

  state = {
    visible: false,
  };

  onEntered = () => this.setState({ visible: true });

  onExit = () => this.setState({ visible: false });

  getContent = () => {
    const {
      active,
      backgroundColor,
      children,
      delay,
      drawerStyle,
      drawerRef,
      insideTree,
      textColor,
      type,
    } = this.props;
    return (
      <Transition
        appear
        in={active}
        mountOnEnter
        onEntered={this.onEntered}
        onExit={this.onExit}
        timeout={insideTree ? 0 : delay}
      >
        <DrawerEl
          active={this.state.visible}
          backgroundColor={backgroundColor}
          delay={delay}
          ref={drawerRef}
          insideTree={insideTree}
          style={drawerStyle}
          tabIndex={-1}
          textColor={textColor}
          type={type}
        >
          {children}
        </DrawerEl>
      </Transition>
    );
  };

  render() {
    const {
      active,
      insideTree,
      insideTreeWrapper,
      onOverlayClick,
      onEscKeyDown,
      withOverlay,
    } = this.props;

    return React.createElement(
      insideTree ? (insideTreeWrapper ? insideTreeWrapper : "div") : Portal,
      {},
      (withOverlay && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: <DrawerEl />,
          }}
        />
      ),
      withOverlay && (
        <Overlay
          active={active}
          onClick={onOverlayClick}
          onEscKeyDown={onEscKeyDown}
          zIndex
        />
      )),
      this.getContent()
    );
  }
}

export default ActivableRenderer({
  delay: Drawer && Drawer.props ? Drawer.props.delay : 400,
})(Drawer);
