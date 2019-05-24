import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { H4 } from "../typography/typography.js";
import IconCaretUp from "../../icons/caret_up/caret_up.js";
import IconCaretDown from "../../icons/caret_down/caret_down.js";

const ElementWrap = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${p => (p.padding ? p.padding : `${p.theme.sizing.base}px`)};
`;

const TitleWrap = H4.extend`
  color: ${p => (p.titleColor ? p.titleColor : p.theme.colors.action)};
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.025em;
`;

const ToggleWrap = styled.div`
  display: flex;
  flex-basis: auto;
  justify-content: ${p =>
    p.justifyToggleButtonToTitle ? "flex-start" : "space-between"};
  align-items: center;
  cursor: pointer;
  border-left: ${p =>
    p.toggleBorder
      ? p.active
        ? `solid 5px ${p.theme.colors.action}`
        : `solid 5px ${p.theme.colors.border}`
      : null};
  &:hover {
    ${TitleWrap} {
      color: ${p =>
        p.titleHoverColor ? p.titleHoverColor : p.theme.colors.actionHover};
    }
    border-left: ${p =>
      p.toggleBorder ? `solid 5px ${p.theme.colors.actionHover}` : null};
  }
`;

const CollapseToggle = styled.button`
  cursor: pointer;
`;

const BodyWrap = styled.div`
  display: ${p => (p.active ? "flex" : "none")};
  flex: 1;
  flex-basis: auto;
  flex-direction: column;
`;

export default class Collapsible extends React.Component {
  static propTypes = {
    /** Boolean that sets whether or not the collapsible body displays */
    active: propTypes.bool,
    /** React element(s) that will be children of this component */
    children: propTypes.node,
    /** CSS consumable (px, vh, em, etc) string that sets the padding of the component wrapper div */
    componentWrapperPadding: propTypes.string,
    /** CSS-consumable (hex, rgba, etc) string that sets the hover color of the title on hover */
    iconColor: propTypes.string,
    /** sets whether toggle carrot justifies self next to the toggle or at to the far end of the container's width */
    justifyToggleButtonToTitle: propTypes.bool,
    /** Function that gets called when the collapsible toggle is clicked */
    onToggleClick: propTypes.func,
    /** String or React element that sets the collapsible title */
    title: propTypes.oneOfType([propTypes.string, propTypes.node]),
    /** CSS class for the title */
    titleClassName: propTypes.string,
    /** CSS-consumable (hex, rgba, etc) string that sets the color of the title */
    titleColor: propTypes.string,
    /** CSS-consumable (hex, rgba, etc) string that sets the hover color of the title on hover */
    titleHoverColor: propTypes.string,
    /** Style object for the title **/
    titleStyle: propTypes.object,
    /** sets whether the toggle has a blue/gray border on hover */
    toggleBorder: propTypes.bool,
    /** CSS class for the wrapper */
    wrapperClassName: propTypes.string,
    /** Style object for the component wrapper */
    wrapperStyle: propTypes.object,
  };

  static defaultProps = {
    iconColor: "#b5b5b5",
  };

  state = {
    active: false,
  };

  componentDidMount() {
    if (
      typeof this.props.active !== "undefined" &&
      this.props.active !== null
    ) {
      this.setState({ active: this.props.active });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      //if current props are different than current state
      this.state.active !== this.props.active &&
      //and the prevProps are different than current props
      this.props.active !== prevProps.active &&
      //and the prop isnt null or undefined
      typeof this.props.active !== "undefined" &&
      this.props.active !== null
    ) {
      this.setState({ active: this.props.active });
    }
  }

  handleToggleClick = () => {
    if (this.props.onToggleClick) this.props.onToggleClick();
    this.setState({ active: !this.state.active });
  };

  render() {
    const {
      children,
      componentWrapperPadding,
      iconColor,
      justifyToggleButtonToTitle,
      title,
      titleClassName,
      titleColor,
      titleHoverColor,
      titleStyle,
      toggleBorder,
      wrapperClassName,
      wrapperStyle,
    } = this.props;
    const { active } = this.state;
    return (
      <ElementWrap
        className={wrapperClassName}
        padding={componentWrapperPadding}
        style={wrapperStyle}
      >
        <ToggleWrap
          justifyToggleButtonToTitle={justifyToggleButtonToTitle}
          onClick={this.handleToggleClick}
          titleHoverColor={titleHoverColor}
          active={active}
          toggleBorder={toggleBorder}
        >
          <TitleWrap
            className={titleClassName}
            titleColor={titleColor}
            style={titleStyle}
          >
            {title}
          </TitleWrap>
          <CollapseToggle onClick={this.handleToggleClick}>
            {active ? (
              <IconCaretUp size={24} color={iconColor} />
            ) : (
              <IconCaretDown size={24} color={iconColor} />
            )}
          </CollapseToggle>
        </ToggleWrap>
        <BodyWrap active={active}>{children}</BodyWrap>
      </ElementWrap>
    );
  }
}
