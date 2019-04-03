import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { theme, Card, IconMenu } from "../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("Card", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(<Card />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("does not return any a11y violations", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("sets background color via props", () => {
    wrapper.setProps({ bgColor: theme.colors.dashBG });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule(
      "background-color",
      theme.colors.dashBG
    );
  });

  it("does not apply a border when `border` set to false", () => {
    wrapper.setProps({ border: false });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).not.toHaveStyleRule(
      "border",
      `solid 1px ${theme.colors.border}`
    );
  });

  it("attaches children", () => {
    const card = mountWithTheme(
      <Card>
        <IconMenu />
      </Card>
    );
    expect(card).toMatchSnapshot();
    expect(card.find(IconMenu)).toBeDefined();
  });

  it("attaches a className via props", () => {
    wrapper.setProps({ className: "testClass" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper").hasClass("testClass")).toBe(true);
  });

  it("sets height via props", () => {
    wrapper.setProps({ height: "300px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule(
      "height",
      "300px"
    );
  });

  it("sets margin via props", () => {
    wrapper.setProps({ margin: "20px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule("margin", "20px");
  });

  it("sets minHeight via props", () => {
    wrapper.setProps({ minHeight: "200px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule(
      "min-height",
      "200px"
    );
  });

  it("sets minWidth via props", () => {
    wrapper.setProps({ minWidth: "200px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule(
      "min-width",
      "200px"
    );
  });

  it("sets an onClick handler that is called on click", () => {
    wrapper.setProps({ onClick: mockFn });
    expect(wrapper).toMatchSnapshot();
    wrapper.find("card__CardWrapper").simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("sets padding via props", () => {
    wrapper.setProps({ padding: "8px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule("padding", "8px");
  });

  it("adds a box-shadow when `raised` is set to true", () => {
    wrapper.setProps({ raised: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule(
      "box-shadow",
      "0 1px 3px 0 rgba(0,0,0,0.25)"
    );
  });

  it("sets a style object via props", () => {
    wrapper.setProps({ style: { flexDirection: "row" } });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper").props().style).toHaveProperty(
      "flexDirection",
      "row"
    );
  });

  it("sets a width via props", () => {
    wrapper.setProps({ width: "100px" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule("width", "100px");
  });

  it("sets an html id attr via props", () => {
    wrapper.setProps({ id: "testID" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper").find("#testID")).toBeDefined();
  });

  it("sets a mediaQuery via props", () => {
    wrapper.setProps({ mediaQuery: "@media(max-width:768px){padding:8px}" });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("card__CardWrapper")).toHaveStyleRule(
      "padding",
      "8px",
      {
        media: "(max-width:768px)",
      }
    );
  });
});
