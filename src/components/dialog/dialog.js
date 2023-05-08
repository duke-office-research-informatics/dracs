import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import styledMap from "styled-map";
import FocusTrap from "focus-trap-react";
import Transition from "react-transition-group/Transition";

import Portal from "../../utils/portal/portal.js";
import Overlay from "../overlay/overlay.js";
import ActivableRenderer from "../../utils/toggle-renderer/toggleRenderer.js";
import Button from "../button/base/button.js";
import { H3 } from "../typography/typography.js";

const bodyWidth = styledMap("type", {
  auto: "auto",
  small: "300px",
  medium: "700px",
  large: "96vw",
  quarterScreen: "25vw",
  halfScreen: "50vw",
  thirtyPctScreen: "30vw",
});

const PortalStyle = {
  position: "fixed",
  zIndex: 1000,
  top: 0,
  left: 0,
  display: "flex",
  width: "100vw",
  height: "100vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const DialogBody = styled.section`
  position: relative;
  background-color: #fff;
  border-radius: ${props => props.theme.sizing.borderRadius}px;
  box-shadow: ${props => props.theme.boxShadow.zdepth5};
  display: flex;
  flex-direction: column;
  max-width: 96vw;
  width: ${bodyWidth};
  padding: ${p => `${p.theme.sizing.base}px ${p.theme.sizing.base * 2}px`};
  z-index: ${p => p.theme.zIndex.xl + 1};
  overflow-y: auto;
  overflow-x: hidden;
  opacity: ${p => (p.active ? 1 : 0)};
  transform: ${p =>
    p.active ? "translateY(calc(-1 * 40px))" : "translateY(0%)"};
  transition: all ${p => `${p.delay}ms`} cubic-bezier(0.4, 0, 0.2, 1);
  -ms-overflow-style: none;
`;

const DialogTitle = styled(H3)`
  color: ${props => props.theme.colors.base};
`;

const DialogActions = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

let animationDelay = 300;

export class Dialog extends React.PureComponent {
  static propTypes = {
    /** Array of objects, in which each object maps to the props for the DRACS `Button` component */
    actions: propTypes.array,
    /** Boolean that sets whether or not the Dialog will render */
    active: propTypes.bool,
    /** React element(s) that will be children of this component */
    children: propTypes.node,
    /** String that sets optional CSS className */
    className: propTypes.string,
    /** Number (in miliseconds) that will delay the dialog mount and dismount to allow for animations to render */
    delay: propTypes.number,
    /** Function that will be called when the user hits the `esc` key.  For accessibility reasons, this function should close the dialog */
    escKeyDown: propTypes.func,
    /** Function that will be called when the user clicks on the overlay beneath the dialog.  For accessibility reasons, this function should close the dialog */
    onOverlayClick: propTypes.func,
    /** Function that will be called when the user begins to click on the overlay. */
    onOverlayMouseDown: propTypes.func,
    /** Function that will be called when the user moves the mouse cursor in the overlay. */
    onOverlayMouseMove: propTypes.func,
    /** Function that will be called when the user ends a click on the overlay. */
    onOverlayMouseUp: propTypes.func,
    portalStyle: propTypes.object,
    /** String that sets the dialog title */
    title: propTypes.string.isRequired,
    /** String that sets the desired width of the component, `small` = 300px, `medium` = 700px, `large` = 94vw (94% screen width) */
    type: propTypes.oneOf([
      "auto",
      "small",
      "medium",
      "large",
      "quarterScreen",
      "halfScreen",
      "thirtyPctScreen",
    ]),
  };

  static defaultProps = {
    delay: animationDelay,
    portalStyle: PortalStyle,
  };

  state = {
    visible: false,
  };

  renderActions = () => {
    return this.props.actions.map((action, idx) => {
      return <Button style={{ marginLeft: "4px" }} key={idx} {...action} />;
    });
  };

  onEntered = () => this.setState({ visible: true });

  onExit = () => this.setState({ visible: false });

  render() {
    animationDelay = this.props.delay;
    return (
      <Portal
        style={this.props.portalStyle}
        className={`dracs-dialog ${this.props.className}`}
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
            focusTrapOptions={{
              fallbackFocus: this.body,
            }}
          >
            <div>
              <Overlay
                active={this.props.active}
                delay={100}
                onClick={this.props.onOverlayClick}
                escKeyDown={this.props.escKeyDown}
                onMouseDown={this.props.onOverlayMouseDown}
                onMouseMove={this.props.onOverlayMouseMove}
                onMouseUp={this.props.onOverlayMouseUp}
              />
              <DialogBody
                active={this.state.visible}
                aria-labelledby="dracs-dialog-title"
                delay={this.props.delay}
                type={this.props.type}
                role="dialog" //eslint-disable-line
                ref={node => (this.body = node)}
                tabIndex={-1}
              >
                {this.props.title ? (
                  <DialogTitle id="dracs-dialog-title" bold>
                    {this.props.title}
                  </DialogTitle>
                ) : null}
                {this.props.children}
                {this.renderActions().length ? (
                  <DialogActions>{this.renderActions()}</DialogActions>
                ) : null}
              </DialogBody>
            </div>
          </FocusTrap>
        </Transition>
      </Portal>
    );
  }
}

export default ActivableRenderer({ delay: animationDelay })(Dialog);
