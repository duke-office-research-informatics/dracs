import React from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import styled from "styled-components";
import createFocusGroup from "focus-group";

import colors from "../../theme/colors/colorTheme.js";
import events from "../../utils/events/events.js";
import InputGroup from "../input/input-component.js";
import IconDropdownArrow from "../../icons/dropdown-arrow/down-arrow.js";

const DropdownWrap = styled.div`
  position: relative;
  cursor: pointer;
  ${p => (p.type === "button" ? "display: inline-flex" : null)};
`;

const MenuButton = styled.button.attrs(props => ({
  disabled: props.disabled ? true : false,
}))`
  margin: 0;
  padding: 0;
  vertical-align: top;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  &:focus {
    outline: dotted 1px rgb(59, 153, 252);
  }
  &:hover > svg {
    fill: ${p => (p.buttonIconHoverColor ? p.buttonIconHoverColor : null)};
  }
`;

const MenuList = styled.ul`
  position: absolute;
  display: ${props => (props.active ? props.menuDisplay : "none")};
  bottom: ${p =>
    p.orientAbove
      ? p.type === "coverButton"
        ? 0
        : p.type === "button"
        ? "32px"
        : "8px"
      : null};
  top: ${p =>
    p.orientAbove
      ? null
      : p.type === "coverButton"
      ? 0
      : p.type === "button"
      ? "30px"
      : "28px"};
  left: ${p => (p.position === "left" ? null : 0)};
  right: ${p => (p.position === "right" ? null : 0)};
  width: ${p => (p.menuWidth ? p.menuWidth : "auto ")};
  min-width: ${p => (p.menuWidth ? null : "100%")};
  background-color: #fff;
  box-shadow: ${props => props.theme.boxShadow.shadow3px};
  border-radius: 2px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1;
`;

const MenuItem = styled.li`
  padding: ${p => (p.template ? null : "4px 8px")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  white-space: ${p => (p.template ? null : "nowrap")};
  width: auto;
  min-width: 100%;
  &:hover {
    background-color: ${props =>
      props.itemHover
        ? props.disabled
          ? null
          : props.itemHoverColor
          ? props.itemHoverColor
          : props.theme.colors.border
        : null};
  }
  &:focus {
    outline-offset: -1px;
    outline: dotted 1px rgb(59, 153, 252);
  }
  &:first-child {
    color: ${props => (props.template ? null : props.theme.colors.action)};
  }
`;

const focusGroupOptions = {
  wrap: true,
  stringSearch: true,
};

class Dropdown extends React.Component {
  static propTypes = {
    /** Boolean that sets whether or not the dropdown input can be left blank */
    allowBlank: propTypes.bool,
    /** String that sets the Button label if dropdown type is 'button' */
    buttonLabel: propTypes.oneOfType([propTypes.string, propTypes.node]),
    /** sets a hover color (css rgba/hex) on the icon fill, since a hover event does not bubble down to an svg without explicitly coding it in the parent **/
    buttonIconHoverColor: propTypes.oneOfType([
      propTypes.string,
      propTypes.func,
    ]),
    /** React element(s) that will be children of this component -- will be compoised in a menu-item wrapper */
    children: propTypes.node,
    /** Boolean that sets whether the dropdown menu will close upon selection of an item */
    closeOnSelect: propTypes.bool,
    /** Boolean that sets whether the dropdown is disabled */
    disabled: propTypes.bool,
    /** String that sets an error message below the input when the dropdown type is input */
    error: propTypes.string,
    /** Ref (functional) that targets the component's outer html/dom node */
    ref: propTypes.func,
    /** Ref (functional) that targets the input's html/dom node */
    inputRef: propTypes.func,
    /** string that sets the input's value */
    inputValue: propTypes.string,
    /**css classname for dropdown items */
    itemClassName: propTypes.string,
    /** Boolean that sets whether a menu item will display a gray background on hover */
    itemHover: propTypes.bool,
    /** CSS readable string that sets the color of the item hover */
    itemHoverColor: propTypes.string,
    /**CSS-compatible style object that modifies a dropdown item */
    itemStyle: propTypes.object,
    /** String that sets the Input label when dropdown type is 'input' */
    label: propTypes.string,
    /** Key that sets which key in an object contains the value that will be rendered visually when menuItems are passed as an array and no template is passed */
    labelKey: propTypes.string,
    /** CSS display value for menu when it is active, defaults to "block" (to allow for custom flex/grid layouts) */
    menuDisplay: propTypes.string,
    /**CSS classname applied to the dropdown menu wrapper */
    menuClassName: propTypes.string,
    /** String that sets whether the dropdown menu will justify to the right or left of the parent input */
    menuPosition: propTypes.oneOf(["left", "right"]),
    /**CSS-compatible style object that modifies the dropdown menu wrapper */
    menuStyle: propTypes.object,
    /** string that sets the width of the dropdown menu **/
    menuWidth: propTypes.string,
    /** String that sets the HTML name attribute of the dropdown, important for accessibliity */
    name: propTypes.string,
    /** Function that is called when the dropdown input/button loses focus */
    onBlur: propTypes.func,
    /** Function that is called when a menu item loses focus */
    onItemBlur: propTypes.func,
    /** Function that is called when the input's change handler is called */
    onChange: propTypes.func,
    /** Function that is called when the dropdown input/button is clicked */
    onClick: propTypes.func,
    /** Function that is called when a menu item is clicked */
    onItemClick: propTypes.func,
    /** Function that is called when the input/button gains focus */
    onFocus: propTypes.func,
    /** Function that is called when a menu item gains focus */
    onItemFocus: propTypes.func,
    /** Function that is called at the start of a click on the dropdown input/button */
    onMouseDown: propTypes.func,
    /** Function that is called when the cursor enters the input/button */
    onMouseEnter: propTypes.func,
    /** Function that is called when the cursor leaves the input/button */
    onMouseLeave: propTypes.func,
    /** Function that is called at the end of a click on the input/button */
    onMouseUp: propTypes.func,
    /** Function that is called at the beginning of a touch on the input/button */
    onTouchStart: propTypes.func,
    /** Function that is called at the end of a touch on the input/button */
    onTouchEnd: propTypes.func,
    /** Boolean that sets whether or not the dropdown mounts/initially renders with the menu open */
    openMenu: propTypes.bool,
    /** Boolean that sets whether the dropdown displays above or below the input **/
    orientAbove: propTypes.bool,
    /** Boolean that sets whether or not the dropdown is 'required' (currently most useful when thype is 'input') */
    required: propTypes.bool,
    /** Array that is passed to set menu items programatically */
    source: propTypes.arrayOf(
      propTypes.oneOfType([propTypes.string, propTypes.object])
    ),
    /** String that sets whether the menu trigger is a button or part of an input */
    type: propTypes.oneOf(["button", "coverButton", "input"]),
    /** React element that can be passed along with the source array that serves as a styling/layout template for an item (for a .map).  The template cannot contain an `li` dom element, because it will be composed with an `li` to achieve keyboard navigation */
    template: propTypes.oneOfType([
      propTypes.node,
      propTypes.element,
      propTypes.object,
      propTypes.func,
    ]),
    /** String that sets the active item */
    value: propTypes.string,
    /** String that sets which key should be evaluated when items are set as an array of objects */
    valueKey: propTypes.string,
    /**CSS classname applied to the dropdown component wrapper */
    wrapperClassName: propTypes.string,
    /**CSS-compatible style object that modifies the component wrapper */
    wrapperStyle: propTypes.object,
  };

  static defaultProps = {
    allowBlank: true,
    closeOnSelect: true,
    disabled: false,
    labelKey: "label",
    menuPosition: "left",
    menuDisplay: "block",
    orientAbove: false,
    required: false,
    type: "input",
    valueKey: "value",
  };

  state = {
    active: false,
  };

  constructor() {
    super();
    this.focusGroup = createFocusGroup(focusGroupOptions);
    this.menuButton = null;
    this.menu = null;
  }

  componentDidMount() {
    this.focusGroup.setMembers(this.menu.children);
    if (this.props.openMenu) {
      this.openWithoutActiveFocusGroup();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.focusGroup.setMembers(this.menu.children);
    if (prevState.active && !this.state.active) {
      events.removeEventsFromDocument(this.getDocumentEvents());
    }
    if (this.state.active && !prevState.active) {
      events.addEventsToDocument(this.getDocumentEvents());
    }
    if (this.props.openMenu && !prevProps.openMenu) {
      this.openWithoutActiveFocusGroup();
    }
    if (!this.props.openMenu && prevProps.openMenu) {
      this.close();
    }
  }

  componentWillUnmount() {
    if (this.state.active) {
      events.removeEventsFromDocument(this.getDocumentEvents());
    }
  }

  getDocumentEvents = () => ({
    click: this.handleDocumentClick,
    touchend: this.handleDocumentClick,
  });

  getSelectedItem = () => {
    if (this.props.source) {
      for (const item of this.props.source) {
        if (item[this.props.valueKey] === this.props.value) return item;
      }
      return !this.props.allowBlank
        ? this.props.labelKey
          ? this.props.source[0][this.props.labelKey]
          : this.props.source[0]
        : undefined;
    }
    return undefined;
  };

  moveSelectedToFirstPos = (arr, key, val) => {
    let pos;
    arr.forEach((item, i) => {
      if (item[key] === val) {
        pos = i;
      }
    });
    if (pos) {
      const selItem = arr.splice(pos, 1);
      const newTop = selItem.pop();
      arr.unshift(newTop);
    }
    return arr;
  };

  handleSelect = (item, event) => {
    const { source, valueKey } = this.props;
    if (!this.props.disabled && this.props.onChange) {
      if (this.props.name) event.target.name = this.props.name;
      const newSource = this.moveSelectedToFirstPos(source, valueKey, item);
      this.props.onChange(item, newSource, event);
      if (this.props.onItemClick) this.props.onItemClick(item, event);
      if (this.props.closeOnSelect) this.close();
    }
  };

  handleClick = event => {
    events.pauseEvent(event);
    if (!this.props.disabled) {
      this.open(event);
    }
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleDocumentClick = event => {
    if (
      this.state.active &&
      !events.targetIsDescendant(event, ReactDOM.findDOMNode(this)) //eslint-disable-line
    ) {
      this.setState({ active: false }, () => {
        if (this.focusGroup) this.focusGroup.deactivate();
      });
    }
  };

  close = () => {
    if (this.state.active)
      this.setState({ active: false }, () => {
        this.focusGroup.deactivate();
        this.menuButton.focus();
      });
  };

  open = () => {
    if (this.state.active) return;
    this.setState({ active: true }, () => {
      setTimeout(() => this.focusItem(0), 0);
      if (!this.props.openMenu) this.focusGroup.activate();
    });
  };

  openWithoutActiveFocusGroup = () => {
    if (this.state.active) return;
    this.setState({ active: true }, () => {
      if (this.focusGroup) this.focusGroup.deactivate();
    });
  };

  handleFocus = event => {
    this.menuButton.focus();
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleBlur = event => {
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleItemFocus = e => {
    if (this.props.onItemFocus) this.props.onItemFocus(e);
  };

  handleItemBlur = e => {
    if (this.props.onItemBlur) this.props.onItemBlur(e);
  };

  focusItem = idx => {
    this.focusGroup.focusNodeAtIndex(idx);
  };

  handleMenuButtonKeydown = e => {
    switch (e.keyCode) {
      case 27: //esc
        this.close();
        events.pauseEvent(e);
        break;
      case 38: //up arrow
        this.close();
        events.pauseEvent(e);
        break;
      case 40: //down arrow
        this.handleClick(e);
        events.pauseEvent(e);
        break;
      default:
        return;
    }
  };

  handleMenuArrayItemKeydown = (itemKey, e) => {
    switch (e.keyCode) {
      case 9: //tab
        this.close();
        events.pauseEvent(e);
        break;
      case 13: //enter
        if (itemKey) this.handleSelect(itemKey, e);
        events.pauseEvent(e);
        break;
      case 27: //esc
        this.close();
        events.pauseEvent(e);
        break;
      default:
        return;
    }
  };

  handleMenuItemKeydown = e => {
    switch (e.keyCode) {
      case 9: //tab
        this.close();
        events.pauseEvent(e);
        break;
      case 13: //enter
        if (this.props.closeOnSelect) this.close();
        if (this.props.onItemClick) this.props.onItemClick(e);
        events.pauseEvent(e);
        break;
      case 27: //esc
        this.close();
        events.pauseEvent(e);
        break;
      default:
        return;
    }
  };

  renderMenuButton = () => {
    return (
      <MenuButton
        buttonIconHoverColor={this.props.buttonIconHoverColor}
        disabled={this.props.disabled}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onMouseDown={this.props.onMouseDown}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseUp={this.props.onMouseUp}
        onTouchStart={this.props.onTouchStart}
        onTouchEnd={this.props.onTouchEnd}
        ref={node => (this.menuButton = node)}
        aria-haspopup={true}
        aria-expanded={this.state.active}
        onKeyDown={this.handleMenuButtonKeydown}
        name={this.props.type === "button" ? this.props.name : null}
      >
        {this.props.buttonLabel ? (
          this.props.buttonLabel
        ) : (
          <IconDropdownArrow
            size={24}
            color={this.props.disabled ? colors.base45pct : colors.base57pct}
          />
        )}
      </MenuButton>
    );
  };

  renderValue = (item, idx) => {
    //eslint-disable-line
    const {
      labelKey,
      valueKey,
      template,
      itemClassName,
      itemHover,
      itemHoverColor,
      itemStyle,
    } = this.props;
    return (
      <MenuItem
        key={idx}
        className={itemClassName}
        onBlur={!item.disabled && this.handleItemBlur}
        onFocus={!item.disabled && this.handleItemFocus}
        onClick={!item.disabled && this.handleSelect.bind(this, item[valueKey])}
        onKeyDown={
          !item.disabled &&
          this.handleMenuArrayItemKeydown.bind(this, item[valueKey])
        }
        disabled={item.disabled}
        itemHover={itemHover}
        itemHoverColor={itemHoverColor}
        role="menuitem"
        style={itemStyle}
        tabIndex={-1}
        template={template}
      >
        {template ? template(item) : item[labelKey]}
      </MenuItem>
    );
  };

  renderChildren = (item, idx) => {
    const handleHeaderItemFocus = e => {
      if (item.props.header && this.focusGroup) {
        this.focusGroup.focusNodeAtIndex(idx + 1);
      } else if (!item.props.disabled) {
        this.handleItemFocus(e);
      }
    };

    const handleBlur = e => {
      if (!item.props.disabled) {
        this.handleItemBlur(e);
      }
    };
    return (
      <MenuItem
        key={idx}
        className={this.props.itemClassName}
        style={this.props.itemStyle}
        onBlur={handleBlur}
        onFocus={handleHeaderItemFocus}
        onClick={e => {
          if (this.props.closeOnSelect) this.close();
          if (this.props.onItemClick && !item.props.disabled)
            this.props.onItemClick(e);
        }}
        onKeyDown={e => {
          this.handleMenuItemKeydown(e);
          if (e.keyCode === 13 && item.props.onClick && !item.props.disabled)
            item.props.onClick(e);
        }}
        disabled={item.props.disabled}
        itemHover={this.props.itemHover}
        itemHoverColor={this.props.itemHoverColor}
        role="menuitem"
        tabIndex={-1}
        template={true}
      >
        {item}
      </MenuItem>
    );
  };

  render() {
    const {
      children,
      error,
      inputValue,
      labelKey,
      menuPosition,
      required,
      onChange,
      source,
      label,
      disabled,
      ref,
      type,
      orientAbove,
      menuClassName,
      menuDisplay,
      menuStyle,
      menuWidth,
      wrapperClassName,
      wrapperStyle,
      ...others //eslint-disable-line no-unused-vars
    } = this.props;
    const selected = this.getSelectedItem();
    return (
      <DropdownWrap
        ref={ref}
        type={type}
        className={wrapperClassName}
        style={wrapperStyle}
      >
        {type === "input" ? (
          <InputGroup
            {...others}
            iconRightChild={this.renderMenuButton()}
            helpText={error ? error : null}
            labelText={label}
            name={this.props.name ? this.props.name : "dropdownInput"}
            onChange={onChange}
            onClick={!this.props.disabled ? this.open : null}
            readOnly
            required={required}
            inputState={disabled ? "disabled" : error ? "error" : null}
            value={
              selected && selected[labelKey]
                ? selected[labelKey]
                : inputValue
                ? inputValue
                : ""
            }
          />
        ) : (
          this.renderMenuButton()
        )}

        <MenuList
          ref={node => (this.menu = node)}
          active={this.state.active}
          aria-hidden={!this.state.active}
          aria-label="submenu"
          className={menuClassName}
          orientAbove={orientAbove}
          position={menuPosition}
          role="menu"
          type={type}
          menuDisplay={menuDisplay}
          style={menuStyle}
          menuWidth={menuWidth}
        >
          {source ? source.map(this.renderValue) : null}
          {children ? React.Children.map(children, this.renderChildren) : null}
        </MenuList>
      </DropdownWrap>
    );
  }
}

export default Dropdown;
