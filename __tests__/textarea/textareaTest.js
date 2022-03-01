import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { TextArea, IconMenu, theme } from "../../lib/dracs.es.js";

const mockClick = jest.fn();

describe("Textarea", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(
      <TextArea labelText="testLabel" name="testLabelName" value="" />
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

  it("sets focus on the textarea when `autoFocus`=true", () => {
    const textarea = mountWithTheme(
      <TextArea
        labelText="testLabel"
        name="testLabelName"
        value=""
        autoFocus={true}
      />
    );
    expect(textarea).toMatchSnapshot();
    expect(textarea.find("textarea__TextareaInput").getDOMNode()).toBe(
      document.activeElement
    );
  });

  it("sets `helpText` via props", async () => {
    wrapper.setProps({ helpText: "test help" });
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("help-text__HelpLabel").text()).toBe("test help");
  });

  it("sets `helpIcon` via props", () => {
    wrapper.setProps({ helpIcon: IconMenu });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("help-text__HelpLabel").find(IconMenu).length).toBe(1);
  });

  it("sets id attr via props and propogages to relevant elements for a11y", async () => {
    wrapper.setProps({ id: "testId" });
    const input = wrapper.find("textarea__TextareaInput");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(wrapper).toMatchSnapshot();
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
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
    const input = wrapper.find("textarea__TextareaInput");
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(wrapper).toMatchSnapshot();
    expect(elWrap).toHaveStyleRule("padding", "20px 0 0 0");
    expect(elWrap).toHaveStyleRule(
      "border",
      "solid 1px hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(input).toHaveStyleRule("color", theme.colors.base90pct);
    expect(input).toHaveStyleRule("color", "transparent", {
      modifier: "::placeholder",
    });
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

  it("applies the correct styles and attrs when `inputState`=error ", async () => {
    wrapper.setProps({ helpIcon: IconMenu, inputState: "error" });
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    const input = wrapper.find("textarea__TextareaInput");
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(wrapper).toMatchSnapshot();
    expect(elWrap).toHaveStyleRule("border", `solid 1px ${theme.colors.error}`);
    expect(input).toHaveStyleRule("color", theme.colors.error);
    expect(input).toHaveStyleRule("color", "transparent", {
      modifier: "::placeholder",
    });
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
    wrapper.setProps({ helpIcon: IconMenu, inputState: "disabled" });
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    const input = wrapper.find("textarea__TextareaInput");
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("textarea__ComponentWrapper")).toHaveStyleRule(
      "cursor",
      "not-allowed"
    );
    expect(elWrap).toHaveStyleRule(
      "border",
      "solid 1px hsla(0,0%,14.9%,0.44999999999999996)"
    );
    expect(elWrap).toHaveStyleRule("background-color", theme.colors.dashBG);
    expect(input.getDOMNode().attributes.getNamedItem("disabled").value).toBe(
      ""
    );
    expect(input).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.44999999999999996)"
    );
    expect(input).toHaveStyleRule("background-color", theme.colors.dashBG);
    expect(input).toHaveStyleRule("cursor", "not-allowed");
    expect(input).toHaveStyleRule("color", "transparent", {
      modifier: "::placeholder",
    });
    expect(input).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.44999999999999996)",
      { modifier: ":focus::placeholder" }
    );
    expect(floatingLabel).toHaveStyleRule("color", theme.colors.base45pct);
    expect(helpText).toHaveStyleRule("color", theme.colors.base45pct);
    expect(helpText.find("icon_wrapper__Icon")).toHaveStyleRule(
      "fill",
      theme.colors.base45pct
    );
  });

  it("sets `labelText` via props", () => {
    expect(wrapper.find("label__LabelField").text()).toBe("testLabel");
  });

  it("sets html name attr via props and uses it for a11y ids if no id is declared", () => {
    const input = wrapper.find("textarea__TextareaInput");
    const floatingLabel = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(input.getDOMNode().attributes.getNamedItem("id").value).toBe(
      "testLabelName"
    );
    expect(
      input.getDOMNode().attributes.getNamedItem("aria-controls").value
    ).toBe("testLabelName-statusText");
    expect(
      floatingLabel.getDOMNode().attributes.getNamedItem("for").value
    ).toBe("testLabelName");
    expect(helpText.getDOMNode().attributes.getNamedItem("id").value).toBe(
      "testLabelName-statusText"
    );
  });

  it("sets an onBlur func and sets state.isFocused to false on blur", () => {
    wrapper.setProps({ onBlur: mockClick });
    wrapper.setState({ isFocused: true });
    const input = wrapper.find("textarea__TextareaInput");
    expect(wrapper).toMatchSnapshot();
    input.simulate("blur");
    expect(mockClick).toHaveBeenCalled();
    expect(wrapper.state().isFocused).toBe(false);
  });

  it("sets an onChange function on the input and sets state.isTouched to true if value isnt empty", () => {
    wrapper.setProps({ onChange: mockClick });
    const input = wrapper.find("textarea__TextareaInput");
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

  it("sets an onClick func on the textarea wrapper via props", () => {
    wrapper.setProps({ onClick: mockClick });
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    elWrap.simulate("click");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onFocus func on the input and sets state.isFocused to true on focus", () => {
    wrapper.setProps({ onFocus: mockClick });
    const input = wrapper.find("textarea__TextareaInput");
    input.simulate("focus");
    expect(mockClick).toHaveBeenCalled();
    expect(wrapper.state().isFocused).toBe(true);
  });

  it("sets an onKeyDown func on the input via props", () => {
    wrapper.setProps({ onKeyDown: mockClick });
    const input = wrapper.find("textarea__TextareaInput");
    input.simulate("keydown");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onKeyUp func on the input via props", () => {
    wrapper.setProps({ onKeyUp: mockClick });
    const input = wrapper.find("textarea__TextareaInput");
    input.simulate("keyup");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseDown func on the textarea wrapper via props", () => {
    wrapper.setProps({ onMouseDown: mockClick });
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    elWrap.simulate("mousedown");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseEnter func on the textarea wrapper via props", () => {
    wrapper.setProps({ onMouseEnter: mockClick });
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    elWrap.simulate("mouseenter");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseLeave func on the textarea wrapper via props", () => {
    wrapper.setProps({ onMouseLeave: mockClick });
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    elWrap.simulate("mouseleave");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onMouseUp func on the textarea wrapper via props", () => {
    wrapper.setProps({ onMouseUp: mockClick });
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    elWrap.simulate("mouseup");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onTouchStart func on the textarea wrapper via props", () => {
    wrapper.setProps({ onTouchStart: mockClick });
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    elWrap.simulate("touchstart");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets an onTouchEnd func on the textarea wrapper via props", () => {
    wrapper.setProps({ onTouchEnd: mockClick });
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    elWrap.simulate("touchend");
    expect(mockClick).toHaveBeenCalled();
  });

  it("sets the placeholder on input via props", () => {
    wrapper.setProps({ placeholder: "tteesstt" });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find("textarea__TextareaInput")
        .getDOMNode()
        .attributes.getNamedItem("placeholder").value
    ).toBe("tteesstt");
  });

  it("sets the readOnly attr on input via props", () => {
    wrapper.setProps({ readOnly: true });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find("textarea__TextareaInput")
        .getDOMNode()
        .attributes.getNamedItem("readonly").value
    ).toBe("");
  });

  it("sets the required attr via props and adds a star to the label", async () => {
    wrapper.setProps({ required: true });
    expect(wrapper).toMatchSnapshot();
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    const input = wrapper.find("textarea__TextareaInput");
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
        .find("textarea__TextareaInput")
        .getDOMNode()
        .attributes.getNamedItem("type").value
    ).toBe("search");
  });

  it("sets the inputs value via props", () => {
    wrapper.setProps({ value: "test" });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("textarea__TextareaInput").props().value).toBe("test");
    expect(wrapper.find("textarea__TextareaInput").getDOMNode().value).toBe(
      "test"
    );
  });

  it("sets the components height via props", () => {
    wrapper.setProps({ height: "500px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("textarea__TextareaWrapper")).toHaveStyleRule(
      "height",
      "500px"
    );
  });

  it("sets the inputs width via props", () => {
    wrapper.setProps({ width: "500px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("textarea__ComponentWrapper")).toHaveStyleRule(
      "width",
      "500px"
    );
  });

  it("sets a style object on the component wrapper via props", () => {
    wrapper.setProps({ wrapperStyle: { backgroundColor: "blue" } });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find("textarea__ComponentWrapper").props().style
    ).toHaveProperty("backgroundColor", "blue");
  });

  it("sets textarea-specific styles on the helpText and label", () => {
    wrapper.setProps({ helpText: "help" });
    const label = wrapper.find("label__LabelField");
    const helpText = wrapper.find("help-text__HelpLabel");
    expect(label).toHaveStyleRule("top", "12px");
    expect(label).toHaveStyleRule("left", "8px");
    expect(label).not.toHaveStyleRule(
      "transform",
      "translate3d(0, 24px, 0) scale( 1 )"
    );
    expect(helpText).toHaveStyleRule("padding-left", "2px");
  });

  it("sets the proper styles when state.isFocused=true", () => {
    wrapper.setState({ isFocused: true });
    const input = wrapper.find("textarea__TextareaInput");
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    const label = wrapper.find("label__LabelField");
    expect(wrapper).toMatchSnapshot();
    expect(elWrap).toHaveStyleRule("padding", "19px 0 0 0");
    expect(elWrap).toHaveStyleRule(
      "border",
      `solid 2px ${theme.colors.action}`
    );
    expect(input).toHaveStyleRule("padding", "0 7px 7px 7px");
    expect(label).toHaveStyleRule(
      "color",
      "hsla(203.200000000005,94.3%,41.4%,0.87)"
    );
    expect(label).toHaveStyleRule("top", "2px");
    expect(label).toHaveStyleRule("font-size", "12px");
  });

  it("sets the proper styles when state.isTouched=true", () => {
    wrapper.setState({ isTouched: true });
    const input = wrapper.find("textarea__TextareaInput");
    const elWrap = wrapper.find("textarea__TextareaWrapper");
    const label = wrapper.find("label__LabelField");
    expect(wrapper).toMatchSnapshot();
    expect(elWrap).toHaveStyleRule("padding", "20px 0 0 0");
    expect(elWrap).toHaveStyleRule(
      "border",
      "solid 1px hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(input).toHaveStyleRule("padding", "0 8px 8px 8px");
    expect(label).toHaveStyleRule(
      "color",
      "hsla(0,0%,14.9%,0.5700000000000001)"
    );
    expect(label).toHaveStyleRule("top", "2px");
    expect(label).toHaveStyleRule("font-size", "12px");
  });
});
