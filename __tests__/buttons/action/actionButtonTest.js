import React from "react";
import { mountWithTheme } from "../../../config/scUtils.js";
import { axe } from "../../../config/axe-helper.js";
import { ActionButton, IconMenu } from "../../../lib/dracs.es.js";

const clickFn = jest.fn();

describe("ActionButton", () => {
  it("matches snapshot", () => {
    const wrapper = mountWithTheme(
      <ActionButton>
        <IconMenu />
      </ActionButton>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("returns no a11y violations", async () => {
    const wrapper = mountWithTheme(
      <ActionButton>
        <IconMenu />
      </ActionButton>
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("has the correct styles", () => {
    const wrapper = mountWithTheme(
      <ActionButton>
        <IconMenu />
      </ActionButton>
    );
    const btn = wrapper.find("action__ActionBtn");
    expect(btn).toHaveStyleRule("cursor", "pointer");
    expect(btn).toHaveStyleRule("align-items", "center");
    expect(btn).toHaveStyleRule("margin", "4px");
    expect(btn).toHaveStyleRule("transition", "all 0.2s ease-in-out");
    expect(btn).toHaveStyleRule("opacity", "0.4");
    expect(btn).toHaveStyleRule("opacity", "1", { modifier: ":hover" });
    expect(btn).toHaveStyleRule("opacity", "1", { modifier: ":focus" });
    expect(btn).toHaveStyleRule("outline-offset", "2px", {
      modifier: ":focus",
    });
    expect(btn).toHaveStyleRule("outline", "dotted 1px rgb(59,153,252)", {
      modifier: ":focus",
    });
  });

  it("attaches a className via props", () => {
    const wrapper = mountWithTheme(
      <ActionButton className="aClass">
        <IconMenu />
      </ActionButton>
    );
    expect(wrapper.find("action__ActionBtn").hasClass("aClass")).toBe(true);
  });

  it("disables itself via props", () => {
    const wrapper = mountWithTheme(
      <ActionButton disabled={true}>
        <IconMenu />
      </ActionButton>
    );
    expect(wrapper.getDOMNode().attributes.getNamedItem("disabled").value).toBe(
      ""
    );
    const btn = wrapper.find("action__ActionBtn");
    expect(btn).toHaveStyleRule("cursor", "not-allowed");
    expect(btn).not.toHaveStyleRule("opacity", "1", { modifier: ":hover" });
  });

  it("attaches a media query via props", () => {
    const wrapper = mountWithTheme(
      <ActionButton mediaQuery="@media(max-width:768px){width:36px}">
        <IconMenu />
      </ActionButton>
    );
    const btn = wrapper.find("action__ActionBtn");
    expect(btn).toHaveStyleRule("width", "36px", {
      media: "(max-width:768px)",
    });
  });

  it("attaches an onBlur function and calls that function on blur", () => {
    const wrapper = mountWithTheme(
      <ActionButton onBlur={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("blur");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onClick function and calls that function on click", () => {
    const wrapper = mountWithTheme(
      <ActionButton onClick={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("click");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onFocus function and calls that function on focus", () => {
    const wrapper = mountWithTheme(
      <ActionButton onFocus={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("focus");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onMouseDown function and calls that function on mouseDown", () => {
    const wrapper = mountWithTheme(
      <ActionButton onMouseDown={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("mousedown");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onMouseEnter function and calls that function on mouseEnter", () => {
    const wrapper = mountWithTheme(
      <ActionButton onMouseEnter={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("mouseenter");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onMouseLeave function and calls that function on mouseleave", () => {
    const wrapper = mountWithTheme(
      <ActionButton onMouseLeave={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("mouseleave");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onMouseUp function and calls that function on mouseup", () => {
    const wrapper = mountWithTheme(
      <ActionButton onMouseUp={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("mouseup");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onTouchStart function and calls that function on touchstart", () => {
    const wrapper = mountWithTheme(
      <ActionButton onTouchStart={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("touchstart");
    expect(clickFn).toBeCalled();
  });

  it("attaches an onTouchEnd function and calls that function on touchend", () => {
    const wrapper = mountWithTheme(
      <ActionButton onTouchEnd={clickFn}>
        <IconMenu />
      </ActionButton>
    );
    wrapper.simulate("touchend");
    expect(clickFn).toBeCalled();
  });

  it("passes inline styles via prop", () => {
    const wrapper = mountWithTheme(
      <ActionButton style={{ width: "36px" }}>
        <IconMenu />
      </ActionButton>
    );
    expect(wrapper.find("action__ActionBtn").props().style).toHaveProperty(
      "width",
      "36px"
    );
  });
});
