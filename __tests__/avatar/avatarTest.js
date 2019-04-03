import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { theme, Avatar, IconProfile } from "../../lib/dracs.es.js";

const imgUrl =
  "https://image.freepik.com/free-vector/soft-background-with-a-cute-blue-watercolor-stain_1048-5169.jpg";
const dispLetter = "a";

describe("Avatar", () => {
  it("matches snapshot", () => {
    const wrapper = mountWithTheme(<Avatar />);
    expect(wrapper).toMatchSnapshot();
  });
  it("returns no a11y violations", async () => {
    const wrapper = mountWithTheme(<Avatar />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe("without props", () => {
    it("has a wrapper and the fallback profile icon", () => {
      const wrapper = mountWithTheme(<Avatar />);
      expect(wrapper.find("avatar__AvatarWrap").length).toBe(1);
      expect(wrapper.find(IconProfile).length).toBe(1);
    });
    it("wrapper node has correct styles", () => {
      const wrapper = mountWithTheme(<Avatar />);
      const div = wrapper.find("avatar__AvatarWrap");
      expect(div).toHaveStyleRule("display", "flex");
      expect(div).toHaveStyleRule("align-items", "center");
      expect(div).toHaveStyleRule("justify-content", "center");
      expect(div).toHaveStyleRule("width", "32px");
      expect(div).toHaveStyleRule("height", "32px");
      expect(div).toHaveStyleRule("min-width", "32px");
      expect(div).toHaveStyleRule("min-height", "32px");
      expect(div).toHaveStyleRule("background-repeat", "no-repeat");
      expect(div).toHaveStyleRule("background-size", "cover");
      expect(div).toHaveStyleRule("background-color", "transparent");
      expect(div).toHaveStyleRule("border-radius", "50%");
      expect(div).toHaveStyleRule("color", "transparent");
      expect(div).toHaveStyleRule("font-size", "0");
      expect(div).toHaveStyleRule("overflow", "hidden");
    });
    it("profile icon has correct styling", () => {
      const wrapper = mountWithTheme(<Avatar />);
      const svg = wrapper.find(IconProfile);
      expect(svg).toHaveStyleRule("fill", "#fff");
      expect(svg).toHaveStyleRule("vertical-align", "top");
    });
  });

  describe("`bgColor` prop", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(<Avatar bgColor={theme.colors.muted} />);
      expect(wrapper).toMatchSnapshot();
    });
    it("applies the correct styling", () => {
      const wrapper = mountWithTheme(<Avatar bgColor={theme.colors.muted} />);
      const div = wrapper.find("avatar__AvatarWrap");
      expect(div).toHaveStyleRule("background-color", theme.colors.muted);
    });
  });

  describe("`displayLetter` prop", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(<Avatar displayLetter={dispLetter} />);
      expect(wrapper).toMatchSnapshot();
    });
    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<Avatar displayLetter={dispLetter} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
    it("applies the proper styles to the wrapper", () => {
      const wrapper = mountWithTheme(<Avatar displayLetter={dispLetter} />);
      const div = wrapper.find("avatar__AvatarWrap");
      expect(div).toHaveStyleRule("text-align", "center");
    });
    it("inserts the letter into the dom instead of the profile icon", () => {
      const wrapper = mountWithTheme(<Avatar displayLetter={dispLetter} />);
      const letter = wrapper.find("avatar__AvatarLetter");
      const icon = wrapper.find(IconProfile);
      expect(icon.length).toBe(0);
      expect(letter.length).toBe(1);
      expect(letter.text()).toBe(dispLetter);
    });
    it("applies correct styling to the letter", () => {
      const wrapper = mountWithTheme(<Avatar displayLetter={dispLetter} />);
      const letter = wrapper.find("avatar__AvatarLetter");
      expect(letter).toHaveStyleRule("position", "relative");
      expect(letter).toHaveStyleRule("top", `${(32 / 3.65).toFixed(3)}px`);
      expect(letter).toHaveStyleRule("color", "#fff");
      expect(letter).toHaveStyleRule("vertical-align", "top");
      expect(letter).toHaveStyleRule("font-size", `${32 / 1.5}px`);
      expect(letter).toHaveStyleRule("line-height", "0.8");
      expect(letter).toHaveStyleRule("text-transform", "uppercase");
    });
  });

  describe("`iconColor`", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(
        <Avatar displayLetter={dispLetter} iconColor={theme.colors.action} />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it("updates the default profile icon color", () => {
      const wrapper = mountWithTheme(
        <Avatar iconColor={theme.colors.action} />
      );
      const svg = wrapper.find(IconProfile);
      expect(svg).toHaveStyleRule("fill", theme.colors.action);
    });
    it("updates letter color style", () => {
      const wrapper = mountWithTheme(
        <Avatar displayLetter={dispLetter} iconColor={theme.colors.action} />
      );
      const letter = wrapper.find("avatar__AvatarLetter");
      expect(letter).toHaveStyleRule("color", theme.colors.action);
    });
  });

  describe("`iconHoverColor`", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(
        <Avatar iconHoverColor={theme.colors.action} />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it("updates the profile icon svg hover style", () => {
      const wrapper = mountWithTheme(
        <Avatar iconHoverColor={theme.colors.action} />
      );
      const svg = wrapper.find(IconProfile);
      expect(svg).toHaveStyleRule("fill", theme.colors.action, {
        modifier: ":hover",
      });
    });
  });

  describe("`imgUrl`", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(<Avatar imgUrl={imgUrl} />);
      expect(wrapper).toMatchSnapshot();
    });
    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<Avatar imgUrl={imgUrl} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
    it("does not display the profile icon or the letter", () => {
      const wrapper = mountWithTheme(<Avatar imgUrl={imgUrl} />);
      expect(wrapper.find(IconProfile).length).toBe(0);
      expect(wrapper.find("avatar__AvatarLetter").length).toBe(0);
    });
    it("applies the img and correct styles to the wrapper div", () => {
      const wrapper = mountWithTheme(<Avatar imgUrl={imgUrl} />);
      const div = wrapper.find("avatar__AvatarWrap");
      expect(div).toHaveStyleRule("display", "flex");
      expect(div).toHaveStyleRule("align-items", "center");
      expect(div).toHaveStyleRule("justify-content", "center");
      expect(div).toHaveStyleRule("background-image", `url(${imgUrl})`);
    });
  });

  describe("`size` (larger than 32)", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(
        <Avatar displayLetter={dispLetter} size={40} />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it("applies the correct styling to the letter and wrapper", () => {
      const wrapper = mountWithTheme(
        <Avatar displayLetter={dispLetter} size={40} />
      );
      const div = wrapper.find("avatar__AvatarWrap");
      const letter = wrapper.find("avatar__AvatarLetter");
      expect(div).toHaveStyleRule("width", "40px");
      expect(div).toHaveStyleRule("height", "40px");
      expect(div).toHaveStyleRule("min-width", "40px");
      expect(div).toHaveStyleRule("min-height", "40px");
      expect(letter).toHaveStyleRule("top", `${(40 / 4).toFixed(3)}px`);
      expect(letter).toHaveStyleRule("font-size", `${40 / 1.5}px`);
    });
  });
});
