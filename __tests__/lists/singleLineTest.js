import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import {
  List,
  SingleLineListItem,
  theme,
  IconWarning,
} from "../../lib/dracs.es.js";

const title = "test title";
const onLeftIconClick = jest.fn();

describe("Single Line List Item", () => {
  it("matches snapshot w/o a11y violations", async () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem />
      </List>
    );
    expect(item).toMatchSnapshot();
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
  });
  it("sets a border when bottomBorder prop = true", () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem bottomBorder />
      </List>
    );
    expect(item).toMatchSnapshot();
    expect(item.find("single_line__ItemWrap")).toHaveStyleRule(
      "border-bottom",
      `solid 1px ${theme.colors.border}`
    );
  });
  it("passes a child to the correct dom node in the list item", () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem>
          <IconWarning />
        </SingleLineListItem>
      </List>
    );
    expect(item).toMatchSnapshot();
    expect(item.find(IconWarning)).toBeDefined();
    expect(item.find(IconWarning).length).toBe(1);
    expect(
      item.find("single_line__ItemRightContainer").find(IconWarning)
    ).toBeDefined();
  });
  it("sets the title on the correct dom node via the title prop", () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem title={title} />
      </List>
    );
    expect(item).toMatchSnapshot();
    expect(item.find("single_line__TitleWrap").text()).toBe(title);
  });
  it("sets the proper styles when clickable prop = true", async () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem title={title} clickable={true} />
      </List>
    );
    expect(item).toMatchSnapshot();
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
    expect(item.find("single_line__ItemWrap")).toHaveStyleRule(
      "cursor",
      "pointer"
    );
    //work on testing nested hovers
    // console.log(item.find("single_line__ItemWrap").instance());
    // expect(item.find("single_line__ItemWrap")).toHaveStyleRule(
    //   "color",
    //   theme.colors.actionHover,
    //   {
    //     modifier: ":hover .c4",
    //   }
    // );
    // expect(item.find("single_line__TitleWrap")).toHaveStyleRule(
    //   "color",
    //   theme.colors.actionHover,
    //   {
    //     modifier: ".c1:hover .c4",
    //   }
    // );
  });
  it("sets the proper styles when underlineTitleOnHover = true", () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem title={title} underlineTitleOnHover />
      </List>
    );
    expect(item).toMatchSnapshot();
    //need to find good way to test hovers on nested component declaration
  });
  it("sets a left icon in the proper dom node when passed as leftIcon prop", () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem title={title} leftIcon={<IconWarning />} />
      </List>
    );
    expect(item).toMatchSnapshot();
    expect(item.find(IconWarning)).toBeDefined();
    expect(item.find(IconWarning).length).toBe(1);
    expect(
      item.find("single_line__LeftItemWrap").find(IconWarning)
    ).toBeDefined();
  });
  it("sets a click handler on the left icon via onLeftIconClick prop", async () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem
          title={title}
          leftIcon={<IconWarning />}
          onLeftIconClick={onLeftIconClick}
        />
      </List>
    );
    expect(item).toMatchSnapshot();
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
    const leftIconWrapper = item.find("single_line__LeftItemWrap");
    expect(leftIconWrapper.props().tabIndex).toBe("0");
    leftIconWrapper.simulate("click");
    expect(onLeftIconClick).toHaveBeenCalled();
  });
  it("sets style on the proper dom node when style obj passed via wrapperStyle prop", () => {
    const item = mountWithTheme(
      <List>
        <SingleLineListItem wrapperStyle={{ margin: "8px" }} />
      </List>
    );
    expect(item).toMatchSnapshot();
    expect(item.find("single_line__ItemWrap").props().style).toHaveProperty(
      "margin",
      "8px"
    );
  });
});
