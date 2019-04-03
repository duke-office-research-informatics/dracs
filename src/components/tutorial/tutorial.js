import React from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import Transition from "react-transition-group/Transition";

import Portal from "../../utils/portal/portal.js";
import { getViewport } from "../../utils/utils/utils.js";
import Overlay from "../overlay/overlay.js";
import TutorialCard from "./tutorial-card.js";

const POSITION = {
  BOTTOM: "bottom",
  HORIZONTAL: "horizontal",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  VERTICAL: "vertical",
};

const defaults = {
  delay: 300,
  position: POSITION.VERTICAL,
};

const Tutorial = (options = {}) => {
  const { delay: defaultDelay, position: defaultPosition } = {
    ...defaults,
    ...options,
  };

  return ComposedComponent => {
    return class TutorialComponent extends React.Component {
      static propTypes = {
        /** React element(s) passed as a child of the tooltip */
        children: propTypes.node,
        /** ID of element that should gain focus when tutorial renders */
        idToFocus: propTypes.string,
        /** Function called when tutorial is dismounted/closed */
        onTutorialClose: propTypes.func,
        /** Function called when tutorial is mounted/opened */
        onTutorialOpen: propTypes.func,
        /** Number that sets the total number of tutorial tips if tutorial has multiple tips to display */
        tipCount: propTypes.number,
        /** Number that shows which tip is currently displaying out of the total number of tips in the tutorial */
        tipNumber: propTypes.number,
        /** Sets whether the tutorial is rendered */
        tutorialActive: propTypes.bool,
        /** An object or array of objects whose keys map to the props for the base DRACS `Button` component */
        tutorialActions: propTypes.oneOfType([
          propTypes.array,
          propTypes.object,
        ]),
        /** A string or react element that displays in the body section of the tutorial */
        tutorialBody: propTypes.oneOfType([propTypes.string, propTypes.node]),
        /** Number (in miliseconds) that delays the component from mounting/dismounting to allow the component to render enter/exit animations */
        tutorialDelay: propTypes.number,
        /** String that sets an HTML/CSS ID attribute on the tutorial's outer wrapper */
        tutorialId: propTypes.string,
        /** Image that renders in the tutorial body */
        tutorialImage: propTypes.oneOfType([propTypes.string, propTypes.node]),
        /** Sets whether the tutorial displays above, below, to the left, or to the right of the composed component.  If 'horizontal', the tooltip will evaluate where there is more space to the left or right, 'vertical' top/bottom, then display where there is more space */
        tutorialPosition: propTypes.oneOf(
          Object.keys(POSITION).map(key => POSITION[key])
        ),
        /** String or react element that sets the title of the tutorial tip */
        tutorialTitle: propTypes.oneOfType([propTypes.string, propTypes.node]),
      };

      static defaultProps = {
        tutorialDelay: defaultDelay,
        tutorialPosition: defaultPosition,
      };

      state = {
        left: null,
        position: this.props.tutorialPosition,
        top: null,
        visible: false,
      };

      componentDidMount() {
        window.addEventListener("resize", this.onResize);
        if (this.props.tutorialActive)
          this.setPositioning(this.calculatePosition());
      }

      componentWillReceiveProps(nextProps) {
        if (!this.props.tutorialActive && nextProps.tutorialActive) {
          this.setPositioning(this.calculatePosition());
        }
      }

      componentDidReceiveProps(prevProps) {
        if (
          this.props.tutorialPosition !== prevProps.tutorialPosition &&
          this.props.tutorialActive
        ) {
          this.setPositioning(this.calculatePosition());
        }
      }

      componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
      }

      onEntered = () => {
        this.activate();
      };

      onExit = () => {
        this.deactivate();
      };

      onResize = () => {
        if (this.props.tutorialActive) this.activate(this.calculatePosition());
      };

      setPositioning({ top, left, position }) {
        this.setState({ top, left, position });
      }

      activate = () => {
        setTimeout(() => {
          this.setState({ visible: true });
        }, 0);
      };

      deactivate() {
        this.setState({ visible: false });
      }

      getPosition = element => {
        const { tutorialPosition } = this.props;
        if (tutorialPosition === POSITION.HORIZONTAL) {
          const origin = element.getBoundingClientRect();
          const { width: ww } = getViewport();
          const toRight = origin.left < ww / 2 - origin.width / 2;
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } else if (tutorialPosition === POSITION.VERTICAL) {
          const origin = element.getBoundingClientRect();
          const { height: wh } = getViewport();
          const toBottom = origin.top < wh / 2 - origin.height / 2;
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        }
        return tutorialPosition;
      };

      calculatePosition() {
        const element = ReactDOM.findDOMNode(this); //eslint-disable-line
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

      render() {
        const {
          children,
          idToFocus,
          onTutorialClose,
          onTutorialOpen,
          tutorialActions,
          tutorialActive,
          tutorialBody,
          tutorialDelay,
          tutorialId,
          tutorialImage,
          tutorialTitle,
          tipCount,
          tipNumber,
          ...other
        } = this.props;

        const { visible, top, left, position } = this.state;

        const childProps = {
          ...other,
        };

        return React.createElement(
          ComposedComponent,
          childProps,
          children,
          <Transition
            in={tutorialActive}
            timeout={tutorialDelay}
            appear
            mountOnEnter
            unmountOnExit
            onEntered={this.onEntered}
            onExit={this.onExit}
          >
            <Portal
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: 1000,
              }}
            >
              <Overlay
                bgOpacity={0}
                style={{ position: "relative", height: "100%", width: "100%" }}
              />
              <TutorialCard
                actions={tutorialActions}
                active={visible}
                body={tutorialBody}
                delay={tutorialDelay}
                id={tutorialId}
                idToFocus={idToFocus}
                image={tutorialImage}
                onClose={onTutorialClose}
                onOpen={onTutorialOpen}
                position={position}
                top={top}
                left={left}
                title={tutorialTitle}
                tutorialRef={node => (this.tutorialNode = node)}
                tipCount={tipCount}
                tipNumber={tipNumber}
              />
            </Portal>
          </Transition>
        );
      }
    };
  };
};

export default Tutorial();
