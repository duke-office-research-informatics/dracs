import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import {
  List,
  TripleLineListItem,
  theme,
  IconWarning,
} from "../../lib/dracs.es.js";

const title = "test title";
const subtitle = "test subtitle";
const thirdLine = "test third line";
const onLeftIconClick = jest.fn();
const onClick = jest.fn();
const style = { margin: "8px" };

describe("Triple Line List Item", () => {
  it("matches snapshot w/o a11y violations", async () => {
    const item = mountWithTheme(
      <List>
        <TripleLineListItem
          lineOne={title}
          lineTwo={subtitle}
          lineThree={thirdLine}
        />
      </List>
    );
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
    expect(item).toMatchSnapshot();
  });
  it("sets a border when bottomBorder prop = true", () => {
    const item = mountWithTheme(
      <List>
        <TripleLineListItem
          bottomBorder
          lineOne={title}
          lineTwo={subtitle}
          lineThree={thirdLine}
        />
      </List>
    );
    expect(item).toMatchSnapshot();
    expect(item.find("triple_line__ItemWrap")).toHaveStyleRule(
      "border-bottom",
      `solid 1px ${theme.colors.border}`
    );
  });
  it("passes a child to the correct dom node in the list item", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        bottomBorder
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
      >
        <IconWarning />
      </TripleLineListItem>
    );
    expect(item).toMatchSnapshot();
    expect(item.find(IconWarning)).toBeDefined();
    expect(item.find(IconWarning).length).toBe(1);
    expect(
      item.find("triple_line__ItemRightContainer").find(IconWarning)
    ).toBeDefined();
  });
  it("sets an onClick fn on correct dom node when passed via onClick prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
        onClick={onClick}
      />
    );
    expect(item).toMatchSnapshot();
    item.find("triple_line__ItemWrap").simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
  it("sets proper styles when clickable prop = true", async () => {
    const item = mountWithTheme(
      <List>
        <TripleLineListItem
          clickable
          lineOne={title}
          lineTwo={subtitle}
          lineThree={thirdLine}
          onClick={onClick}
        />
      </List>
    );
    expect(item).toMatchSnapshot();
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
    expect(item.find("triple_line__ItemWrap")).toHaveStyleRule(
      "cursor",
      "pointer"
    );
    expect(item.find("triple_line__ItemWrap").props().tabIndex).toBe("0");
  });
  it("sets content for first line on correct dom node via lineOne prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
      />
    );
    expect(item).toMatchSnapshot();
    expect(item.find("triple_line__LineOne").length).toBe(1);
    expect(item.find("triple_line__LineOne").text()).toBe(title);
  });
  it("sets content for second line on correct dom node via lineTwo prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
      />
    );
    expect(item).toMatchSnapshot();
    expect(item.find("triple_line__LineTwo").length).toBe(1);
    expect(item.find("triple_line__LineTwo").text()).toBe(subtitle);
  });
  it("sets content for third line on correct dom node via lineThree prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
      />
    );
    expect(item).toMatchSnapshot();
    expect(item.find("triple_line__LineThree").length).toBe(1);
    expect(item.find("triple_line__LineThree").text()).toBe(thirdLine);
  });
  it("sets a left icon in the proper dom node when passed as leftIcon prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        leftIcon={<IconWarning />}
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
      />
    );
    expect(item).toMatchSnapshot();
    expect(item.find(IconWarning)).toBeDefined();
    expect(item.find(IconWarning).length).toBe(1);
    expect(
      item.find("triple_line__LeftItemWrap").find(IconWarning)
    ).toBeDefined();
  });
  it("sets a click handler on the left icon via onLeftIconClick prop", async () => {
    const item = mountWithTheme(
      <List>
        <TripleLineListItem
          leftIcon={<IconWarning />}
          lineOne={title}
          lineTwo={subtitle}
          lineThree={thirdLine}
          onLeftIconClick={onLeftIconClick}
        />
      </List>
    );
    expect(item).toMatchSnapshot();
    const results = await axe(item.html());
    expect(results).toHaveNoViolations();
    const leftIconWrapper = item.find("triple_line__LeftItemWrap");
    expect(leftIconWrapper.props().tabIndex).toBe("0");
    leftIconWrapper.simulate("click");
    expect(onLeftIconClick).toHaveBeenCalled();
  });
  it("sets proper styles when dense prop is true", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        dense
        leftIcon={<IconWarning />}
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
      />
    );
    expect(item.find("triple_line__ItemWrap")).toHaveStyleRule(
      "padding",
      "4px 8px"
    );
    expect(item.find("triple_line__LeftItemWrap")).toHaveStyleRule(
      "padding",
      "0 8px 0 0"
    );
  });
  it("sets style on proper dom node when style obj passed to lineOneStyle prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
        lineOneStyle={style}
      />
    );
    expect(item.find("triple_line__LineOne").length).toBe(1);
    expect(item.find("triple_line__LineOne").props().style).toHaveProperty(
      "margin",
      "8px"
    );
  });
  it("sets style on proper dom node when style obj passed to lineTwoStyle prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
        lineTwoStyle={style}
      />
    );
    expect(item.find("triple_line__LineTwo").length).toBe(1);
    expect(item.find("triple_line__LineTwo").props().style).toHaveProperty(
      "margin",
      "8px"
    );
  });
  it("sets style on proper dom node when style obj passed to lineThreeStyle prop", () => {
    const item = mountWithTheme(
      <TripleLineListItem
        lineOne={title}
        lineTwo={subtitle}
        lineThree={thirdLine}
        lineThreeStyle={style}
      />
    );
    expect(item.find("triple_line__LineThree").length).toBe(1);
    expect(item.find("triple_line__LineThree").props().style).toHaveProperty(
      "margin",
      "8px"
    );
  });
});
