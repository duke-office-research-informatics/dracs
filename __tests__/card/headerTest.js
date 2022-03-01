import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { theme, CardHeader, IconMenu } from "../../lib/dracs.es.js";

describe("CardHeader", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(<CardHeader />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("sets a bottom border when `border` is set to true", () => {
    wrapper.setProps({ border: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("header__CardHeaderWrap")).toHaveStyleRule(
      "border-bottom",
      `solid 1px ${theme.colors.border}`
    );
  });

  it("renders children", () => {
    const header = mountWithTheme(
      <CardHeader>
        <IconMenu />
      </CardHeader>
    );
    expect(header).toMatchSnapshot();
    expect(header.find(IconMenu)).toBeDefined();
  });

  it("passes a classname via props", () => {
    wrapper.setProps({ className: "testClass" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("header__CardHeaderWrap").hasClass("testClass")).toBe(
      true
    );
  });

  it("applies the proper styles for drag-n-drop when `dragHandle` is true", () => {
    wrapper.setProps({ dragHandle: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("header__CardHeaderWrap")).toHaveStyleRule(
      "cursor",
      "move"
    );
    expect(
      wrapper.find("header__CardHeaderWrap")
    ).toHaveStyleRule("background-color", "rgba(0,0,0,0.1)", {
      modifier: ":hover",
    });
  });

  it("sets an html title via props", () => {
    const title = '<div id="title">title</div>';
    wrapper.setProps({ htmlTitle: true, title: title });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("#title")).toBeDefined();
  });

  it("sets the icon via props", () => {
    wrapper.setProps({ icon: <IconMenu /> });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(IconMenu)).toBeDefined();
  });

  it("attaches a style object to the header", () => {
    wrapper.setProps({ style: { backgroundColor: "#fff" } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("header__CardHeaderWrap").props().style).toHaveProperty(
      "backgroundColor",
      "#fff"
    );
  });
});
