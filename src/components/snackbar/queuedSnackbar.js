import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import Transition from "react-transition-group/Transition";
import Portal from "../../utils/portal/portal.js";

const PortalStyle = {
  position: "fixed",
  bottom: 0,
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1001,
  height: "0px",
};

const SnackWrap = styled.div`
  position: relative;
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
  transform: ${p =>
    p.active ? "translateY(0%) translateY( -20px )" : "translateY(100%)"};
  z-index: ${p => p.theme.zIndex.xl + 10};
`;

const SnackLabel = styled.div`
  flex: 1 1 auto;
  text-align: ${p => (p.button ? null : "center")};
`;

const SnackCount = styled.div`
  position: absolute;
  top: 2px;
  right: 4px;
  opacity: 0.8;
  color: ${p => p.theme.colors.muted};
  font-size: 0.875em;
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
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: ${props =>
      props.hoverTextColor
        ? props.hoverTextColor
        : props.theme.colors.actionHover};
  }
`;
const delay = 400;

class QueuedSnackbar extends React.Component {
  static propTypes = {
    /** Number that sets the amount of time (in miliseconds) that the snackbar will be rendered */
    timeout: propTypes.number,
    snack: propTypes.shape({
      /** String -- renders a button on the right side of the component with a label that is the string value */
      buttonLabel: propTypes.string,
      /** CSS-consumable (hex, rgba, etc) color value for the action label color (when actionLabel is declared) */
      buttonLabelColor: propTypes.string,
      /** CSS-consumable (hex, rgba, etc) color value for when the user hovers over the action button (when actionLabel is declared) */
      buttonLabelHoverColor: propTypes.string,
      /** Message that displays in the snackbar */
      message: propTypes.oneOfType([propTypes.string, propTypes.element]),
      /** CSS-consumable (hex, rgba, etc) color value for the snackbar label */
      messageColor: propTypes.string,
      /** Function that is called on click of the action button.  For when the action button is declared via the buttonLabel prop */
      onClick: propTypes.func,
      /** Function that is run when the current message is dismissed at the end of its' timeout */
      onDismiss: propTypes.func,
    }),
  };

  static defaultProps = {
    timeout: 2000,
  };

  state = {
    currentMessage: null,
    messageQueue: [],
    active: false,
  };

  componentDidMount() {
    if (this.props.snack) {
      this.addMessageToQueue();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.snack !== this.props.snack) this.addMessageToQueue();
  }

  componentWillUnomunt() {
    this.clearMessageTimeout();
  }

  addMessageToQueue = () => {
    if (typeof this.props.snack !== "object") {
      console.warn(
        `DRACS Snackbar: The 'snack' prop expects an object, but received ${
          this.props.snack
        } `
      );
      return;
    }
    const messageQueue = [...this.state.messageQueue, this.props.snack];
    if (!this.state.active) {
      this.setState(
        {
          messageQueue,
        },
        () => {
          this.showNextMessage();
        }
      );
    } else {
      this.setState({ messageQueue });
    }
  };

  showNextMessage = () => {
    this.hideCurrentMessage().then(() => {
      if (this.state.messageQueue.length === 0) return;
      const messageQueue = this.state.messageQueue;
      const currentMessage = messageQueue.shift();
      this.setState({
        currentMessage,
        messageQueue,
        active: false,
      });
      setTimeout(() => {
        this.setState({ active: true });
        this.messageTimeout = setTimeout(() => {
          if (
            this.state.currentMessage &&
            this.state.currentMessage.onDismiss
          ) {
            this.state.currentMessage.onDismiss();
          }
          this.showNextMessage();
        }, this.props.timeout);
      }, 1);
    });
  };

  hideCurrentMessage = () => {
    if (!this.state.currentMessage) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      this.setState({ active: false }, () => {
        this.clearMessageTimeout();
        this.onTransisitionEnd = () => {
          this.setState({ currentMessage: null });
          resolve();
        };
      });
    });
  };

  clearMessageTimeout = () => {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
      this.messageTimeout = null;
    }
  };

  onExit = () => {
    if (this.onTransisitionEnd) {
      this.onTransisitionEnd();
      this.onTransisitionEnd = null;
    }
  };

  render() {
    const { active, currentMessage, messageQueue } = this.state;
    return (
      <Portal style={PortalStyle}>
        <Transition in={active} onExited={this.onExit} timeout={delay}>
          <SnackWrap
            active={active}
            aria-live="assertive"
            aria-atomic="true"
            aria-hidden={!active}
            button={currentMessage && currentMessage.buttonLabel ? true : false}
            delay={delay}
            labelColor={currentMessage && currentMessage.messageColor}
          >
            <SnackLabel
              button={
                currentMessage && currentMessage.buttonLabel ? true : false
              }
            >
              {currentMessage ? currentMessage.message : null}
            </SnackLabel>
            {currentMessage && currentMessage.buttonLabel ? (
              <SnackButton
                onClick={currentMessage.onClick}
                textColor={currentMessage.buttonLabelColor}
                hoverColor={currentMessage.buttonLabelHoverColor}
                innerRef={node => (this.button = node)}
                autoFocus
              >
                {currentMessage.buttonLabel}
              </SnackButton>
            ) : null}
            <SnackCount>
              1/
              {messageQueue.length + 1}
            </SnackCount>
          </SnackWrap>
        </Transition>
      </Portal>
    );
  }
}

export default QueuedSnackbar;
