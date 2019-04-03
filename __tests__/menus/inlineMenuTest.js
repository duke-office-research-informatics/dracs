import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { InlineMenu, H4, P, Portal } from "../../lib/dracs.es.js";
import { doesNotThrow } from "assert";
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
  it("mounts the menu when active prop is true", () => {
    const trigger = mountWithTheme(
      <InlineMenu active triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    expect(trigger).toMatchSnapshot();
    const portalInstance = trigger.find(Portal).instance();
    const menu = mountWithTheme(portalInstance.props.children);
    expect(menu).toMatchSnapshot();
    trigger.unmount();
    menu.unmount();
  });
  it("mounts the menu on trigger click", () => {
    const trigger = mountWithTheme(
      <InlineMenu triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    expect(trigger.find(Portal).length).toBe(0);
    trigger.find("inline_menu__TriggerWrap").simulate("click");
    expect(trigger.find(Portal).length).toBe(1);
    const portalInstance = trigger.find(Portal).instance();
    const menu = mountWithTheme(portalInstance.props.children);
    expect(menu).toMatchSnapshot();
  });
  it("applies the proper styles when animateMenu prop is true", () => {
    const trigger = mountWithTheme(
      <InlineMenu active triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    const portalInstance = trigger.find(Portal).instance();
    const menu = mountWithTheme(portalInstance.props.children);
    expect(menu.find("inline_menu__MenuWrap")).toHaveStyleRule(
      "transition",
      "all 0.3s linear"
    );
  });
  it("applies the proper styles when animateMenu prop is false", () => {
    const trigger = mountWithTheme(
      <InlineMenu
        active
        animateMenu={false}
        triggerChild={<H4>{triggerText}</H4>}
      >
        <P>{menuText}</P>
      </InlineMenu>
    );
    const portalInstance = trigger.find(Portal).instance();
    const menu = mountWithTheme(portalInstance.props.children);
    expect(menu.find("inline_menu__MenuWrap")).toHaveStyleRule(
      "transition",
      "transform-origin 1ms"
    );
  });
  it("mounts items passed as children in the proper dom node", () => {
    const trigger = mountWithTheme(
      <InlineMenu active triggerChild={<H4>{triggerText}</H4>}>
        <P>{menuText}</P>
      </InlineMenu>
    );
    const portalInstance = trigger.find(Portal).instance();
    const menu = mountWithTheme(portalInstance.props.children);
    expect(menu).toMatchSnapshot();
    expect(menu.find("inline_menu__MenuWrap").find(P).length).toBe(1);
    expect(
      menu
        .find("inline_menu__MenuWrap")
        .find(P)
        .text()
    ).toBe(menuText);
  });
  // it("attaches the proper event handlers to the dom when closeMenuOnOutsideClick prop is true", () => {
  //   const trigger = mountWithTheme(
  //     <InlineMenu active triggerChild={<H4>{triggerText}</H4>}>
  //       <P>{menuText}</P>
  //     </InlineMenu>
  //   );
  //   console.log(document);
  // });
});
