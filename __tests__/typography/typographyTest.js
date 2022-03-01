import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { H1, H2, H3, H4, H5, P, theme } from "../../lib/dracs.es.js";

describe("H1", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(<H1>An H1 is you</H1>);
  });

  it("matches dom snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no accessiblity violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("font-family: Roboto, Open-Sans, Sans-Serif", () => {
    expect(wrapper).toHaveStyleRule(
      "font-family",
      '"Roboto","Open-Sans",Sans-Serif'
    );
  });

  it("font-size: 2.625em", () => {
    expect(wrapper).toHaveStyleRule("font-size", "2.625em");
  });

  it("line-height: 1.16em", () => {
    expect(wrapper).toHaveStyleRule("line-height", "1.16em");
  });

  it("padding: 0", () => {
    expect(wrapper).toHaveStyleRule("padding", "0");
  });

  it("displays correct color when `color` prop is declared", () => {
    const el = mountWithTheme(
      <H1 color={theme.colors.action}>An H1 is you</H1>
    );
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("color", theme.colors.action);
  });

  it("sets the top/bottom margin when `margin` prop is declared", () => {
    const el = mountWithTheme(<H1 margin={8}>An H1 is you</H1>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("margin", "8px 0");
  });

  it("bolds when `bold` prop is set to true", () => {
    const el = mountWithTheme(<H1 bold>An H1 is you</H1>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-weight", "700");
  });

  it("italicizes when `italic` prop is set to true", () => {
    const el = mountWithTheme(<H1 italic>An H1 is you</H1>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-style", "italic");
  });
});

describe("H2", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(<H2>An H2 is you</H2>);
  });

  it("matches dom snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no accessiblity violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("font-family: Roboto, Open-Sans, Sans-Serif", () => {
    expect(wrapper).toHaveStyleRule(
      "font-family",
      '"Roboto","Open-Sans",Sans-Serif'
    );
  });

  it("font-size: 2.125em", () => {
    expect(wrapper).toHaveStyleRule("font-size", "2.125em");
  });

  it("line-height: 1.18em", () => {
    expect(wrapper).toHaveStyleRule("line-height", "1.18em");
  });

  it("padding: 0", () => {
    expect(wrapper).toHaveStyleRule("padding", "0");
  });

  it("displays correct color when `color` prop is declared", () => {
    const el = mountWithTheme(
      <H2 color={theme.colors.action}>An H2 is you</H2>
    );
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("color", theme.colors.action);
  });

  it("sets the top/bottom margin when `margin` prop is declared", () => {
    const el = mountWithTheme(<H2 margin={8}>An H2 is you</H2>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("margin", "8px 0");
  });

  it("bolds when `bold` prop is set to true", () => {
    const el = mountWithTheme(<H2 bold>An H2 is you</H2>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-weight", "700");
  });

  it("italicizes when `italic` prop is set to true", () => {
    const el = mountWithTheme(<H2 italic>An H2 is you</H2>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-style", "italic");
  });
});

describe("H3", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(<H3>An H3 is you</H3>);
  });

  it("matches dom snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no accessiblity violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("font-family: Roboto, Open-Sans, Sans-Serif", () => {
    expect(wrapper).toHaveStyleRule(
      "font-family",
      '"Roboto","Open-Sans",Sans-Serif'
    );
  });

  it("font-size: 1.5em", () => {
    expect(wrapper).toHaveStyleRule("font-size", "1.5em");
  });

  it("line-height: 1.35em", () => {
    expect(wrapper).toHaveStyleRule("line-height", "1.35em");
  });

  it("padding: 0", () => {
    expect(wrapper).toHaveStyleRule("padding", "0");
  });

  it("displays correct color when `color` prop is declared", () => {
    const el = mountWithTheme(
      <H3 color={theme.colors.action}>An H3 is you</H3>
    );
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("color", theme.colors.action);
  });

  it("sets the top/bottom margin when `margin` prop is declared", () => {
    const el = mountWithTheme(<H3 margin={8}>An H3 is you</H3>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("margin", "8px 0");
  });

  it("bolds when `bold` prop is set to true", () => {
    const el = mountWithTheme(<H3 bold>An H3 is you</H3>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-weight", "700");
  });

  it("italicizes when `italic` prop is set to true", () => {
    const el = mountWithTheme(<H3 italic>An H3 is you</H3>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-style", "italic");
  });
});

describe("H4", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(<H4>An H4 is you</H4>);
  });

  it("matches dom snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no accessiblity violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("font-family: Roboto, Open-Sans, Sans-Serif", () => {
    expect(wrapper).toHaveStyleRule(
      "font-family",
      '"Roboto","Open-Sans",Sans-Serif'
    );
  });

  it("font-size: 1em", () => {
    expect(wrapper).toHaveStyleRule("font-size", "1em");
  });

  it("line-height: 1.5em", () => {
    expect(wrapper).toHaveStyleRule("line-height", "1.5em");
  });

  it("padding: 0", () => {
    expect(wrapper).toHaveStyleRule("padding", "0");
  });

  it("displays correct color when `color` prop is declared", () => {
    const el = mountWithTheme(
      <H4 color={theme.colors.action}>An H4 is you</H4>
    );
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("color", theme.colors.action);
  });

  it("sets the top/bottom margin when `margin` prop is declared", () => {
    const el = mountWithTheme(<H4 margin={8}>An H4 is you</H4>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("margin", "8px 0");
  });

  it("bolds when `bold` prop is set to true", () => {
    const el = mountWithTheme(<H4 bold>An H4 is you</H4>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-weight", "700");
  });

  it("italicizes when `italic` prop is set to true", () => {
    const el = mountWithTheme(<H4 italic>An H4 is you</H4>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-style", "italic");
  });
});

describe("H5", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(<H5>An H5 is you</H5>);
  });

  it("matches dom snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no accessiblity violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("font-family: Roboto, Open-Sans, Sans-Serif", () => {
    expect(wrapper).toHaveStyleRule(
      "font-family",
      '"Roboto","Open-Sans",Sans-Serif'
    );
  });

  it("font-size: 0.875em", () => {
    expect(wrapper).toHaveStyleRule("font-size", "0.875em");
  });

  it("line-height: 1.15em", () => {
    expect(wrapper).toHaveStyleRule("line-height", "1.15em");
  });

  it("padding: 0", () => {
    expect(wrapper).toHaveStyleRule("padding", "0");
  });

  it("line-height: 1.43em when `expanded` is set to true", () => {
    const el = mountWithTheme(<H5 expanded>An H5 is you</H5>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("line-height", "1.43em");
  });

  it("displays correct color when `color` prop is declared", () => {
    const el = mountWithTheme(
      <H5 color={theme.colors.action}>An H5 is you</H5>
    );
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("color", theme.colors.action);
  });

  it("sets the top/bottom margin when `margin` prop is declared", () => {
    const el = mountWithTheme(<H5 margin={8}>An H5 is you</H5>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("margin", "8px 0");
  });

  it("bolds when `bold` prop is set to true", () => {
    const el = mountWithTheme(<H5 bold>An H5 is you</H5>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-weight", "700");
  });

  it("italicizes when `italic` prop is set to true", () => {
    const el = mountWithTheme(<H5 italic>An H5 is you</H5>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-style", "italic");
  });
});

describe("P", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(<P>An P is you</P>);
  });

  it("matches dom snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no accessiblity violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("font-family: Roboto, Open-Sans, Sans-Serif", () => {
    expect(wrapper).toHaveStyleRule(
      "font-family",
      '"Roboto","Open-Sans",Sans-Serif'
    );
  });

  it("font-size: 0.875em", () => {
    expect(wrapper).toHaveStyleRule("font-size", "0.875em");
  });

  it("line-height: 1.15em", () => {
    expect(wrapper).toHaveStyleRule("line-height", "1.15em");
  });

  it("padding: 0", () => {
    expect(wrapper).toHaveStyleRule("padding", "0");
  });

  it("line-height: 1.43em when `expanded` is set to true", () => {
    const el = mountWithTheme(<P expanded>An P is you</P>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("line-height", "1.43em");
  });

  it("displays correct color when `color` prop is declared", () => {
    const el = mountWithTheme(<P color={theme.colors.action}>An P is you</P>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("color", theme.colors.action);
  });

  it("sets the top/bottom margin when `margin` prop is declared", () => {
    const el = mountWithTheme(<P margin={8}>An P is you</P>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("margin", "8px 0");
  });

  it("bolds when `bold` prop is set to true", () => {
    const el = mountWithTheme(<P bold>An P is you</P>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-weight", "700");
  });

  it("italicizes when `italic` prop is set to true", () => {
    const el = mountWithTheme(<P italic>An P is you</P>);
    expect(el).toMatchSnapshot();
    expect(el).toHaveStyleRule("font-style", "italic");
  });
});
