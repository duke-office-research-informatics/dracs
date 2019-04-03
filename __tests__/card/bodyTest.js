import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { CardBody, IconMenu } from "../../lib/dracs.es.js";

describe("CardBody", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(<CardBody />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("passes className via props", () => {
    wrapper.setProps({ className: "testClass" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("body__CardBodyWrap").hasClass("testClass")).toBe(true);
  });

  it("passes height via props", () => {
    wrapper.setProps({ height: "100px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("body__CardBodyWrap")).toHaveStyleRule(
      "height",
      "100px"
    );
  });

  it("renders children", () => {
    const body = mountWithTheme(
      <CardBody>
        <IconMenu />
      </CardBody>
    );
    expect(body).toMatchSnapshot();
    expect(body.find(IconMenu)).toBeDefined();
  });

  it("sets padding via props", () => {
    wrapper.setProps({ padding: "8px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("body__CardBodyWrap")).toHaveStyleRule(
      "padding",
      "8px"
    );
  });

  it("applies a style object via props", () => {
    wrapper.setProps({ style: { margin: "8px" } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("body__CardBodyWrap").props().style).toHaveProperty(
      "margin",
      "8px"
    );
  });
});
