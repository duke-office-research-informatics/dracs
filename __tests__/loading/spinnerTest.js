import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { Spinner, theme } from "../../lib/dracs.es.js";

describe("Loading Spinner", () => {
  it("matches snapshot and returns no a11y violations", async () => {
    const spinner = mountWithTheme(<Spinner />);
    expect(spinner).toMatchSnapshot();
    const results = await axe(spinner.html());
    expect(results).toHaveNoViolations();
  });
  it("sets the color of all 12 spinner bars via the color prop", () => {
    const testColor = theme.colors.error;
    const spinner = mountWithTheme(<Spinner color={testColor} />);
    expect(spinner).toMatchSnapshot();
    const spinnerBars = spinner.find("spinner__SpinnerBar");
    expect(spinnerBars.length).toBe(12);
    spinnerBars.forEach(bar => {
      expect(bar.props().color).toBe(testColor);
      expect(bar).toHaveStyleRule("background-color", testColor);
    });
  });
  it("sets an HTML id attr on the proper dom node via the id prop", () => {
    const testId = "testId";
    const spinner = mountWithTheme(<Spinner id={testId} />);
    expect(spinner).toMatchSnapshot();
    expect(spinner.find("spinner__SpinnerWrap").props().id).toBe(testId);
    expect(spinner.find("spinner__SpinnerWrap").is("#testId")).toBe(true);
  });
  it("sets the correct styles when margin prop is set to true", () => {
    const margin = "8px";
    const spinner = mountWithTheme(<Spinner margin={margin} />);
    expect(spinner).toMatchSnapshot();
    expect(spinner.find("spinner__ElementWrap")).toHaveStyleRule(
      "margin",
      margin
    );
  });
  it("sets the correct styles via size prop", () => {
    const spinner = mountWithTheme(<Spinner size={24} />);
    expect(spinner).toMatchSnapshot();
    expect(spinner.find("spinner__ElementWrap")).toHaveStyleRule(
      "height",
      "12px"
    );
    expect(spinner.find("spinner__ElementWrap")).toHaveStyleRule(
      "width",
      "12px"
    );
    expect(spinner.find("spinner__SpinnerWrap")).toHaveStyleRule(
      "height",
      "24px"
    );
    expect(spinner.find("spinner__SpinnerWrap")).toHaveStyleRule(
      "width",
      "24px"
    );
  });
  it("sets style on the proper dom node when style obj is passed via wrapperStyle prop", () => {
    const spinner = mountWithTheme(
      <Spinner wrapperStyle={{ padding: "8px" }} />
    );
    expect(spinner).toMatchSnapshot();
    expect(spinner.find("spinner__ElementWrap").props().style).toHaveProperty(
      "padding",
      "8px"
    );
  });
});
