import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import Transition from "react-transition-group/Transition";

const OverlayWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  opacity: ${p =>
    p.active ? (p.bgOpacity || p.bgOpacity === 0 ? p.bgOpacity : 0.3) : 0};
  transition: all ${p => `${p.delay}ms`} cubic-bezier(0.4, 0, 0.2, 1);
  ${"" /* pointer-events: ${ p => p.active ? 'none' : null }; */}
  z-index: ${p => (p.zIndex ? p.theme.zIndex.xl : null)};
`;

class Overlay extends React.Component {
  static propTypes = {
    active: propTypes.bool,
    bgOpacity: propTypes.number,
    children: propTypes.node,
    delay: propTypes.number,
    lockScroll: propTypes.bool,
    onClick: propTypes.func,
    onEscKeyDown: propTypes.func,
    onMouseDown: propTypes.func,
    onMouseMove: propTypes.func,
    onMouseUp: propTypes.func,
    style: propTypes.object,
    zIndex: propTypes.bool,
  };

  static defaultProps = {
    delay: 400,
    lockScroll: true,
  };

  state = {
    visible: false,
  };

  componentDidMount() {
    const { active, lockScroll, onEscKeyDown } = this.props;
    if (onEscKeyDown)
      document.body.addEventListener("keydown", this.handleEscPress);
    if (active && lockScroll) document.body.style.overflow = "hidden";
  }

  componentWillUpdate(nextProps) {
    if (this.props.lockScroll) {
      const activating = nextProps.active && !this.props.active;
      const deactivating = !nextProps.active && this.props.active;

      if (activating) {
        document.body.style.overflow = "hidden";
      }

      if (
        deactivating &&
        !document.querySelectorAll('[data-dracs="overlay"]')[1]
      ) {
        document.body.style.overflow = "";
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.onEscKeyDown) {
      if (this.props.active && !prevProps.active) {
        document.body.addEventListener("keydown", this.handleEscPress);
      } else if (!this.props.active && prevProps.active) {
        document.body.removeEventListener("keydown", this.handleEscPress);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.active && this.props.lockScroll) {
      if (!document.querySelectorAll('[data-dracs="overlay"]')[1]) {
        document.body.style.overflow = "";
      }
    }

    if (this.props.onEscKeyDown) {
      document.body.removeEventListener("keydown", this.handleEscPress);
    }
  }

  handleEscPress = e => {
    const key = "which" in e ? e.which : e.keyCode;
    if (this.props.active && this.props.onEscKeyDown && key === 27) {
      this.props.onEscKeyDown(e);
    }
  };

  handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onClick) this.props.onClick(e);
  };

  onEntered = () => this.setState({ visible: true });

  onExit = () => this.setState({ visible: false });

  render() {
    const { active, bgOpacity, delay, ...other } = this.props; //eslint-disable-line
    return (
      <Transition
        appear
        in={active}
        mountOnEnter
        onEntered={this.onEntered}
        onExit={this.onExit}
        timeout={delay}
        unmountOnExit
      >
        <OverlayWrap
          active={this.state.visible}
          data-dracs="overlay"
          delay={delay}
          bgOpacity={bgOpacity}
          onClick={this.handleClick}
          onTouchStart={this.handleClick}
          innerRef={node => (this.overlay = node)}
          {...other}
        />
      </Transition>
    );
  }
}

export default Overlay;
