import React from "react";
import { mountWithTheme } from "../../../config/scUtils.js";
import { axe } from "jest-axe";
import { Button, IconMenu, theme } from "../../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("base Button", () => {
  it("matches snapshot", () => {
    const wrapper = mountWithTheme(<Button label="hello" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.text()).toBe("hello");
  });

  it("returns no a11y violations", async () => {
    const wrapper = mountWithTheme(<Button label="hello" />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("applies the correct styles with no props declared", () => {
    const wrapper = mountWithTheme(<Button label="hello" />);
    const btn = wrapper.find("button__StyledBtn");
    expect(btn).toHaveStyleRule("display", "flex");
    expect(btn).toHaveStyleRule("flex", "0 0 auto");
    expect(btn).toHaveStyleRule("justify-content", "center");
    expect(btn).toHaveStyleRule("align-items", "center");
    expect(btn).toHaveStyleRule("height", "36px");
    expect(btn).toHaveStyleRule("line-height", "2.8em");
    expect(btn).toHaveStyleRule("white-space", "nowrap");
    expect(btn).toHaveStyleRule("min-width", "64px");
    expect(btn).toHaveStyleRule("padding", "0 8px");
    expect(btn).toHaveStyleRule("font-size", "0.875em");
    expect(btn).toHaveStyleRule("font-weight", "400");
    expect(btn).toHaveStyleRule("letter-spacing", "0.075em");
    expect(btn).toHaveStyleRule("text-transform", "uppercase");
    expect(btn).toHaveStyleRule("transition", "all 0.2s ease-in-out");
    expect(btn).toHaveStyleRule("backface-visibility", "hidden");
    expect(btn).toHaveStyleRule("cursor", "pointer");
    expect(btn).toHaveStyleRule("border-radius", "2px");
    expect(btn).toHaveStyleRule("appearance", "none");
    expect(btn).toHaveStyleRule("background", "none");
    expect(btn).toHaveStyleRule("border", "0");
    expect(btn).toHaveStyleRule("box-shadow", "none");
    expect(btn).toHaveStyleRule("text-decoration", "none");
    expect(btn).toHaveStyleRule("user-select", "none");
    expect(btn).toHaveStyleRule("color", theme.colors.action);
    expect(btn).toHaveStyleRule("background-color", theme.colors.bg);
    expect(btn).toHaveStyleRule("-webkit-font-smoothing", "inherit");
    expect(btn).toHaveStyleRule("fill", theme.colors.action, {
      modifier: "svg",
    });
    expect(btn).toHaveStyleRule("color", theme.colors.actionHover, {
      modifier: ":hover",
    });
    expect(btn).toHaveStyleRule("color", theme.colors.actionHover, {
      modifier: ":focus",
    });
    expect(btn).toHaveStyleRule("background-color", theme.colors.bg, {
      modifier: ":hover",
    });
    expect(btn).toHaveStyleRule("background-color", theme.colors.bg, {
      modifier: ":focus",
    });
    expect(btn).toHaveStyleRule("fill", theme.colors.actionHover, {
      modifier: ":hover svg",
    });
    expect(btn).toHaveStyleRule("fill", theme.colors.actionHover, {
      modifier: ":focus svg",
    });
    expect(btn).toHaveStyleRule("outline-offset", "2px", {
      modifier: ":focus",
    });
    expect(btn).toHaveStyleRule("outline", "dotted 1px rgb(59,153,252)", {
      modifier: ":focus",
    });
  });

  it("applies a background color via props", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" bgColor={theme.colors.muted} />
    );
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.find("button__StyledBtn");
    expect(btn).toHaveStyleRule("background-color", theme.colors.muted);
  });

  it("applies a :hover(background-color) via props", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" bgHoverColor={theme.colors.muted} />
    );
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.find("button__StyledBtn");
    expect(btn).toHaveStyleRule("background-color", theme.colors.muted, {
      modifier: ":focus",
    });
  });

  it("applies a classname via props", () => {
    const wrapper = mountWithTheme(<Button label="hello" className="aclass" />);
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.find("button__StyledBtn");
    expect(btn.hasClass("aclass")).toBe(true);
  });

  it("applies the correct styles when `dense` is set to true", () => {
    const wrapper = mountWithTheme(<Button label="hello" dense />);
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.find("button__StyledBtn");
    expect(btn).toHaveStyleRule("height", "32px");
    expect(btn).toHaveStyleRule("line-height", "2.5em");
  });

  it("applies an html id via props", () => {
    const wrapper = mountWithTheme(<Button label="hello" id="anid" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("#anid")).toBeDefined();
  });

  it("applies a label color via props", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" labelColor={theme.colors.muted} />
    );
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.find("button__StyledBtn");
    expect(btn).toHaveStyleRule("color", theme.colors.muted);
  });

  it("applies the labelColor as the fill color to an svg passed via the label prop", () => {
    const wrapper = mountWithTheme(<Button label={<IconMenu />} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button__StyledBtn")).toHaveStyleRule(
      "fill",
      theme.colors.action,
      {
        modifier: "svg",
      }
    );
  });

  it("applies a label hover color via props", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" labelHoverColor={theme.colors.muted} />
    );
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.find("button__StyledBtn");
    expect(btn).toHaveStyleRule("color", theme.colors.muted, {
      modifier: ":hover",
    });
  });

  it("applies the labelHoverColor as the fill color to an svg passed via the label prop", () => {
    const wrapper = mountWithTheme(<Button label={<IconMenu />} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button__StyledBtn")).toHaveStyleRule(
      "fill",
      theme.colors.actionHover,
      {
        modifier: ":hover svg",
      }
    );
    expect(wrapper.find("button__StyledBtn")).toHaveStyleRule(
      "fill",
      theme.colors.actionHover,
      {
        modifier: ":focus svg",
      }
    );
  });

  it("applies a media query via props", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" mediaQuery="@media(max-width:768px){width:30px}" />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button__StyledBtn")).toHaveStyleRule("width", "30px", {
      media: "(max-width:768px)",
    });
  });

  it("applies the html name attribute via props", () => {
    const wrapper = mountWithTheme(<Button label="hello" name="testName" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("testName")).toBeDefined();
  });

  it("applies an onBlur function via props and triggers that function on blur", () => {
    const wrapper = mountWithTheme(<Button label="hello" onBlur={mockFn} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("blur");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onClick function via props and triggers that function on click", () => {
    const wrapper = mountWithTheme(<Button label="hello" onClick={mockFn} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onFocus function via props and triggers that function on focus", () => {
    const wrapper = mountWithTheme(<Button label="hello" onFocus={mockFn} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("focus");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onMouseDown function via props and triggers that function on MouseDown", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" onMouseDown={mockFn} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("mousedown");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onMouseEnter function via props and triggers that function on MouseEnter", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" onMouseEnter={mockFn} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("mouseenter");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onMouseLeave function via props and triggers that function on MouseLeave", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" onMouseLeave={mockFn} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("mouseleave");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onMouseUp function via props and triggers that function on MouseUp", () => {
    const wrapper = mountWithTheme(<Button label="hello" onMouseUp={mockFn} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("mouseup");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onTouchStart function via props and triggers that function on TouchStart", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" onTouchStart={mockFn} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("blur");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies an onTouchEnd function via props and triggers that function on TouchEnd", () => {
    const wrapper = mountWithTheme(<Button label="hello" onBlur={mockFn} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate("touchend");
    expect(mockFn).toHaveBeenCalled();
  });

  it("applies a style object via props", () => {
    const wrapper = mountWithTheme(
      <Button label="hello" style={{ width: "30px" }} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button__StyledBtn").props().style).toHaveProperty(
      "width",
      "30px"
    );
  });

  describe("button type", () => {
    it("matches snapshot when button type = `filled`", () => {
      const wrapper = mountWithTheme(<Button label="hello" type="filled" />);
      expect(wrapper).toMatchSnapshot();
    });

    it("matches snapshot when button type = `inverted`", () => {
      const wrapper = mountWithTheme(<Button label="hello" type="inverted" />);
      expect(wrapper).toMatchSnapshot();
    });

    it("matches snapshot when button type = `error`", () => {
      const wrapper = mountWithTheme(<Button label="hello" type="error" />);
      expect(wrapper).toMatchSnapshot();
    });

    it("matches snapshot when button type = `errorFilled`", () => {
      const wrapper = mountWithTheme(
        <Button label="hello" type="errorFilled" />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("matches snapshot when button type = `disabled`", () => {
      const wrapper = mountWithTheme(<Button label="hello" type="disabled" />);
      expect(wrapper).toMatchSnapshot();
    });

    it("matches snapshot when button type = `disabledFilled`", () => {
      const wrapper = mountWithTheme(
        <Button label="hello" type="disabledFilled" />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("matches snapshot when button type = `flat`", () => {
      const wrapper = mountWithTheme(<Button label="hello" type="flat" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
