import React from "react";
import { mountWithTheme } from "../../../config/scUtils.js";
import { axe } from "../../../config/axe-helper.js";
import { RadioGroup, RadioButton, theme } from "../../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("RadioGroup", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(
      <RadioGroup name="testGroup" onChange={mockFn} value="button1">
        <RadioButton label="button 1" name="button1" value="button1" />
        <RadioButton label="button 2" name="button2" value="button2" />
      </RadioGroup>
    );
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("calls the change handler when a radio button is clicked", () => {
    const btn = wrapper
      .find(RadioButton)
      .last()
      .find("buttons__RadioInput");
    btn.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("sets buttons as disabled when `disabled` is set to true", () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
    const btn1 = wrapper
      .find(RadioButton)
      .first()
      .find("buttons__RadioInput");
    const btn2 = wrapper
      .find(RadioButton)
      .last()
      .find("buttons__RadioInput");
    expect(btn1.getDOMNode().attributes.getNamedItem("disabled").value).toBe(
      ""
    );
    expect(btn2.getDOMNode().attributes.getNamedItem("disabled").value).toBe(
      ""
    );
  });

  it("applies styles to the wrapper via `wrapperStyle` prop", () => {
    wrapper.setProps({ wrapperStyle: { color: theme.colors.action } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("group__RadioGroupWrap").props().style).toHaveProperty(
      "color",
      theme.colors.action
    );
  });
});
