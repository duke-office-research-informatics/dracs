import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import styled from "styled-components";
import {
  Dropdown,
  theme,
  H4,
  H5,
  Input,
  IconMenu,
  IconDropdownArrow,
} from "../../lib/dracs.es.js";

const TemplateWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: calc(100% - 16px);
  min-width: 400px;
  padding: 8px;
`;

const ItemWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 32px);
  min-width: 100px;
  padding: 8px 16px;
  border-bottom: solid 1px ${p => p.theme.colors.border};
`;

const startArray = [
  {
    abbreviation: "dsh",
    longName: "Domestic Shorthair",
    description:
      "A domestic short-haired cat is a cat of mixed ancestry – thus not belonging to any particular recognized cat breed – possessing a coat of short fur.",
  },
  {
    abbreviation: "dlh",
    longName: "Domestic Longhair",
    description:
      "A domestic long-haired cat, or fluffy cat, is a cat of mixed ancestry – thus not belonging to any particular recognised cat breed – possessing a coat of semi-long to long fur.",
  },
  {
    abbreviation: "sia",
    longName: "Siamese",
    description:
      "The Siamese cat is one of the first distinctly recognized breeds of Asian cat. Derived from the Wichianmat landrace, one of several varieties of cat native to Thailand (formerly known as Siam), the Siamese became one of the most popular breeds in Europe and North America in the 19th century.",
  },
  {
    abbreviation: "ben",
    longName: "Bengal",
    description:
      "The Bengal is a domestic cat breed developed to look like exotic jungle cats such as leopards, ocelots, margays and clouded leopards. Bengal cats were developed by selective breeding from hybrids of the Asian leopard cat (ALC), Prionailurus bengalensis bengalensis, with domestic cat, backcrossed to domestic cats, with the goal of creating a confident, healthy, and friendly cat with a highly contrasted and vividly marked coat",
  },
];

let catArray = startArray;

const oldArray = Object.assign({}, startArray);

let menuValue = "dsh";

const ItemTemplate = item => {
  return (
    <TemplateWrap>
      <H4>{item.longName}</H4>
      <H5>{item.description}</H5>
    </TemplateWrap>
  );
};

const mockClickFn = jest.fn();
const changeHandler = jest.fn();

const map = {};
const bodyMap = {};

document.body.addEventListener = jest.fn((event, cb) => {
  bodyMap[event] = cb;
});

document.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});

describe("Dropdown", () => {
  describe("Items passed as array", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountWithTheme(
        <Dropdown
          label="Cat Breeds"
          labelKey="longName"
          onChange={changeHandler}
          source={catArray}
          template={ItemTemplate}
          value={menuValue}
          valueKey="abbreviation"
        />
      );
    });
    afterEach(() => {
      wrapper.unmount();
      changeHandler.mockClear();
      mockClickFn.mockClear();
    });

    it("matches snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("returns no a11y violations", async () => {
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });

    it("closes menu on outside click", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      const div = document.createElement("div");
      document.body.appendChild(div);
      map.click({ target: div });
      wrapper.update();
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("moves a selected item to top of array, displays it first and prev item 2nd in the menu", () => {
      wrapper.setProps({ openMenu: true, onItemClick: mockClickFn });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .last()
        .simulate("click");
      wrapper.instance().forceUpdate();
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
      expect(changeHandler).toHaveBeenCalledWith(
        oldArray[3].abbreviation,
        expect.any(Array),
        expect.objectContaining({ type: "click" })
      );
      expect(oldArray[3]).toEqual(startArray[0]);
      expect(oldArray[0]).toEqual(startArray[1]);
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("Does not set an initial value on the input if value is null and allowBlank is true", () => {
      wrapper.setProps({ value: undefined });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Input).props().value).toBe("");
    });

    it("Sets an initial value in the input when value is null and allowBlank is false", () => {
      wrapper.setProps({ allowBlank: false });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Input).props().value).toBe(oldArray[0].longName);
    });

    it("mounts an input when type is not declared", () => {
      expect(wrapper.find(Input).length).toBe(1);
      expect(wrapper.find(Input).find(IconDropdownArrow).length).toBe(1);
    });

    it("does not mount an input when type=button and inserts the Dropdown arrow as the button", () => {
      wrapper.setProps({ type: "button" });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Input).length).toBe(0);
      expect(wrapper.find(Input).find(IconDropdownArrow).length).toBe(0);
      expect(wrapper.find("dropdown__DropdownWrap").length).toBe(1);
      expect(
        wrapper.find("dropdown__MenuButton").find(IconDropdownArrow).length
      ).toBe(1);
    });

    it("does not return a11y violations when type=button", async () => {
      wrapper.setProps({ type: "button" });
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });

    it("passes buttonLabel to menu button when type=button", () => {
      wrapper.setProps({ type: "button", buttonLabel: <IconMenu /> });
      expect(wrapper).toMatchSnapshot();
      expect(
        wrapper.find("dropdown__MenuButton").find(IconDropdownArrow).length
      ).toBe(0);
      expect(wrapper.find("dropdown__MenuButton").find(IconMenu).length).toBe(
        1
      );
    });

    it("hides the menu when mounted", () => {
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("displays the menu when menu button is clicked", () => {
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
      wrapper.find("dropdown__MenuButton").simulate("click");
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
    });

    it("displays the menu when `openMenu` is true", () => {
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
      wrapper.setProps({ openMenu: true });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
    });

    it("closes menu when an item is selected and `closeOnSelect`=true", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("click");
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("does not close menu when item is selected and `closeOnSelect`=false", () => {
      wrapper.setProps({ openMenu: true, closeOnSelect: false });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("click");
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
    });

    it("disables the input, menu button, and does not open menu when `disabled`=true", async () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper).toMatchSnapshot();
      const input = wrapper.find(Input);
      const menuBtn = wrapper.find(Input).find("dropdown__MenuButton");
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
      expect(input.props().inputState).toBe("disabled");
      expect(menuBtn.props().disabled).toBe(true);
      expect(
        menuBtn.getDOMNode().attributes.getNamedItem("disabled").value
      ).toBe("");
      expect(menuBtn).toHaveStyleRule("cursor", "not-allowed");
      expect(menuBtn.find(IconDropdownArrow)).toHaveStyleRule(
        "fill",
        theme.colors.base45pct
      );
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("click");
      wrapper.update();
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("sets the input to an error state and displays the error text when string is passed via `error` prop", () => {
      wrapper.setProps({ error: "an error" });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Input).props().inputState).toBe("error");
      expect(
        wrapper
          .find(Input)
          .find("help-text__HelpLabel")
          .text()
      ).toBe("an error");
    });

    it("applies a default background-color on hover to each item when `itemHover`=true", () => {
      wrapper.setProps({ itemHover: true });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        expect(item).toHaveStyleRule("background-color", theme.colors.border, {
          modifier: ":hover",
        });
      });
    });

    it("applies a custom background-color via `itemHoverColor`on hover to each item when `itemHover`=true", () => {
      wrapper.setProps({
        itemHover: true,
        itemHoverColor: theme.colors.actionHover,
      });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        expect(item).toHaveStyleRule(
          "background-color",
          theme.colors.actionHover,
          {
            modifier: ":hover",
          }
        );
      });
    });

    it("sets a label on the input via `label` prop", () => {
      expect(
        wrapper
          .find(Input)
          .find("label__LabelField")
          .text()
      ).toBe("Cat Breeds");
    });

    it("sets the value of each item to its labelKey when template is not passed", () => {
      wrapper.setProps({ template: null });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach((item, i) => {
        expect(item.text()).toBe(startArray[i].longName);
      });
    });

    it("sets the position of the menu to the left or right side of the input via props", () => {
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule("right", "0");
      wrapper.setProps({ menuPosition: "right" });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("dropdown__MenuList")).not.toHaveStyleRule(
        "right",
        "0"
      );
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule("left", "0");
    });

    it("sets the html name attr of the input/button via props", () => {
      wrapper.setProps({ name: "testName" });
      expect(wrapper.find(Input).props().name).toBe("testName");
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ type: "button", name: "testName" });
      expect(wrapper.find("dropdown__MenuButton").props().name).toBe(
        "testName"
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("attaches an onBlur prop to the input button", () => {
      wrapper.setProps({ onBlur: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("blur");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches an onBlur func to button when type=button", () => {
      wrapper.setProps({ type: "button", onBlur: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Input).find("dropdown__MenuButton").length).toBe(0);
      wrapper.find("dropdown__MenuButton").simulate("blur");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onClick func to menuButton", () => {
      wrapper.setProps({ onClick: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("click");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onFocus func to input button", () => {
      wrapper.setProps({ onFocus: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("focus");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onMouseDown func to input button", () => {
      wrapper.setProps({ onMouseDown: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("mousedown");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onMouseEnter func to input button", () => {
      wrapper.setProps({ onMouseEnter: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("mouseenter");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onMouseLeave func to input button", () => {
      wrapper.setProps({ onMouseLeave: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("mouseleave");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onMouseUp func to input button", () => {
      wrapper.setProps({ onMouseUp: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("mouseUp");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onTouchStart func to input button", () => {
      wrapper.setProps({ onTouchStart: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("touchstart");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches onTouchEnd func to input button", () => {
      wrapper.setProps({ onTouchEnd: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("touchend");
      expect(mockClickFn).toHaveBeenCalled();
    });

    it("attaches an onBlur function to each item via onItemBlur", () => {
      wrapper.setProps({ openMenu: true, onItemBlur: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        item.simulate("blur");
        expect(mockClickFn).toHaveBeenCalled();
        mockClickFn.mockClear();
      });
    });

    it("attaches an onClick function to each item via onItemClick", () => {
      wrapper.setProps({ openMenu: true, onItemClick: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        item.simulate("click");
        expect(mockClickFn).toHaveBeenCalled();
        mockClickFn.mockClear();
      });
    });

    it("attaches an onFocus function to each item via onItemFocus", () => {
      wrapper.setProps({ openMenu: true, onItemFocus: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        item.simulate("focus");
        expect(mockClickFn).toHaveBeenCalled();
        mockClickFn.mockClear();
      });
    });

    it("sets the input as required via props", () => {
      wrapper.setProps({ required: true });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Input).props().required).toBe(true);
    });

    it("opens the menu when down arrow is pressed while menu button is focused", () => {
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("keydown", { keyCode: 40 });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
    });

    it("closes the menu when esc is pressed", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("keydown", { keyCode: 27 });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("closes the menu when up arrow is pressed", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find(Input)
        .find("dropdown__MenuButton")
        .simulate("keydown", { keyCode: 38 });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("closes menu when menu item is focused and tab key is pressed", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("keydown", { keyCode: 9 });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("closes menu when menu item is focused and esc key is pressed", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("keydown", { keyCode: 27 });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("selects the focused item when enter is pressed", () => {
      const oldArray = Object.assign({}, startArray);
      wrapper.setProps({ openMenu: true, onItemClick: mockClickFn });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .last()
        .simulate("keydown", { keyCode: 13 });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
      expect(changeHandler).toHaveBeenCalledWith(
        oldArray[3].abbreviation,
        expect.any(Array),
        expect.objectContaining({ type: "keydown" })
      );
      expect(oldArray[3]).toEqual(startArray[0]);
      expect(mockClickFn).toHaveBeenCalled();
    });
  });

  describe("items passed as children", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountWithTheme(
        <Dropdown buttonLabel={<IconMenu />} type="button">
          <ItemWrap>
            <H5>Profile</H5>
          </ItemWrap>
          <ItemWrap>
            <H5>Help</H5>
          </ItemWrap>
          <ItemWrap>
            <H5>Logout</H5>
          </ItemWrap>
        </Dropdown>
      );
    });

    afterEach(() => {
      wrapper.unmount();
      mockClickFn.mockClear();
    });

    it("matches snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("returns no a11y violations", async () => {
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });

    it("renders all children", () => {
      expect(wrapper.find("dropdown__MenuItem").length).toBe(3);
    });

    it("closes the menu when an item is selected", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("click");
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("does not close menu when closeOnSelect=false", () => {
      wrapper.setProps({ openMenu: true, closeOnSelect: false });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("click");
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
    });

    it("attaches an onBlur function to each item via onItemBlur", () => {
      wrapper.setProps({ openMenu: true, onItemBlur: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        item.simulate("blur");
        expect(mockClickFn).toHaveBeenCalled();
        mockClickFn.mockClear();
      });
    });

    it("attaches an onClick function to each item via onItemClick", () => {
      wrapper.setProps({ openMenu: true, onItemClick: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        item.simulate("click");
        expect(mockClickFn).toHaveBeenCalled();
        mockClickFn.mockClear();
      });
    });

    it("attaches an onFocus function to each item via onItemFocus", () => {
      wrapper.setProps({ openMenu: true, onItemFocus: mockClickFn });
      expect(wrapper).toMatchSnapshot();
      wrapper.find("dropdown__MenuItem").forEach(item => {
        item.simulate("focus");
        expect(mockClickFn).toHaveBeenCalled();
        mockClickFn.mockClear();
      });
    });

    it("closes menu when menu item is focused and tab key is pressed", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("keydown", { keyCode: 9 });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("closes menu when menu item is focused and esc key is pressed", () => {
      wrapper.setProps({ openMenu: true });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .first()
        .simulate("keydown", { keyCode: 27 });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });

    it("closes the menu when enter is pressed", () => {
      wrapper.setProps({ openMenu: true, onItemClick: mockClickFn });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "block"
      );
      wrapper
        .find("dropdown__MenuItem")
        .last()
        .simulate("keydown", { keyCode: 13 });
      expect(wrapper.find("dropdown__MenuList")).toHaveStyleRule(
        "display",
        "none"
      );
    });
  });
});
