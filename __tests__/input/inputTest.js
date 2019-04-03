import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { Input, IconMenu, theme } from "../../lib/dracs.es.js";

const mockClick = jest.fn();

describe("Input", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(
      <Input labelText="hello" name="testInput" value="" />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    mockClick.mockClear();
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("attaches an aria-label via props with no a11y violations when `noLabel` is true", async () => {
    wrapper.setProps({ ariaLabel: "ariaLabel", noLabel: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label__LabelField").length).toBe(0);
    expect(
      wrapper
        .find("input__InputField")
        .getDOMNode()
        .attributes.getNamedItem("aria-label").value
    ).toBe("ariaLabel");
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("sets focus on the input when `autoFocus` is set to true", () => {
    const input = mountWithTheme(
      <Input labelText="hello" name="testInput" value="" autoFocus={true} />
    );
    expect(input).toMatchSnapshot();
    expect(input.find("input__InputField").getDOMNode()).toBe(
      document.activeElement
    );
  });

  it("applies the correct styling when `dense`=true and has no a11y violations", async () => {
    wrapper.setProps({ dense: true, iconRight: IconMenu, iconLeft: IconMenu });
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    expect(wrapper).toMatchSnapshot();
    const input = wrapper.find("input__InputField");
    const floatingLabel = wrapper.find("label__LabelField");
    const iconRt = wrapper.find("input-icon-right__IconRightWrapper");
    const iconLt = wrapper.find("input-icon-left__IconLeftWrapper");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(input).toHaveStyleRule("margin", "14px 0 0 0");
    expect(input).toHaveStyleRule("height", "26px");
    expect(input).toHaveStyleRule("font-size", "13px");
    expect(input).toHaveStyleRule("line-height", "24px");
    expect(floatingLabel).toHaveStyleRule("top", "-6px");
    expect(iconRt).toHaveStyleRule("top", "16px");
    expect(iconLt).toHaveStyleRule("padding-bottom", "8px");
    expect(helpText).toHaveStyleRule("padding", "4px 0 0 0");
  });

  it("applies `helpText` via props and has no a11y violations", async () => {
    wrapper.setProps({ helpText: "help text" });
    const stringRes = await axe(wrapper.html());
    expect(stringRes).toHaveNoViolations();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("help-text__HelpLabel").text()).toBe("help text");
    wrapper.setProps({ helpText: <IconMenu /> });
    const objRes = await axe(wrapper.html());
    expect(objRes).toHaveNoViolations();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("help-text__HelpLabel").find(IconMenu).length).toBe(1);
  });

  it("attaches `helpIcon` as function via props", () => {
    wrapper.setProps({ helpIcon: IconMenu });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("help-text__HelpLabel").find(IconMenu).length).toBe(1);
  });

  it("applies the correct syles and attrs when `datepicker`=true", () => {
    const inputEl = mountWithTheme(
      <Input
        labelText="hello"
        name="testInput"
        value=""
        iconLeft={IconMenu}
        iconRight={IconMenu}
        datepicker={true}
      />
    );
    const input = inputEl.find("input__InputField");
    const iconLt = inputEl.find("input-icon-left__IconLeftWrapper");
    const iconRt = inputEl.find("input-icon-right__IconRightWrapper");
    expect(inputEl).toMatchSnapshot();
    expect(inputEl.state().isTouched).toBe(true);
    expect(input).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)",
      { modifier: "::placeholder" }
    );
    expect(input.getDOMNode().attributes.getNamedItem("data-input").value).toBe(
      "true"
    );
    expect(
      iconLt.getDOMNode().attributes.getNamedItem("data-toggle").value
    ).toBe("true");
    expect(
      iconRt.getDOMNode().attributes.getNamedItem("data-clear").value
    ).toBe("true");
  });

  it("attaches `iconLeft` as a function with correct styles", () => {
    wrapper.setProps({ iconLeft: IconMenu });
    expect(wrapper).toMatchSnapshot();
    const iconLt = wrapper.find("input-icon-left__IconLeftWrapper");
    expect(iconLt.find(IconMenu).length).toBe(1);
    expect(iconLt.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      "hsla(0,0%,14.9%,0.5700000000000001)"
    );
  });

  it("attaches `iconLeftChild` as an instantiated object with correct styles", () => {
    const inputEl = mountWithTheme(
      <Input
        labelText="hello"
        name="testInput"
        value=""
        iconLeft={IconMenu}
        iconLeftChild={<span>hello</span>}
      />
    );
    expect(inputEl).toMatchSnapshot();
    const iconLt = inputEl.find("input-icon-left__IconLeftWrapper");
    expect(iconLt.find(IconMenu).length).toBe(1);
    expect(iconLt.find("span").text()).toBe("hello");
  });

  it("attaches `iconRight` as a function with correct styles", () => {
    wrapper.setProps({ iconRight: IconMenu });
    expect(wrapper).toMatchSnapshot();
    const input = wrapper.find("input__InputField");
    const iconRt = wrapper.find("input-icon-right__IconRightWrapper");
    expect(iconRt.find(IconMenu).length).toBe(1);
    expect(iconRt.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      "hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(input).toHaveStyleRule("padding-right", "24px");
  });

  it("attaches `iconRightChild` as an instantiated object with correct styles", () => {
    wrapper.setProps({
      iconRight: IconMenu,
      iconRightChild: <span>hello</span>,
    });
    expect(wrapper).toMatchSnapshot();
    const iconRt = wrapper.find("input-icon-right__IconRightWrapper");
    expect(iconRt.find(IconMenu).length).toBe(1);
    expect(iconRt.find("span").text()).toBe("hello");
  });

  it("attaches an html id attr to input and propagates to relevant elements for a11y", async () => {
    wrapper.setProps({ id: "testId" });
    expect(wrapper).toMatchSnapshot();
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    const input = wrapper.find("input__InputField");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(input.getDOMNode().attributes.getNamedItem("id").value).toBe(
      "testId"
    );
    expect(
      input.getDOMNode().attributes.getNamedItem("aria-controls").value
    ).toBe("testId-statusText");
    expect(
      floatingLabel.getDOMNode().attributes.getNamedItem("for").value
    ).toBe("testId");
    expect(helpText.getDOMNode().attributes.getNamedItem("id").value).toBe(
      "testId-statusText"
    );
  });

  it("applies the correct styles and attrs when `inputState`=default or is not declared", () => {
    wrapper.setProps({ helpIcon: IconMenu });
    const input = wrapper.find("input__InputField");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(wrapper).toMatchSnapshot();
    expect(input).toHaveStyleRule("color", theme.colors.base90pct);
    expect(input).toHaveStyleRule("margin", "26px 0 0 0");
    expect(input).toHaveStyleRule(
      "border-bottom",
      "solid 1px hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(input).toHaveStyleRule("color", "transparent", {
      modifier: "::placeholder",
    });
    expect(input).toHaveStyleRule(
      "border-bottom",
      `solid 2px ${theme.colors.action}`,
      { modifier: ":focus" }
    );
    expect(input).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)",
      { modifier: ":focus::placeholder" }
    );
    expect(floatingLabel).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(helpText).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(helpText.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      "hsla(0,0%,14.9%,0.5700000000000001)"
    );
  });

  it("applies the correct styles when `inputState`=error", async () => {
    wrapper.setProps({ inputState: "error", helpIcon: IconMenu });
    const input = wrapper.find("input__InputField");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    expect(wrapper).toMatchSnapshot();
    expect(input).toHaveStyleRule("color", theme.colors.error);
    expect(input).toHaveStyleRule(
      "border-bottom",
      `solid 1px ${theme.colors.error}`
    );
    expect(input).toHaveStyleRule("color", "transparent", {
      modifier: "::placeholder",
    });
    expect(input).toHaveStyleRule(
      "border-bottom",
      `solid 2px ${theme.colors.error}`,
      { modifier: ":focus" }
    );
    expect(input).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)",
      { modifier: ":focus::placeholder" }
    );
    expect(floatingLabel).toHaveStyleRule("color", theme.colors.error);
    expect(helpText).toHaveStyleRule("color", theme.colors.error87pct);
    expect(helpText.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      theme.colors.error87pct
    );
  });

  it("applies the correct styles and attrs when `inputState`=disabled", async () => {
    wrapper.setProps({
      inputState: "disabled",
      helpIcon: IconMenu,
      iconRight: IconMenu,
      iconLeft: IconMenu,
    });
    const input = wrapper.find("input__InputField");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    const iconRt = wrapper.find("input-icon-right__IconRightWrapper");
    const iconLt = wrapper.find("input-icon-left__IconLeftWrapper");
    expect(wrapper).toMatchSnapshot();
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    expect(input).toHaveStyleRule("color", theme.colors.base45pct);
    expect(input).toHaveStyleRule(
      "border-bottom",
      `dashed 1px ${theme.colors.base45pct}`
    );
    expect(input).toHaveStyleRule("cursor", "not-allowed");
    expect(input).toHaveStyleRule("color", "transparent", {
      modifier: "::placeholder",
    });
    expect(input).toHaveStyleRule(
      "border-bottom",
      "dashed 1px hsla(0,0%,14.9%,0.44999999999999996)",
      { modifier: ":focus" }
    );
    expect(input).toHaveStyleRule("color", theme.colors.base45pct, {
      modifier: ":focus::placeholder",
    });
    expect(input.getDOMNode().attributes.getNamedItem("disabled").value).toBe(
      ""
    );
    expect(floatingLabel).toHaveStyleRule("color", theme.colors.base45pct);
    expect(floatingLabel).toHaveStyleRule("cursor", "not-allowed");
    expect(helpText).toHaveStyleRule("color", theme.colors.base45pct);
    expect(helpText.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      theme.colors.base45pct
    );
    expect(iconRt).toHaveStyleRule("cursor", "not-allowed");
    expect(iconRt.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      theme.colors.base45pct
    );
    expect(iconRt.getDOMNode().attributes.getNamedItem("tabIndex")).toBe(null);
    expect(iconRt.props().onBlur).toBe(null);
    expect(iconRt.props().onFocus).toBe(null);
    expect(iconRt.props().onClick).toBe(null);
    expect(iconRt.props().onKeyUp).toBe(null);
    expect(iconLt).toHaveStyleRule("cursor", "not-allowed");
    expect(iconLt.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      theme.colors.base45pct
    );
    expect(iconLt.getDOMNode().attributes.getNamedItem("tabIndex")).toBe(null);
    expect(iconLt.props().onClick).toBe(null);
    expect(iconLt.props().onKeyUp).toBe(null);
  });

  it("passes a function to the rightIcon and sets tabIndex and keyUp listeners via props", async () => {
    wrapper.setProps({ iconRight: IconMenu, onIconRightClick: mockClick });
    const iconRt = wrapper.find("input-icon-right__IconRightWrapper");
    expect(wrapper).toMatchSnapshot();
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    expect(iconRt).toHaveStyleRule("cursor", "pointer");
    expect(iconRt.getDOMNode().attributes.getNamedItem("tabIndex").value).toBe(
      "0"
    );
    iconRt.simulate("click");
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
    iconRt.simulate("keyup", { keyCode: 13 });
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
    iconRt.simulate("keyup", { keyCode: 32 });
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
    iconRt.simulate("keyup", { keyCode: 10 });
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
  });

  it("passes func to leftIcon and sets tabIndex and keyup listeners via props", async () => {
    wrapper.setProps({ iconLeft: IconMenu, onIconLeftClick: mockClick });
    const iconLt = wrapper.find("input-icon-left__IconLeftWrapper");
    expect(wrapper).toMatchSnapshot();
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    expect(iconLt).toHaveStyleRule("cursor", "pointer");
    expect(iconLt.getDOMNode().attributes.getNamedItem("tabIndex").value).toBe(
      "0"
    );
    iconLt.simulate("click");
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
    iconLt.simulate("keyup", { keyCode: 13 });
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
    iconLt.simulate("keyup", { keyCode: 32 });
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
    iconLt.simulate("keyup", { keyCode: 10 });
    expect(mockClick).toHaveBeenCalled();
    mockClick.mockClear();
  });

  it("passes labelText via props", () => {
    expect(wrapper.find("label__LabelField").text()).toBe("hello");
  });

  it("attaches an html name attr to input and propagates to relevant elements for a11y when no id passed", () => {
    const input = wrapper.find("input__InputField");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(input.getDOMNode().attributes.getNamedItem("id").value).toBe(
      "testInput"
    );
    expect(
      input.getDOMNode().attributes.getNamedItem("aria-controls").value
    ).toBe("testInput-statusText");
    expect(
      floatingLabel.getDOMNode().attributes.getNamedItem("for").value
    ).toBe("testInput");
    expect(helpText.getDOMNode().attributes.getNamedItem("id").value).toBe(
      "testInput-statusText"
    );
  });

  it("does not display a a label and applies correct styles when `noLabel`=true", () => {
    wrapper.setProps({
      noLabel: true,
      iconRight: IconMenu,
      iconLeft: IconMenu,
    });
    const input = wrapper.find("input__InputField");
    const iconRt = wrapper.find("input-icon-right__IconRightWrapper");
    const iconLt = wrapper.find("input-icon-left__IconLeftWrapper");
    expect(wrapper.find("label__LabelField").length).toBe(0);
    expect(input).toHaveStyleRule("margin", "6px 0");
    expect(input).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)",
      { modifier: "::placeholder" }
    );
    expect(iconRt).toHaveStyleRule("top", "10px");
    expect(iconLt).not.toHaveStyleRule("padding-bottom", "8px");
    wrapper.setProps({ noLabel: true, dense: true, iconRight: IconMenu });
    expect(wrapper.find("input-icon-right__IconRightWrapper")).toHaveStyleRule(
      "top",
      "16px"
    );
  });

  it("sets an onBlur func on the input via props and sets state.isFocused to false on blur", () => {
    wrapper.setProps({ onBlur: mockClick });
    wrapper.setState({ isFocused: true });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("blur");
    expect(mockClick).toHaveBeenCalled();
    expect(wrapper.state().isFocused).toBe(false);
  });

  it("sets an onChange function on the input and sets state.isTouched to true if value isnt empty", () => {
    wrapper.setProps({ onChange: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().isTouched).toBe(false);
    expect(input.getDOMNode().value).toBe("");
    input.simulate("change", { value: "test" });
    expect(mockClick).toHaveBeenCalled();
    wrapper.setProps({ value: "test" });
    wrapper.update();
    expect(input.getDOMNode().value).toBe("test");
    expect(wrapper.state().isTouched).toBe(true);
  });

  it("sets an onFocus func on input via props and sets state.isFocused to true on focus", () => {
    wrapper.setProps({ onFocus: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().isFocused).toBe(false);
    input.simulate("focus");
    expect(mockClick).toHaveBeenCalled();
    expect(wrapper.state().isFocused).toBe(true);
  });

  it("sets an onKeyDown func on the input", () => {
    wrapper.setProps({ onKeyDown: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("keydown");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onKeyUp func on the input", () => {
    wrapper.setProps({ onKeyUp: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("keyup");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseDown func on the input", () => {
    wrapper.setProps({ onMouseDown: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("mousedown");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseEnter func on the input", () => {
    wrapper.setProps({ onMouseEnter: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("mouseenter");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseLeave func on the input", () => {
    wrapper.setProps({ onMouseLeave: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("mouseleave");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseUp func on the input", () => {
    wrapper.setProps({ onMouseUp: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("mouseup");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onTouchStart func on the input", () => {
    wrapper.setProps({ onTouchStart: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("touchstart");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onTouchEnd func on the input", () => {
    wrapper.setProps({ onTouchEnd: mockClick });
    const input = wrapper.find("input__InputField");
    expect(wrapper).toMatchSnapshot();
    input.simulate("touchend");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets a placeholder on the input via props", () => {
    wrapper.setProps({ placeholder: "tteesstt" });
    const input = wrapper.find("input__InputField").getDOMNode();
    expect(input.attributes.getNamedItem("placeholder").value).toBe("tteesstt");
  });

  it("sets the readOnly attribute on the input via props", () => {
    wrapper.setProps({ readOnly: true });
    expect(wrapper).toMatchSnapshot();
    const input = wrapper.find("input__InputField").getDOMNode();
    expect(input.attributes.getNamedItem("readonly").value).toBe("");
  });

  it("sets the required attr via props and adds a star to the label", async () => {
    wrapper.setProps({ required: true });
    expect(wrapper).toMatchSnapshot();
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    const input = wrapper.find("input__InputField");
    const star = wrapper.find("label__LabelField").find("span");
    expect(input.getDOMNode().attributes.getNamedItem("required").value).toBe(
      ""
    );
    expect(star.length).toBe(1);
    expect(star.text()).toBe("*");
    expect(star.props().style).toHaveProperty("color", "hsla(15,100%,40%,0.5)");
    expect(star.props().style).toHaveProperty("marginLeft", "2px");
  });

  it("sets the html type attr on the input via props", () => {
    wrapper.setProps({ type: "search" });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find("input__InputField")
        .getDOMNode()
        .attributes.getNamedItem("type").value
    ).toBe("search");
  });

  it("sets the inputs value via props", () => {
    wrapper.setProps({ value: "test" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input__InputField").props().value).toBe("test");
    expect(wrapper.find("input__InputField").getDOMNode().value).toBe("test");
  });

  it("sets the component width via props", () => {
    wrapper.setProps({ width: "700px" });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find("input-component__InputComponentWrapper")
    ).toHaveStyleRule("width", "700px");
  });

  it("sets the proper styling when state.isFocused = true", () => {
    wrapper.setState({ isFocused: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input__InputField")).toHaveStyleRule(
      "padding-bottom",
      "0px"
    );
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "color",
      "hsla(203.200000000005,94.3%,41.4%,0.87)"
    );
    expect(wrapper.find("label__LabelField")).toHaveStyleRule("top", "-12px");
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "font-size",
      "12px"
    );
    wrapper.setProps({ dense: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label__LabelField")).toHaveStyleRule("top", "-22px");
    wrapper.setProps({ dense: false, inputState: "error" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "color",
      theme.colors.error
    );
    wrapper.setProps({ inputState: "disabled" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "color",
      theme.colors.base45pct
    );
  });

  it("sets the proper styling when state.isTouched is true", () => {
    wrapper.setState({ isTouched: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input__InputField")).toHaveStyleRule(
      "padding-bottom",
      "1px"
    );
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(wrapper.find("label__LabelField")).toHaveStyleRule("top", "-12px");
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "font-size",
      "12px"
    );
    wrapper.setProps({ dense: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label__LabelField")).toHaveStyleRule("top", "-22px");
    wrapper.setProps({ dense: false, inputState: "error" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "color",
      theme.colors.error
    );
    wrapper.setProps({ inputState: "disabled" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label__LabelField")).toHaveStyleRule(
      "color",
      theme.colors.base45pct
    );
  });
});
