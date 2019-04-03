import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { AppHeader, theme, IconMenu, Avatar } from "../../lib/dracs.es.js";

const imgUrl =
  "https://image.freepik.com/free-vector/soft-background-with-a-cute-blue-watercolor-stain_1048-5169.jpg";
const clickHandler = jest.fn();

describe("AppHeader", () => {
  it("matches dom snapshot", () => {
    const wrapper = mountWithTheme(<AppHeader />);
    expect(wrapper).toMatchSnapshot();
  });
  it("returns no a11y violations", async () => {
    const wrapper = mountWithTheme(<AppHeader />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe("Without Props", () => {
    it("wrapper div exists", () => {
      const wrapper = mountWithTheme(<AppHeader />);
      expect(wrapper.find("header__HeaderWrap").length).toBe(1);
    });
    it("header node exists", () => {
      const wrapper = mountWithTheme(<AppHeader />);
      expect(wrapper.find("header__Header").length).toBe(1);
    });
    it("wrapper has correct styles", () => {
      const wrapper = mountWithTheme(<AppHeader />);
      const div = wrapper.find("header__HeaderWrap");
      expect(div).toHaveStyleRule("width", "100vw");
    });
    it("header node has correct styles", () => {
      const wrapper = mountWithTheme(<AppHeader />);
      const div = wrapper.find("header__Header");
      expect(div).toHaveStyleRule("height", "56px");
      expect(div).toHaveStyleRule("width", "100%");
      expect(div).toHaveStyleRule("background-color", theme.colors.action);
      expect(div).toHaveStyleRule("background-size", "cover");
      expect(div).toHaveStyleRule("background-clip", "border-box");
      expect(div).toHaveStyleRule("background-repeat", "no-repeat");
      expect(div).toHaveStyleRule("display", "flex");
      expect(div).toHaveStyleRule("justify-content", "flex-start");
      expect(div).toHaveStyleRule("align-items", "center");
      expect(div).toHaveStyleRule("padding", "0 16px");
      expect(div).toHaveStyleRule("z-index", `${theme.zIndex.lg}`);
    });
  });

  describe("`backgroundColor` prop", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(
        <AppHeader backgroundColor={theme.colors.muted} />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it("header node has correct style changes", () => {
      const wrapper = mountWithTheme(
        <AppHeader backgroundColor={theme.colors.muted} />
      );
      const div = wrapper.find("header__Header");
      expect(div).toHaveStyleRule("background-color", theme.colors.muted);
    });
  });

  describe("`backgroundImage` prop", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(<AppHeader backgroundImage={imgUrl} />);
      expect(wrapper).toMatchSnapshot();
    });
    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<AppHeader backgroundImage={imgUrl} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
    it("header node has correct style changes", () => {
      const wrapper = mountWithTheme(<AppHeader backgroundImage={imgUrl} />);
      const div = wrapper.find("header__Header");
      expect(div).toHaveStyleRule("background-image", `url(${imgUrl})`);
    });
  });

  describe("`childrenLeft` prop", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(<AppHeader childrenLeft={<Avatar />} />);
      expect(wrapper).toMatchSnapshot();
    });
    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<AppHeader childrenLeft={<Avatar />} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
    it("renders the child", () => {
      const wrapper = mountWithTheme(<AppHeader childrenLeft={<Avatar />} />);
      const av = wrapper.find(Avatar);
      expect(av.length).toBe(1);
    });
  });

  describe("`childrenRight` prop", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(<AppHeader childrenRight={<Avatar />} />);
      expect(wrapper).toMatchSnapshot();
    });
    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<AppHeader childrenRight={<Avatar />} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
    it("renders the child", () => {
      const wrapper = mountWithTheme(<AppHeader childrenRight={<Avatar />} />);
      const av = wrapper.find(Avatar);
      expect(av.length).toBe(1);
    });
  });

  describe("`fixed` prop set to true", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(<AppHeader fixed />);
      expect(wrapper).toMatchSnapshot();
    });
    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<AppHeader fixed />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
    it("header node, header wrapper, fixed underlay exist", () => {
      const wrapper = mountWithTheme(<AppHeader fixed />);
      expect(wrapper.find("header__Header").length).toBe(1);
      expect(wrapper.find("header__HeaderWrap").length).toBe(1);
      expect(wrapper.find("header__FixedUnderlay").length).toBe(1);
    });
    it("header node has correct style changes", () => {
      const wrapper = mountWithTheme(<AppHeader fixed />);
      const div = wrapper.find("header__Header");
      expect(div).toHaveStyleRule("position", "absolute");
      expect(div).toHaveStyleRule("top", "0");
    });
    it("fixed underlay has correct styles", () => {
      const wrapper = mountWithTheme(<AppHeader fixed />);
      const div = wrapper.find("header__FixedUnderlay");
      expect(div).toHaveStyleRule("height", "56px");
      expect(div).toHaveStyleRule("width", "100vw");
    });
  });

  describe("`mediaQuery` string passed via prop", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(
        <AppHeader mediaQuery="@media(max-width:768px){background-color:#fff}" />
      );
      expect(wrapper).toMatchSnapshot();
    });
    it("applies the mediaQuery to the outer wrapper", () => {
      const wrapper = mountWithTheme(
        <AppHeader mediaQuery="@media(max-width:768px){background-color:#fff}" />
      );
      const div = wrapper.find("header__HeaderWrap");
      expect(div).toHaveStyleRule("background-color", "#fff", {
        media: "(max-width:768px)",
      });
    });
  });

  describe("`raised` set to true", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(<AppHeader raised />);
      expect(wrapper).toMatchSnapshot();
    });
    it("applies the correct styles to the header", () => {
      const wrapper = mountWithTheme(<AppHeader raised />);
      const div = wrapper.find("header__Header");
      expect(div).toHaveStyleRule("box-shadow", "0 0 12px 0 rgba(0,0,0,0.40)");
    });
  });

  describe("`rightIcon` props", () => {
    describe("with click handler", () => {
      it("matches dom snapshot", () => {
        const wrapper = mountWithTheme(
          <AppHeader rightIcon={<IconMenu />} onRightIconClick={clickHandler} />
        );
        expect(wrapper).toMatchSnapshot();
      });
      it("returns no a11y violations", async () => {
        const wrapper = mountWithTheme(
          <AppHeader rightIcon={<IconMenu />} onRightIconClick={clickHandler} />
        );
        const results = await axe(wrapper.html());
        expect(results).toHaveNoViolations();
      });
      it("inserts the icon into the correct wrapper with correct styling", () => {
        const wrapper = mountWithTheme(
          <AppHeader rightIcon={<IconMenu />} onRightIconClick={clickHandler} />
        );
        const icon = wrapper.find(IconMenu);
        const iconWrap = wrapper.find("header__IconRightDiv");
        const iconButton = wrapper.find("header__IconRightButton");
        expect(icon.length).toBe(1);
        expect(iconWrap.length).toBe(0);
        expect(iconButton.length).toBe(1);
        expect(iconButton).toHaveStyleRule("margin-left", "auto");
      });
      it("calls the click handler on click", () => {
        const wrapper = mountWithTheme(
          <AppHeader rightIcon={<IconMenu />} onRightIconClick={clickHandler} />
        );
        const iconButton = wrapper.find("header__IconRightButton");
        iconButton.simulate("click");
        expect(clickHandler).toBeCalled();
      });
    });

    describe("without click handler", () => {
      it("matches dom snapshot", () => {
        const wrapper = mountWithTheme(<AppHeader rightIcon={<IconMenu />} />);
        expect(wrapper).toMatchSnapshot();
      });
      it("returns no a11y violations", async () => {
        const wrapper = mountWithTheme(<AppHeader rightIcon={<IconMenu />} />);
        const results = await axe(wrapper.html());
        expect(results).toHaveNoViolations();
      });
      it("inserts the icon into the correct wrapper with correct styling", () => {
        const wrapper = mountWithTheme(<AppHeader rightIcon={<IconMenu />} />);
        const icon = wrapper.find(IconMenu);
        const iconWrap = wrapper.find("header__IconRightDiv");
        const iconButton = wrapper.find("header__IconRightButton");
        expect(icon.length).toBe(1);
        expect(iconWrap.length).toBe(1);
        expect(iconButton.length).toBe(0);
        expect(iconWrap).toHaveStyleRule("margin-left", "auto");
      });
    });
  });

  describe("`leftIcon` props", () => {
    describe("with click handler", () => {
      it("matches dom snapshot", () => {
        const wrapper = mountWithTheme(
          <AppHeader leftIcon={<IconMenu />} onLeftIconClick={clickHandler} />
        );
        expect(wrapper).toMatchSnapshot();
      });
      it("returns no a11y violations", async () => {
        const wrapper = mountWithTheme(
          <AppHeader leftIcon={<IconMenu />} onLeftIconClick={clickHandler} />
        );
        const results = await axe(wrapper.html());
        expect(results).toHaveNoViolations();
      });
      it("inserts the icon into the correct wrapper", () => {
        const wrapper = mountWithTheme(
          <AppHeader leftIcon={<IconMenu />} onLeftIconClick={clickHandler} />
        );
        const icon = wrapper.find(IconMenu);
        const iconButton = wrapper.find("header__IconLeftButton");
        expect(icon.length).toBe(1);
        expect(iconButton.length).toBe(1);
      });
      it("calls the click handler on click", () => {
        const wrapper = mountWithTheme(
          <AppHeader leftIcon={<IconMenu />} onLeftIconClick={clickHandler} />
        );
        const iconButton = wrapper.find("header__IconLeftButton");
        iconButton.simulate("click");
        expect(clickHandler).toBeCalled();
      });
    });

    describe("without click handler", () => {
      it("matches dom snapshot", () => {
        const wrapper = mountWithTheme(<AppHeader leftIcon={<IconMenu />} />);
        expect(wrapper).toMatchSnapshot();
      });
      it("returns no a11y violations", async () => {
        const wrapper = mountWithTheme(<AppHeader leftIcon={<IconMenu />} />);
        const results = await axe(wrapper.html());
        expect(results).toHaveNoViolations();
      });
      it("inserts the icon without a wrapper", () => {
        const wrapper = mountWithTheme(<AppHeader leftIcon={<IconMenu />} />);
        const icon = wrapper.find(IconMenu);
        const iconButton = wrapper.find("header__IconLeftButton");
        expect(icon.length).toBe(1);
        expect(iconButton.length).toBe(0);
      });
    });
  });

  describe("`width` set via prop", () => {
    it("matches dom snapshot", () => {
      const wrapper = mountWithTheme(<AppHeader width="200px" />);
      expect(wrapper).toMatchSnapshot();
    });
    it("applies the correct width to the correct dom node", () => {
      const wrapper = mountWithTheme(<AppHeader width="200px" />);
      const div = wrapper.find("header__Header");
      expect(div).toHaveStyleRule("width", "200px");
    });
  });
});
