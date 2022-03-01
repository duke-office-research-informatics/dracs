import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { InlineMenu, H4, P, Portal } from "../../lib/dracs.es.js";

const triggerText = "Test trigger";
const menuText = "Test menu";
describe("Inline Menu", () => {
  it("matches snapshot and returns no a11y violations", async () => {
    const menu = mountWithTheme(
      <InlineMenu triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    expect(menu).toMatchSnapshot();
    const results = await axe(menu.html());
    expect(results).toHaveNoViolations();
  });
  it("does not mount the menu on initial component mount", () => {
    const trigger = mountWithTheme(
      <InlineMenu triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    expect(trigger).toMatchSnapshot();
    expect(trigger.find(Portal).length).toBe(0);
  });
  it("mounts the menu when active prop is true", done => {
    const trigger = mountWithTheme(
      <InlineMenu active={true} triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    const menu = trigger.find(Portal);
    expect(trigger).toMatchSnapshot();
    expect(menu).toMatchSnapshot();
    setTimeout(() => {
      trigger.update();
      expect(trigger).toMatchSnapshot();
      expect(menu).toMatchSnapshot();
      done();
      trigger.unmount();
    }, 400);
  });
  it("mounts the menu on trigger click", done => {
    const trigger = mountWithTheme(
      <InlineMenu triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    expect(trigger.find(Portal).length).toBe(0);
    trigger.find("inline_menu__TriggerWrap").simulate("click");
    trigger.update();
    setTimeout(() => {
      trigger.update();
      const menu = trigger.find(Portal);
      expect(menu.length).toBe(1);
      expect(trigger).toMatchSnapshot();
      expect(menu).toMatchSnapshot();
      done();
      trigger.unmount();
    }, 400);
  });
  it("applies the proper styles when animateMenu prop is true", done => {
    const trigger = mountWithTheme(
      <InlineMenu active triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    setTimeout(() => {
      const menu = trigger.find(Portal);
      expect(menu.find("inline_menu__MenuWrap")).toHaveStyleRule(
        "transition",
        "all 0.3s linear"
      );
      done();
      trigger.unmount();
    }, 400);
  });
  it("applies the proper styles when animateMenu prop is false", done => {
    const trigger = mountWithTheme(
      <InlineMenu
        active
        animateMenu={false}
        triggerChild={<H4>{triggerText}</H4>}
      >
        <P>{menuText}</P>
      </InlineMenu>
    );
    setTimeout(() => {
      const menu = trigger.find(Portal);
      expect(menu.find("inline_menu__MenuWrap")).toHaveStyleRule(
        "transition",
        "transform-origin 1ms"
      );
      done();
      trigger.unmount();
    }, 400);
  });
  it("mounts items passed as children in the proper dom node", done => {
    const trigger = mountWithTheme(
      <InlineMenu active triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    setTimeout(() => {
      trigger.update();
      const menu = trigger.find(Portal);
      expect(menu).toMatchSnapshot();
      expect(menu.find("inline_menu__MenuWrap").find(P).length).toBe(1);
      expect(
        menu
          .find("inline_menu__MenuWrap")
          .find(P)
          .text()
      ).toBe(menuText);
      done();
      trigger.unmount();
    }, 400);
  });
});
