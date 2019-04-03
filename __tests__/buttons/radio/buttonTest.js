import React from "react";
import { mountWithTheme } from "../../../config/scUtils.js";
import { axe } from "jest-axe";
import { RadioButton, theme, IconMenu } from "../../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("Radio Button", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(
      <RadioButton name="testButton" label="test button" value="testButton" />
    );
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("calls the onChange handler on input click", () => {
    wrapper.setProps({ onChange: mockFn });
    expect(wrapper).toMatchSnapshot();
    wrapper.find("buttons__RadioInput").simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("calls onChange handler on label click when `changeOnLabelClick` is true", () => {
    wrapper.setProps({ onChange: mockFn, changeOnLabelClick: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.find("#testButton-label").simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("renders a child", () => {
    const btn = mountWithTheme(
      <RadioButton name="testButton" label="test button" value="testButton">
        <IconMenu />
      </RadioButton>
    );
    expect(btn).toMatchSnapshot();
    expect(IconMenu).toBeDefined();
  });

  it("disables itself when `disabled` is set to true", () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find("buttons__RadioInput")
        .getDOMNode()
        .attributes.getNamedItem("disabled").value
    ).toBe("");
    const label = wrapper.find("buttons__RadioWrap");
    expect(label).toHaveStyleRule("color", theme.colors.muted, {
      modifier: "span",
    });
    expect(label).toHaveStyleRule("cursor", "not-allowed", {
      modifier: "span",
    });
  });

  it("passes a style object to the label when passed via `labelStyle` prop", () => {
    wrapper.setProps({ labelStyle: { color: theme.colors.action } });
    expect(wrapper.find("#testButton-label").props().style).toHaveProperty(
      "color",
      theme.colors.action
    );
  });
});
