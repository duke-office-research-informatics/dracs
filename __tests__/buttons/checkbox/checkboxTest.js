import React from "react";
import { mountWithTheme } from "../../../config/scUtils.js";
import { axe } from "jest-axe";
import { Checkbox, IconMenu, theme } from "../../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("checkbox", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(
      <Checkbox checked={false} name="testCheckbox" label="hello" />
    );
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("calls the onChange handler when input is clicked", () => {
    const ckbx = wrapper.setProps({ onChange: mockFn });
    expect(ckbx).toMatchSnapshot();
    const input = ckbx.find("checkbox__CheckboxInput");
    input.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("calls the onChange handler when label is clicked when `changeOnLabelClick` is true", () => {
    const ckbx = wrapper.setProps({
      onChange: mockFn,
      changeOnLabelClick: true,
    });
    expect(ckbx).toMatchSnapshot();
    const label = ckbx.find("checkbox__CheckboxLabel");
    label.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("inserts a child", () => {
    const ckbx = mountWithTheme(
      <Checkbox checked={false} name="testCheckbox" label="hello">
        <IconMenu />
      </Checkbox>
    );
    expect(ckbx).toMatchSnapshot();
    expect(IconMenu).toBeDefined();
  });

  it("sets input as disabled via props", () => {
    const ckbx = wrapper.setProps({ disabled: true });
    expect(ckbx).toMatchSnapshot();
    const input = wrapper.find("checkbox__CheckboxInput");
    expect(input.getDOMNode().attributes.getNamedItem("disabled").value).toBe(
      ""
    );
    const label = wrapper.find("checkbox__CheckboxLabel");
    expect(label).toHaveStyleRule("cursor", "not-allowed");
  });

  it("returns no a11y violations when set to disabled", async () => {
    const ckbx = wrapper.setProps({ disabled: true });
    const results = await axe(ckbx.html());
    expect(results).toHaveNoViolations();
  });

  it("sets labelStyle via style object passed as props", () => {
    const ckbx = wrapper.setProps({
      labelStyle: { color: theme.colors.action },
    });
    expect(ckbx).toMatchSnapshot();
    expect(ckbx.find("checkbox__CheckboxLabel").props().style).toHaveProperty(
      "color",
      theme.colors.action
    );
  });

  it("applies an onBlur function via props and calls function on blur", () => {
    const ckbx = wrapper.setProps({ onBlur: mockFn });
    expect(ckbx).toMatchSnapshot();
    ckbx.find("checkbox__CheckboxInput").simulate("blur");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onFocus function via props and calls function on focus", () => {
    const ckbx = wrapper.setProps({ onFocus: mockFn });
    expect(ckbx).toMatchSnapshot();
    ckbx.find("checkbox__CheckboxInput").simulate("focus");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onMouseEnter function via props and calls function on mouseenter", () => {
    const ckbx = wrapper.setProps({ onMouseEnter: mockFn });
    expect(ckbx).toMatchSnapshot();
    ckbx.find("checkbox__CheckboxInput").simulate("mouseenter");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onMouseLeave function via props and calls function on mouseleave", () => {
    const ckbx = wrapper.setProps({ onMouseLeave: mockFn });
    expect(ckbx).toMatchSnapshot();
    ckbx.find("checkbox__CheckboxInput").simulate("mouseleave");
    expect(mockFn).toHaveBeenCalled();
  });

  it("sets wrapper style via object passed as props", () => {
    const ckbx = wrapper.setProps({ style: { color: theme.colors.action } });
    expect(ckbx).toMatchSnapshot();
    expect(ckbx.find("checkbox__ElWrap").props().style).toHaveProperty(
      "color",
      theme.colors.action
    );
  });

  it("underlines the label on hover when `underlineLabelOnHover` is set to true", () => {
    const ckbx = wrapper.setProps({ underlineLabelOnHover: true });
    expect(ckbx).toMatchSnapshot();
    expect(ckbx.find("checkbox__CheckboxLabel")).toHaveStyleRule(
      "text-decoration",
      "underline",
      {
        modifier: ":hover",
      }
    );
  });
});
