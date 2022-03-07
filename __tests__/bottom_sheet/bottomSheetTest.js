import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { theme, BottomSheet, IconMenu } from "../../lib/dracs.es.js";

const clickFn = jest.fn();

describe("BottomSheet", () => {
  describe("`active` false", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(<BottomSheet />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("`active` true", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(<BottomSheet active={true} />);
      expect(wrapper).toMatchSnapshot();
    });
    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<BottomSheet active={true} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
    it("renders an overlay and a body", () => {
      const wrapper = mountWithTheme(<BottomSheet active={true} />);
      expect(wrapper.find("bottom_sheet__SheetOverlay").length).toBe(1);
      expect(wrapper.find("bottom_sheet__SheetBody").length).toBe(1);
    });
    it("applies the correct styles to the sheet overlay", () => {
      const wrapper = mountWithTheme(<BottomSheet active={true} />);
      wrapper.setState({ visible: true });
      const div = wrapper.find("bottom_sheet__SheetOverlay");
      expect(div).toHaveStyleRule("position", "absolute");
      expect(div).toHaveStyleRule("top", "0");
      expect(div).toHaveStyleRule("left", "0");
      expect(div).toHaveStyleRule("bottom", "0");
      expect(div).toHaveStyleRule("right", "0");
      expect(div).toHaveStyleRule("background-color", "rgba(0,0,0,0.1)");
      expect(div).toHaveStyleRule("z-index", `${theme.zIndex.xl}`);
      expect(div).toHaveStyleRule("overflow-y", "hidden");
    });
    it("applies the correct styles to the sheet body", () => {
      const wrapper = mountWithTheme(<BottomSheet active={true} />);
      wrapper.setState({ visible: true });
      const div = wrapper.find("bottom_sheet__SheetBody");
      expect(div).toHaveStyleRule("position", "absolute");
      expect(div).toHaveStyleRule("bottom", "0");
      expect(div).toHaveStyleRule("box-sizing", "border-box");
      expect(div).toHaveStyleRule("background-color", "#fff");
      expect(div).toHaveStyleRule(
        "border-radius",
        `${theme.sizing.borderRadius}px ${theme.sizing.borderRadius}px 0 0`
      );
      expect(div).toHaveStyleRule("min-height", "36px");
      expect(div).toHaveStyleRule("transform", "translate3d(0,0,0)");
      expect(div).toHaveStyleRule(
        "transition",
        "all 300ms cubic-bezier(0.4,0,0.2,1)"
      );
      expect(div).toHaveStyleRule("overflow", "hidden");
    });

    describe("`bgColor` prop", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} bgColor={theme.colors.action} />
        );
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("applies a bg color to the sheet body", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} bgColor={theme.colors.action} />
        );
        wrapper.setState({ visible: true });
        const div = wrapper.find("bottom_sheet__SheetBody");
        expect(div).toHaveStyleRule("background-color", theme.colors.action);
      });
    });

    describe("`bodyStyle`", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} bodyStyle={{ maxHeight: "100px" }} />
        );
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("applies the style object to the sheet body", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} bodyStyle={{ maxHeight: "100px" }} />
        );
        wrapper.setState({ visible: true });
        const div = wrapper.find("bottom_sheet__SheetBody");
        expect(div.props().style).toHaveProperty("maxHeight", "100px");
      });
    });

    describe("`children`", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true}>
            <IconMenu />
          </BottomSheet>
        );
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("renders the child in the sheet body", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true}>
            <IconMenu />
          </BottomSheet>
        );
        wrapper.setState({ visible: true });
        const child = wrapper.find("bottom_sheet__SheetBody").find(IconMenu);
        expect(child.length).toBe(1);
      });
    });

    describe("`delay`", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(<BottomSheet active={true} delay={0} />);
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("applies the delay to the body transition", () => {
        const wrapper = mountWithTheme(<BottomSheet active={true} delay={0} />);
        wrapper.setState({ visible: true });
        const div = wrapper.find("bottom_sheet__SheetBody");
        expect(div).toHaveStyleRule(
          "transition",
          "all 0ms cubic-bezier(0.4,0,0.2,1)"
        );
      });
    });

    describe("`height`", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} height="10em" />
        );
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("applies height to the sheet body", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} height="10em" />
        );
        wrapper.setState({ visible: true });
        const div = wrapper.find("bottom_sheet__SheetBody");
        expect(div).toHaveStyleRule("height", "10em");
      });
    });

    describe("`onOverlayClick`", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} onOverlayClick={clickFn} />
        );
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("executes click handler", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} onOverlayClick={clickFn} />
        );
        wrapper.setState({ visible: true });
        wrapper.find("bottom_sheet__SheetOverlay").simulate("click");
        expect(clickFn).toBeCalled();
      });
      // it('does not trigger click handler on cick of body', () => {
      //   const wrapper = mountWithTheme(<BottomSheet active={true} onOverlayClick={clickFn}/>);
      //   wrapper.setState({visible: true});
      //   wrapper.find('bottom_sheet__SheetBody').simulate('click');
      //   expect(clickFn).not.toBeCalled();
      // })
    });

    describe("`overlayStyle`", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(
          <BottomSheet
            active={true}
            overlayStyle={{ border: `solid 1px ${theme.colors.border}` }}
          />
        );
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("applies the style object to the sheet overlay", () => {
        const wrapper = mountWithTheme(
          <BottomSheet
            active={true}
            overlayStyle={{ border: `solid 1px ${theme.colors.border}` }}
          />
        );
        wrapper.setState({ visible: true });
        const div = wrapper.find("bottom_sheet__SheetOverlay");
        expect(div.props().style).toHaveProperty(
          "border",
          `solid 1px ${theme.colors.border}`
        );
      });
    });

    describe("`textColor`", () => {
      it("matches snapshot", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} textColor="#fff" />
        );
        wrapper.setState({ visible: true });
        expect(wrapper).toMatchSnapshot();
      });
      it("applies the text color to the sheet body", () => {
        const wrapper = mountWithTheme(
          <BottomSheet active={true} textColor="#fff" />
        );
        wrapper.setState({ visible: true });
        const div = wrapper.find("bottom_sheet__SheetBody");
        expect(div).toHaveStyleRule("color", "#fff");
      });
    });
  });
});
