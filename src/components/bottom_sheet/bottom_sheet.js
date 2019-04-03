import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import Transition from "react-transition-group/Transition";

const SheetOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: ${p => p.theme.zIndex.xl};
  overflow-y: hidden;
`;

const SheetBody = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  color: ${p => (p.textColor ? p.textColor : null)};
  background-color: ${p => (p.bgColor ? p.bgColor : "#fff")};
  border-radius: ${p =>
    `${p.theme.sizing.borderRadius}px ${p.theme.sizing.borderRadius}px 0 0`};
  min-height: 36px;
  height: ${p => p.height};
  transform: ${props =>
    props.visible ? "translate3d(0, 0, 0)" : "translate3d(0, 100%, 0)"};
  transition: all ${p => `${p.delay}ms`}
    ${props =>
      props.visible
        ? "cubic-bezier(0.4, 0, 0.2, 1)"
        : "cubic-bezier(0, 0, 0.2, 1)"};
  overflow: hidden;
`;

class BottomSheet extends React.Component {
  static propTypes = {
    /** boolean that controls whether or not sheet displays */
    active: propTypes.bool,
    /** CSS-consumable string (hex, rgba, etc) color declaration for sheet bg color */
    bgColor: propTypes.string,
    /** style object to customize the sheet body with inline-styling */
    bodyStyle: propTypes.object,
    /** React element(s) to display in the sheet */
    children: propTypes.node,
    /** Number that represents the amount of time in ms needed for the sheet animation to complete */
    delay: propTypes.number,
    /** CSS-consumable string to set the height of the sheet body */
    height: propTypes.string,
    /** Function tht is triggered when the user clicks on the overlay behind the sheet body */
    onOverlayClick: propTypes.func,
    /** style object to customize the overlay with inline styles */
    overlayStyle: propTypes.object,
    /** CSS-consumable string (hex, rgba, etc) color declaration for unwrapped body text in the sheet body */
    textColor: propTypes.string,
  };

  static defaultProps = {
    active: false,
    delay: 300,
  };

  state = {
    visible: false,
  };

  handleBodyClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onEntered = () => this.setState({ visible: true });

  onExit = () => this.setState({ visible: false });

  render() {
    const {
      active,
      bgColor,
      bodyStyle,
      children,
      delay,
      height,
      onOverlayClick,
      overlayStyle,
      textColor,
    } = this.props;
    return (
      <Transition
        in={active}
        timeout={delay}
        mountOnEnter
        unmountOnExit
        onEntered={this.onEntered}
        onExit={this.onExit}
      >
        <SheetOverlay
          delay={delay}
          style={overlayStyle}
          onClick={onOverlayClick}
        >
          <SheetBody
            bgColor={bgColor}
            delay={delay}
            height={height}
            onClick={this.handleBodyClick}
            style={bodyStyle}
            textColor={textColor}
            visible={this.state.visible}
          >
            {children}
          </SheetBody>
        </SheetOverlay>
      </Transition>
    );
  }
}

export default BottomSheet;
