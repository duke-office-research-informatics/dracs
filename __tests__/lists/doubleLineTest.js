import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import {
  List,
  DoubleLineListItem,
  theme,
  IconWarning,
} from "../../lib/dracs.es.js";

const title = "test title";
const subtitle = "test subtitle";
const onLeftIconClick = jest.fn();
const onClick = jest.fn();
const style = { margin: "8px" };

describe("Double Line List Item", () => {
  it("matches snapshot w/o a11y violations", async () => {
    const list = mountWithTheme(
      <List>
        <DoubleLineListItem lineOne={title} lineTwo={subtitle} />
      </List>
    );
    expect(list).toMatchSnapshot();
    const results = await axe(list.html());
    expect(results).toHaveNoViolations();
  });
  it("sets a border when bottomBorder prop = true", () => {
    const item = mountWithTheme(
      <DoubleLineListItem bottomBorder lineOne={title} lineTwo={subtitle} />
    );
    expect(item).toMatchSnapshot();
    expect(item.find("double_line__ItemWrap")).toHaveStyleRule(
      "border-bottom",
      `solid 1px ${theme.colors.border}`
    );
  });
  it("passes a child to the correct dom node in the list item", () => {
    const item = mountWithTheme(
      <DoubleLineListItem bottomBorder lineOne={title} lineTwo={subtitle}>
        <IconWarning />
      </DoubleLineListItem>
    );
    expect(item).toMatchSnapshot();
    expect(item.find(IconWarning)).toBeDefined();
    expect(item.find(IconWarning).length).toBe(1);
    expect(
      item.find("double_line__ItemRightContainer").find(IconWarning)
    ).toBeDefined();
  });
  it("sets an onClick fn on correct dom node when passed via onClick prop", () => {
    const item = mountWithTheme(
      <DoubleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        onClick={onClick}
      />
    );
    expect(item).toMatchSnapshot();
    const itemWrap = item.find("double_line__ItemWrap");
    itemWrap.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
  it("sets the proper styles when clickable prop = true", async () => {
    const item = mountWithTheme(
      <List>
        <DoubleLineListItem
          lineOne={title}
          lineTwo={subtitle}
          clickable
          onClick={onClick}
        />
      </List>
    );
    expect(item).toMatchSnapshot();
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
    expect(item.find("double_line__ItemWrap")).toHaveStyleRule(
      "cursor",
      "pointer"
    );
    expect(item.find("double_line__ItemWrap").props().tabIndex).toBe("0");
  });
  it("sets content for line one on the correct dom node via the lineOne prop", () => {
    const item = mountWithTheme(
      <DoubleLineListItem lineOne={title} lineTwo={subtitle} />
    );
    expect(item).toMatchSnapshot();
    expect(item.find("double_line__LineOne").length).toBe(1);
    expect(item.find("double_line__LineOne").text()).toBe(title);
  });
  it("sets content for line two on the correct dom node via the lineTwo prop", () => {
    const item = mountWithTheme(
      <DoubleLineListItem lineOne={title} lineTwo={subtitle} />
    );
    expect(item).toMatchSnapshot();
    expect(item.find("double_line__LineTwo").length).toBe(1);
    expect(item.find("double_line__LineTwo").text()).toBe(subtitle);
  });

  it("sets a left icon in the proper dom node when passed as leftIcon prop", () => {
    const item = mountWithTheme(
      <DoubleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        leftIcon={<IconWarning />}
      />
    );
    expect(item).toMatchSnapshot();
    expect(item.find(IconWarning)).toBeDefined();
    expect(item.find(IconWarning).length).toBe(1);
    expect(
      item.find("double_line__LeftItemWrap").find(IconWarning)
    ).toBeDefined();
  });
  it("sets a click handler on the left icon via onLeftIconClick prop", async () => {
    const item = mountWithTheme(
      <List>
        <DoubleLineListItem
          lineOne={title}
          lineTwo={subtitle}
          leftIcon={<IconWarning />}
          onLeftIconClick={onLeftIconClick}
        />
      </List>
    );
    expect(item).toMatchSnapshot();
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
    const leftIconWrapper = item.find("double_line__LeftItemWrap");
    expect(leftIconWrapper.props().tabIndex).toBe("0");
    leftIconWrapper.simulate("click");
    expect(onLeftIconClick).toHaveBeenCalled();
  });
  it("sets the proper styles when dense prop is true", () => {
    const item = mountWithTheme(
      <DoubleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        dense
        leftIcon={<IconWarning />}
      />
    );
    expect(item).toMatchSnapshot();
    expect(item.find("double_line__ItemWrap")).toHaveStyleRule(
      "padding",
      "4px 8px"
    );
    expect(item.find("double_line__LeftItemWrap")).toHaveStyleRule(
      "padding",
      "0 8px 0 0"
    );
  });
  it("sets style on proper dom node when style obj is passed to lineOneStyle prop", () => {
    const item = mountWithTheme(
      <DoubleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineOneStyle={style}
      />
    );
    expect(item.find("double_line__LineOne").length).toBe(1);
    expect(item.find("double_line__LineOne").props().style).toHaveProperty(
      "margin",
      "8px"
    );
  });
  it("sets style on proper dom node when style obj is passed to lineTwoStyle prop", () => {
    const item = mountWithTheme(
      <DoubleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineTwoStyle={style}
      />
    );
    expect(item.find("double_line__LineTwo").length).toBe(1);
    expect(item.find("double_line__LineTwo").props().style).toHaveProperty(
      "margin",
      "8px"
    );
  });
});
