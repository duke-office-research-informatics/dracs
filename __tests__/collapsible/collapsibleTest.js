import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { theme, Collapsible, IconMenu, IconHelp } from "../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("Collapsible", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(
      <Collapsible title="hello">
        <IconMenu />
      </Collapsible>
    );
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("matches snapshot and returns no a11y violations when active is set to true", async () => {
    wrapper.setProps({ active: true });
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
    expect(wrapper).toMatchSnapshot();
  });

  it("Does not display body when state.active is false", () => {
    expect(wrapper.state().active).toBeFalsy();
    expect(wrapper.find("collapsible__BodyWrap")).toHaveStyleRule(
      "display",
      "none"
    );
  });

  it("Displays body and sets state.active to true on toggle click", () => {
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find("collapsible__CollapseToggle").simulate("click");
    expect(wrapper.find("collapsible__BodyWrap")).toHaveStyleRule(
      "display",
      "flex"
    );
    expect(wrapper.state().active).toBe(true);
  });

  it("Displays body and sets state.active to true on title click", () => {
    expect(wrapper.state().active).toBeFalsy();
    wrapper.find("collapsible__ToggleWrap").simulate("click");
    expect(wrapper.find("collapsible__BodyWrap")).toHaveStyleRule(
      "display",
      "flex"
    );
    expect(wrapper.state().active).toBe(true);
  });

  it("Hides body and sets state.active to false when toggle is clicked and active is true", () => {
    wrapper.setProps({ active: true });
    expect(wrapper.state().active).toBe(true);
    wrapper.find("collapsible__ToggleWrap").simulate("click");
    expect(wrapper.state().active).toBe(false);
    expect(wrapper.find("collapsible__BodyWrap")).toHaveStyleRule(
      "display",
      "none"
    );
  });

  it("sets wrapper padding via props", () => {
    wrapper.setProps({ componentWrapperPadding: "8px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("collapsible__ElementWrap")).toHaveStyleRule(
      "padding",
      "8px"
    );
  });

  it("passes click function to toggle via onToggleClick prop", () => {
    wrapper.setProps({ onToggleClick: mockFn });
    expect(wrapper).toMatchSnapshot();
    wrapper.find("collapsible__ToggleWrap").simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("passes a string title via props", () => {
    expect(wrapper.find("collapsible__ToggleWrap").text()).toContain("hello");
  });

  it("passes a react element title via props", () => {
    wrapper.setProps({ title: <IconHelp /> });
    expect(wrapper).toMatchSnapshot();
    expect(IconHelp).toBeDefined();
  });

  it("passes a title color via props", () => {
    wrapper.setProps({ titleColor: theme.colors.base });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find("collapsible__ToggleWrap").find("typography__H4")
    ).toHaveStyleRule("color", theme.colors.base);
  });

  it("passes a title hover color via props", () => {
    wrapper.setProps({ titleHoverColor: theme.colors.muted });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find("collapsible__ToggleWrap").props().titleHoverColor
    ).toBe(theme.colors.muted);
    // expect(wrapper.find('collapsible__ToggleWrap')).toHaveStyleRule('color', theme.colors.muted, { modifier: '.c1:hover .c2' });
  });

  it("sets a style object on the component wrapper via props", () => {
    wrapper.setProps({ wrapperStyle: { margin: "8px" } });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find("collapsible__ElementWrap").props().style
    ).toHaveProperty("margin", "8px");
  });
});
