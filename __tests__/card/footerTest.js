import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { CardFooter, theme } from "../../lib/dracs.es.js";

describe("CardFooter", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(<CardFooter />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("sets bgColor via props", () => {
    wrapper.setProps({ bgColor: theme.colors.muted });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("footer__CardFooterWrap")).toHaveStyleRule(
      "background-color",
      theme.colors.muted
    );
  });

  it("sets a border-top when border is set to true", () => {
    wrapper.setProps({ border: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("footer__CardFooterWrap")).toHaveStyleRule(
      "border-top",
      `solid 1px ${theme.colors.border}`
    );
  });

  it("sets proper styles when `multipleActions` set to true", () => {
    wrapper.setProps({ multipleActions: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("footer__CardFooterWrap")).toHaveStyleRule(
      "justify-content",
      "space-between"
    );
  });

  it("applies a style object via props", () => {
    wrapper.setProps({ style: { color: theme.colors.action } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("footer__CardFooterWrap").props().style).toHaveProperty(
      "color",
      theme.colors.action
    );
  });
});
