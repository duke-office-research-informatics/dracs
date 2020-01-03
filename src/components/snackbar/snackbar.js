import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import Transition from "react-transition-group/Transition";

import ActivableRenderer from "../../utils/toggle-renderer/toggleRenderer.js";
import Portal from "../../utils/portal/portal.js";

const PortalStyle = {
  position: "fixed",
  bottom: 0,
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1001,
};

const SnackWrap = styled.div`
  display: flex;
  max-height: 48px;
  min-width: 288px;
  max-width: 568px;
  padding: 14px 24px;
  font-size: 0.875em;
  background-color: #323232;
  color: ${p => (p.labelColor ? p.labelColor : "#fff")};
  border-radius: 2px;
  align-items: center;
  justify-content: ${p => (p.button ? "space-between" : "center")};
  transition: all ${p => `${p.delay}ms`} cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${p => (p.active ? "translateY(0%)" : "translateY(100%)")};
  z-index: ${p => p.theme.zIndex.xl + 10};
`;

const SnackLabel = styled.div`
  flex: 1 1 auto;
  text-align: ${p => (p.button ? null : "center")};
`;

const SnackButton = styled.button`
  height: 0.875em;
  min-width: 64px;
  padding: 0 8px;
  font-size: 0.875em;
  font-weight: 400;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  color: ${props =>
    props.textColor ? props.textColor : props.theme.colors.action};
  background-color: ${props => (props.bgColor ? props.bgColor : "transparent")};
  cursor: pointer;
  &:hover {
    color: ${props =>
      props.hoverTextColor
        ? props.hoverTextColor
        : props.theme.colors.actionHover};
    background-color: ${props =>
      props.hoverBgColor ? props.hoverBgColor : "transparent"};
  }
`;

let animationDelay = 400;

class Snackbar extends React.Component {
  static propTypes = {
    /** String -- renders a button on the right side of the component with a label that is the string value */
    actionLabel: propTypes.string,
    /** CSS-consumable (hex, rgba, etc) color value for the action label color (when actionLabel is declared) */
    actionColor: propTypes.string,
    /** CSS-consumable (hex, rgba, etc) color value for when the user hovers over the action button (when actionLabel is declared) */
    actionHoverColor: propTypes.string,
    /** Sets whether or not the snackbar renders */
    active: propTypes.bool,
    /** React element(s) passed as a child of the modal */
    children: propTypes.node,
    /** Number in miliseconds that delays the component's mount/dismount so that the snackbar's enter and exit animations have time to render */
    delay: propTypes.number,
    /** Label that displays in the snackbar */
    label: propTypes.oneOfType([propTypes.string, propTypes.element]),
    /** CSS-consumable (hex, rgba, etc) color value for the snackbar label */
    labelColor: propTypes.string,
    /** Function that is called on click of the action button.  For when the action button is declared via the actionLabel prop */
    onClick: propTypes.func,
    /** Function that is declared when the snackbar dismounts at the end of its' timeout */
    onTimeout: propTypes.func,
    /** Number that sets the amount of time (in miliseconds) that the snackbar will be rendered */
    timeout: propTypes.number,
  };

  static defaultProps = {
    delay: 300,
    timeout: 2000,
  };

  state = {
    visible: false,
  };

  componentDidMount() {
    if (this.props.active && this.props.timeout) {
      this.scheduleTimeout(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active && this.props.timeout && !prevProps.active) {
      this.scheduleTimeout(this.props);
    }
  }

  componentWillUnomunt() {
    clearTimeout(this.currentTimeout);
  }

  scheduleTimeout = props => {
    const { onTimeout, timeout } = props;
    if (this.currentTimeout) this.clearTimeout(currentTimeout); //eslint-disable-line
    this.currentTimeout = setTimeout(() => {
      if (onTimeout) {
        onTimeout();
      }
      this.currentTimeout = null;
    }, timeout);
  };

  onEntered = () => this.setState({ visible: true });

  onExit = () => this.setState({ visible: false });

  render() {
    const {
      actionLabel,
      actionColor,
      actionHoverColor,
      active,
      children,
      delay,
      label,
      labelColor,
      onClick,
    } = this.props;

    animationDelay = delay;

    return (
      <Portal style={PortalStyle}>
        <Transition
          appear
          in={active}
          mountOnEnter
          onEntered={this.onEntered}
          onExit={this.onExit}
          timeout={delay}
        >
          <SnackWrap
            active={this.state.visible}
            button={actionLabel ? true : false}
            delay={delay}
            labelColor={labelColor}
          >
            <SnackLabel button={actionLabel ? true : false}>
              {label}
              {children}
            </SnackLabel>
            {actionLabel ? (
              <SnackButton
                onClick={onClick}
                textColor={actionColor}
                hoverColor={actionHoverColor}
                innerRef={node => (this.button = node)}
                autoFocus
              >
                {actionLabel}
              </SnackButton>
            ) : null}
          </SnackWrap>
        </Transition>
      </Portal>
    );
  }
}

export default ActivableRenderer({ delay: animationDelay })(Snackbar);
