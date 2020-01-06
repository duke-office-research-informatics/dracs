import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import styledMap from "styled-map";
import FocusTrap from "focus-trap-react";
import Transition from "react-transition-group/Transition";

import Portal from "../../utils/portal/portal.js";
import Overlay from "../overlay/overlay.js";
import ActivableRenderer from "../../utils/toggle-renderer/toggleRenderer.js";

const PortalStyle = {
  position: "fixed",
  zIndex: 500,
  top: 0,
  left: 0,
  display: "flex",
  width: "100vw",
  height: "100vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const maxWidth = styledMap("maxWidth", {
  small: "400px",
  medium: "700px",
  large: "96vw",
  fullscreen: "100vw",
  auto: "auto",
});

const ModalBody = styled.section`
  position: relative;
  background-color: #fff;
  border-radius: ${props => props.theme.sizing.borderRadius}px;
  box-shadow: ${props => props.theme.boxShadow.zdepth5};
  display: flex;
  flex-direction: column;
  min-width: ${p => (p.minWidth ? p.minWidth : null)};
  max-width: ${maxWidth};
  margin: ${p => p.margin};
  width: ${p => (p.width ? p.width : null)};
  min-height: ${p => (p.minHeight ? p.minHeight : null)};
  max-height: ${p => (p.maxHeight ? p.maxHeight : null)};
  height: ${p => (p.height ? p.height : null)};
  padding: ${p => (p.padding ? p.padding : `${p.theme.sizing.base}px`)};
  overflow-y: auto;
  overflow-x: hidden;
  z-index: ${p => p.theme.zIndex.xl + 1};
  opacity: ${p => (p.active ? 1 : 0)};
  transform: ${p =>
    p.active
      ? p.keyboardTransform
        ? `translateY(-1 * ${p.keyboardTransform}px)`
        : "translateY(0%)"
      : "translateY(calc(-1 * 40px))"};
  transition: all ${p => `${p.delay}ms`} cubic-bezier(0.4, 0, 0.2, 1);
  -ms-overflow-style: none;
`;

let animationDelay = 300;

class Modal extends React.PureComponent {
  static propTypes = {
    /** Sets whether or not the modal renders */
    active: propTypes.bool,
    /** React element(s) passed as a child of the modal */
    children: propTypes.node,
    /** Number in miliseconds that delays the component's mount/dismount so that the modal's enter and exit animations have time to render */
    delay: propTypes.number,
    /** CSS consumable (px, vh, em, etc) string that sets the height of the component */
    height: propTypes.string,
    /** CSS consumable (px, vh, em, etc) string that sets the minimum height of the component */
    minHeight: propTypes.string,
    /** CSS consumable (px, vh, em, etc) string that sets the maximum height of the component */
    maxHeight: propTypes.string,
    /** Dom node element (almost always a ref to a child of the Modal component) that will gain focus when the modal is rendered */
    initialFocusEl: propTypes.oneOfType([
      propTypes.node,
      propTypes.element,
      propTypes.object,
    ]),
    /**CSS classname to apply to the modal wrapper */
    modalClassName: propTypes.string,
    /** Style object that applies custom styles to the modal wrapper */
    modalStyle: propTypes.object,
    /** Function that will be called when the user hits the `esc` key.  For accessibility reasons, this function should close the dialog */
    onEscKeyDown: propTypes.func,
    /** Function that will be called when the user clicks on the overlay beneath the dialog.  For accessibility reasons, this function should close the dialog */
    onOverlayClick: propTypes.func,
    /** Function that will be called when the user begins to click on the overlay. */
    onOverlayMouseDown: propTypes.func,
    /** Function that will be called when the user moves the mouse cursor in the overlay. */
    onOverlayMouseMove: propTypes.func,
    /** Function that will be called when the user ends a click on the overlay. */
    onOverlayMouseUp: propTypes.func,
    /**CSS classname to apply to the modal overlay */
    overlayClassName: propTypes.string,
    /** Style object that overwrites the default overlay style with custom styling */
    overlayStyle: propTypes.object,
    /** CSS consumable (px, vh, em, etc) string that sets the padding of the component */
    padding: propTypes.string,
    pauseFocusTrap: propTypes.bool,
    /** Dom node that is passed to the portal to denote which element the Modal should be a child of -- defaults to the document body */
    portalContainer: propTypes.oneOfType([propTypes.node, propTypes.object]),
    /**CSS class to apply to the portal */
    portalClassName: propTypes.string,
    /** Style object for overriding the default portal style */
    portalStyle: propTypes.object,
    /** CSS consumable (px, vw, em, etc) string that sets the width of the component */
    width: propTypes.string,
    /** CSS consumable (px, vw, em, etc) string that sets the minimum width of the component */
    minWidth: propTypes.string,
    /** String that sets a pre-set width for the modal. small: '400px', medium: '700px', large: '96vw', fullscreen: '100vw', auto: 'auto' */
    maxWidth: propTypes.oneOf([
      "small",
      "medium",
      "large",
      "fullscreen",
      "auto",
    ]),
    /** CSS consumable (px, vh, em, etc) string that sets the margin of the component */
    margin: propTypes.string,
  };

  static defaultProps = {
    delay: 300,
    portalStyle: PortalStyle,
    pauseFocusTrap: false,
  };

  state = {
    visible: false,
  };

  onEntered = () => this.setState({ visible: true });

  onExit = () => this.setState({ visible: false });

  render() {
    animationDelay = this.props.delay;
    return (
      <Portal
        container={this.props.portalContainer}
        style={this.props.portalStyle}
        className={`dracs-modal ${this.props.overlayClassName}`}
      >
        <Transition
          appear
          in={this.props.active}
          mountOnEnter
          onEntered={this.onEntered}
          onExit={this.onExit}
          timeout={this.props.delay}
          unmountOnExit
        >
          <FocusTrap
            className="modal-focus-trap"
            focusTrapOptions={{
              fallbackFocus: this.modalBody,
              initialFocus: this.props.initialFocusEl
                ? this.props.initialFocusEl
                : null,
            }}
            paused={this.props.pauseFocusTrap}
          >
            <Overlay
              active={this.props.active}
              delay={100}
              onClick={this.props.onOverlayClick}
              onEscKeyDown={this.props.onEscKeyDown}
              onMouseDown={this.props.onOverlayMouseDown}
              onMouseMove={this.props.onOverlayMouseMove}
              onMouseUp={this.props.onOverlayMouseUp}
              style={this.props.overlayStyle}
              className={this.props.overlayClassName}
            />
            <ModalBody
              ref={node => (this.modalBody = node)}
              active={this.state.visible}
              delay={this.props.delay}
              tabIndex={-1}
              padding={this.props.padding}
              height={this.props.height}
              margin={this.props.margin}
              minHeight={this.props.minHeight}
              maxHeight={this.props.maxHeight}
              width={this.props.width}
              minWidth={this.props.minWidth}
              maxWidth={this.props.maxWidth}
              style={this.props.modalStyle}
              className={this.props.modalClassName}
            >
              {this.props.children}
            </ModalBody>
          </FocusTrap>
        </Transition>
      </Portal>
    );
  }
}

export default ActivableRenderer({ delay: animationDelay })(Modal);
