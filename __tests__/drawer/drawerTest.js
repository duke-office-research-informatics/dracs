import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { theme, Drawer, Portal } from "../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("Drawer", () => {
  it("matches snapshot", () => {
    const wrapper = mountWithTheme(<Drawer active={true} delay={0} />);
    const portalInstance = wrapper.find(Portal).instance();
    const drawer = mountWithTheme(portalInstance.props.children[1]);
    setTimeout(() => {
      expect(drawer).toMatchSnapshot();
      wrapper.unmount();
      drawer.unmount();
    }, 500);
  });

  it("returns no a11y violations", async () => {
    const wrapper = mountWithTheme(<Drawer active={true} />);
    const portalInstance = wrapper.find(Portal).instance();
    const drawer = mountWithTheme(portalInstance.props.children[1]);
    setTimeout(async () => {
      const results = await axe(drawer.html());
      expect(results).toHaveNoViolations();
    }, 500);
  });

  it("sets a backgroundColor via props", () => {
    const wrapper = mountWithTheme(
      <Drawer active={true} backgroundColor={theme.colors.border} delay={0} />
    );
    const portalInstance = wrapper.find(Portal).instance();
    const drawer = mountWithTheme(portalInstance.props.children[1]);
    setTimeout(() => {
      expect(drawer).toMatchSnapshot();
      expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule(
        "background-color",
        theme.colors.border
      );
      wrapper.unmount();
      drawer.unmount();
    }, 500);
  });

  it("applies a style object to the drawer wrapper via props", () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        drawerStyle={{ border: `solid 1px ${theme.colors.border}` }}
        delay={0}
      />
    );
    const portalInstance = wrapper.find(Portal).instance();
    const drawer = mountWithTheme(portalInstance.props.children[1]);
    setTimeout(() => {
      expect(drawer).toMatchSnapshot();
      expect(drawer.find("drawer__DrawerEl").props().style).toHaveProperty(
        "border",
        `solid 1px ${theme.colors.border}`
      );
      wrapper.unmount();
      drawer.unmount();
    }, 500);
  });

  it("renders the drawer inside of a non-portal div when `insideTree` prop is true", () => {
    const wrapper = mountWithTheme(
      <Drawer active={true} delay={0} insideTree={true} />
    );
    expect(wrapper.find("drawer__DrawerEl")).toHaveStyleRule("display", "none");
    setTimeout(() => {
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("drawer__DrawerEl")).toBeDefined();
      expect(wrapper.find("drawer__DrawerEl")).not.toHaveStyleRule(
        "transform",
        "translateX(0)"
      );
      expect(wrapper.find("drawer__DrawerEl")).not.toHaveStyleRule(
        "position",
        "fixed"
      );
      expect(wrapper.find("drawer__DrawerEl")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper.unmount();
    }, 500);
  });

  it("returns no a11y violations when `insideTree` prop is set to true", async () => {
    const wrapper = mountWithTheme(
      <Drawer active={true} delay={0} insideTree={true} />
    );
    setTimeout(async () => {
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    }, 500);
  });

  it("mounts the drawer inside the `insideTreeWrapper` when passed via prop", () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        delay={0}
        insideTree={true}
        insideTreeWrapper={() => {
          return <div className="insideTreeWrapperClass" />;
        }}
      />
    );
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      expect(
        wrapper
          .find("div")
          .first()
          .hasClass("insideTreeWrapperClass")
      ).toBe(true);
      wrapper.unmount();
    }, 500);
  });

  it("returns no a11y violations when `insideTreeWrapper` is passed via props", async () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        delay={0}
        insideTree={true}
        insideTreeWrapper={() => {
          return <div className="insideTreeWrapperClass" />;
        }}
      />
    );
    setTimeout(async () => {
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    }, 500);
  });

  it("passes an escKeyDown function and calls it on esc keyDown", () => {
    const map = {};
    document.body.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        backgroundColor={theme.colors.border}
        delay={0}
        escKeyDown={mockFn}
      />
    );
    setTimeout(() => {
      const portalInstance = wrapper.find(Portal).instance();
      const drawer = mountWithTheme(portalInstance.props.children[1]);
      expect(drawer).toMatchSnapshot();
      map.keydown({ which: 27 });
      expect(mockFn).toHaveBeenCalled();
      wrapper.unmount();
      drawer.unmount();
    }, 500);
  });

  it("passes an onOverlayClick funtion to overlay via props", () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        backgroundColor={theme.colors.border}
        delay={0}
        insideTree={true}
        onOverlayClick={mockFn}
      />
    );
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      wrapper.find("overlay__OverlayWrap").simulate("click");
      expect(mockFn).toHaveBeenCalled();
      wrapper.unmount();
    }, 500);
  });

  it("passes textColor to drawer wrapper via props", () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        delay={0}
        insideTree={true}
        textColor={theme.colors.muted}
      />
    );
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("drawer__DrawerEl")).toHaveStyleRule(
        "color",
        theme.colors.muted
      );
    }, 500);
  });

  it("positions drawer to right when type=right and animates entry", () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        backgroundColor={theme.colors.border}
        delay={0}
        type="right"
      />
    );
    const portalInstance = wrapper.find(Portal).instance();
    const drawer = mountWithTheme(portalInstance.props.children[1]);

    setTimeout(() => {
      expect(drawer).toMatchSnapshot();
      expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule(
        "transform",
        "translateX(0)"
      );
      expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule(
        "transform-origin",
        "right"
      );
      expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule("right", "0");
      expect(drawer.find("drawer__DrawerEl")).not.toHaveStyleRule("left", "0");
      wrapper.unmount();
      drawer.unmount();
    }, 500);
  });

  it("positions drawer to left when type=left and animates entry", () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        backgroundColor={theme.colors.border}
        delay={0}
        type="left"
      />
    );
    const portalInstance = wrapper.find(Portal).instance();
    const drawer = mountWithTheme(portalInstance.props.children[1]);
    expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule(
      "transform",
      "translateX(calc(-1 * 100%))"
    );
    setTimeout(() => {
      expect(drawer).toMatchSnapshot();
      expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule("left", "0");
      expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule(
        "transform",
        "translateX(0)"
      );
      expect(drawer.find("drawer__DrawerEl")).toHaveStyleRule(
        "transform-origin",
        "left"
      );
      expect(drawer.find("drawer__DrawerEl")).not.toHaveStyleRule("right", "0");
      wrapper.unmount();
      drawer.unmount();
    }, 500);
  });

  it("does not render an overlay when `withOverlay` set to false", () => {
    const wrapper = mountWithTheme(
      <Drawer
        active={true}
        backgroundColor={theme.colors.border}
        delay={0}
        withOverlay={false}
      />
    );
    setTimeout(() => {
      const portalInstance = wrapper.find(Portal).instance();
      const drawer = mountWithTheme(portalInstance.props.children[1]);
      expect(drawer).toMatchSnapshot();
      expect(drawer.find("overlay__OverlayWrap").length).toBe(0);
      wrapper.unmount();
      drawer.unmount();
    }, 500);
  });
});
