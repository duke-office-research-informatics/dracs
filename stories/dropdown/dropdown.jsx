import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { State, Store } from "@sambego/storybook-state";
import {
  Dropdown,
  theme,
  H4,
  H5,
  Button,
  IconDropdownArrow,
  IconMenu,
  IconHelp,
  IconLogout,
  IconProfile,
} from "../../src/index.js";
import styled from "styled-components";

const stories = storiesOf("Dropdown", module);
stories.addDecorator(withKnobs);

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

const array = [
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

const ItemTemplate = item => {
  return (
    <TemplateWrap>
      <H4>{item.longName}</H4>
      <H5>{item.description}</H5>
    </TemplateWrap>
  );
};

const templateOptions = {
  none: "No template",
  withTemplate: "With Template",
};
/* eslint-disable no-unreachable */
const templateReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "withTemplate":
      return ItemTemplate;
      break;
    default:
      return null;
  }
};

const buttonLabelOpts = {
  none: "No Label",
  button: "Custom Button",
  string: "Custom String",
};

const buttonLabelReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "button":
      return (
        <Button
          label={
            <span style={{ display: "flex", alignItems: "center" }}>
              Cat Breeds <IconDropdownArrow />
            </span>
          }
        />
      );
      break;
    case "string":
      return text("custom string", "cat breeds");
      break;
    default:
      return null;
  }
};

const FuncOptions = {
  none: "no handler declared",
  withHandler: "with handler declared",
};

const FuncReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "withHandler":
      return () => alert("handler declared");
      break;
    default:
      return null;
  }
};
/* eslint-enable no-unreachable */
const store = new Store({
  source: array,
  value: "dsh",
});

stories.add(
  "Dropdown - Items passed by array",
  withInfo(`
    - A dropdown menu consists of an input (which can be a text input or a button), and a menu that displays beneath the input when it is triggered.


    - The dropdown component is accessible and keyboard-navigable, which is implemented following ARIA interaction standards and best-practices.


    - The DRACS dropdown can populate the menu items via an array of strings/objects that represents each item (which can be styled with a template element that is passed concurrently),
    via React children that are passed as a direct child of the \`Dropdown\` component, or via a combination off the two.


    #### This story documents how to pass menu items as an array of strings/objects.


    - When an array is passed to the dropdown component, the input displays the label of the active item (determined by the value and valueKey prop.).  When the user selects a different item,
    the dropdown's change handler returns the value of the item selected, and a new array sorted so that the selected item is displayed at the top of the menu (which is in compliance with Material Design and ARIA practices).



    - Passing items as an array is useful for when you want the user to make a choice between a number of options via the dropdown (and can be used as an alternative to radio buttons).



    - When items are passed as an array, the component is optimized to have the \`type\` prop set to \`input\`.

    #### Example declaration:
    ~~~js
    import { Dropdown } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    const exampleItemArray = [
      {
        "abbreviation": "dsh",
        "longName": "Domestic Shorthair"
      },
      {
        "abbreviation": "dlh",
        "longName": "Domestic Longhair"
      },
      {
        "abbreviation": "sia",
        "longName": "Siamese"
      },
      {
        "abbreviation": "ben",
        "longName": "Bengal"
      }
    ]

    const TemplateWrap = styled.div\`
      display: flex;
      flex: 1 1 auto;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      width: calc(100% - 16px);
      min-width: 400px;
      padding: 8px;
    \`;

    const ItemTemplate = item => {
      return(
        <TemplateWrap>
          <H4>{item.longName}</H4>
          <H5>{item.description}</H5>
        </TemplateWrap>
      );
    }

    state ={
      value: 'dsh',
      source: exampleItemArray,
    }

    const onChange = (value, sortedValues) => {
      this.setState({
        value: value,
        source: sortedValues
      });
    }

    <Dropdown
      label='Cat Breeds'
      labelKey='longName'
      onChange={this.onChange}
      source={this.state.source}
      template={ItemTemplate}
      value={this.state.value}
      valueKey='abbreviation'
    />
    ~~~
  `)(() => {
    const handleChange = (value, sortedValues) => {
      store.set({
        source: sortedValues,
        value: value,
      });
    };

    const type = select("type", ["input", "button"], "input");
    const template = select("template", templateOptions, "none");
    const btnLbl = select("buttonLabel", buttonLabelOpts, "none");
    const onBlur = select("onBlur", FuncOptions, "none");
    const onItemBlur = select("onItemBlur", FuncOptions, "none");
    const onClick = select("onClick", FuncOptions, "none");
    const itemClick = select("itemClick", FuncOptions, "none");
    const onFocus = select("onFocus", FuncOptions, "none");
    const onItemFocus = select("onItemFocus", FuncOptions, "none");
    const onMouseDown = select("onMouseDown", FuncOptions, "none");
    const onMouseEnter = select("onMouseEnter", FuncOptions, "none");
    const onMouseLeave = select("onMouseLeave", FuncOptions, "none");
    const onMouseUp = select("onMouseUp", FuncOptions, "none");
    const onTouchStart = select("onTouchStart", FuncOptions, "none");
    const onTouchEnd = select("onTouchEnd", FuncOptions, "none");

    return (
      <State store={store}>
        <Dropdown
          buttonLabel={type === "button" ? buttonLabelReturn(btnLbl) : null}
          menuPosition={select("menuPosition", ["left", "right"], "right")}
          label={text("label", "Cat Breeds")}
          labelKey={text("labelKey", "longName")}
          onBlur={FuncReturn(onBlur)}
          onItemBlur={FuncReturn(onItemBlur)}
          onClick={FuncReturn(onClick)}
          itemClick={FuncReturn(itemClick)}
          onFocus={FuncReturn(onFocus)}
          onItemFocus={FuncReturn(onItemFocus)}
          onMouseDown={FuncReturn(onMouseDown)}
          onMouseEnter={FuncReturn(onMouseEnter)}
          onMouseLeave={FuncReturn(onMouseLeave)}
          onMouseUp={FuncReturn(onMouseUp)}
          onTouchStart={FuncReturn(onTouchStart)}
          onTouchEnd={FuncReturn(onTouchEnd)}
          onChange={handleChange}
          orientAbove={boolean("oreientAbove", false)}
          source={store.get("source")}
          template={templateReturn(template)}
          type={type}
          value={store.get("value")}
          valueKey={text("valueKey", "abbreviation")}
        />
      </State>
    );
  })
);

stories.add(
  "Dropdown - Items passed as children",
  withInfo(`
    - A dropdown menu consists of an input (which can be a text input or a button), and a menu that displays beneath the input when it is triggered.


    - The dropdown component is accessible and keyboard-navigable, which is implemented following ARIA interaction standards and best-practices.


    - The DRACS dropdown can populate the menu items via an array of strings/objects that represents each item (which can be styled with a template element that is passed concurrently),
    via React children that are passed as a direct child of the \`Dropdown\` component, or via a combination off the two.


    #### This story documents how to pass menu items as children.

    - When items are passed as children, the optimal \`type\` prop is \`button\`.  Dropdowns constructed in this way are meant to display a static list of items that do not re-sort onChange (e.g. a hamburger nav menu).
    Therefore, when declaring items as children, it is not necessary to declare an \`onChange\`, \`value\`, \`valueKey\`, or \`labelKey\` prop.  Instead, each child should handle any desired actions with its own discrete click handler.


    - When items are passed in as children, they are wrapped by a menuItem \`li\` that allows for keyboard navigation of menu items out of the box, therefore items passed as children should not be \`li\` tags.

    #### Example declaration:
    ~~~js
    import { Dropdown, Icon } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js

    <Dropdown
      buttonLabel={<Icon/>}
    >
      <Child1>
      <Child2>
      <Child3>
    </Dropdown>
    ~~~
  `)(() => {
    const type = select("type", ["input", "button"], "button");
    const onBlur = select("onBlur", FuncOptions, "none");
    const onItemBlur = select("onItemBlur", FuncOptions, "none");
    const onClick = select("onClick", FuncOptions, "none");
    const itemClick = select("itemClick", FuncOptions, "none");
    const onFocus = select("onFocus", FuncOptions, "none");
    const onItemFocus = select("onItemFocus", FuncOptions, "none");
    const onMouseDown = select("onMouseDown", FuncOptions, "none");
    const onMouseEnter = select("onMouseEnter", FuncOptions, "none");
    const onMouseLeave = select("onMouseLeave", FuncOptions, "none");
    const onMouseUp = select("onMouseUp", FuncOptions, "none");
    const onTouchStart = select("onTouchStart", FuncOptions, "none");
    const onTouchEnd = select("onTouchEnd", FuncOptions, "none");
    return (
      <Dropdown
        buttonLabel={
          type === "button" ? (
            <IconMenu color={theme.colors.action} size={40} />
          ) : null
        }
        menuPosition={select("menuPosition", ["left", "right"], "right")}
        label={text("label", "Actions")}
        type={type}
        onBlur={FuncReturn(onBlur)}
        onItemBlur={FuncReturn(onItemBlur)}
        onClick={FuncReturn(onClick)}
        itemClick={FuncReturn(itemClick)}
        onFocus={FuncReturn(onFocus)}
        onItemFocus={FuncReturn(onItemFocus)}
        onMouseDown={FuncReturn(onMouseDown)}
        onMouseEnter={FuncReturn(onMouseEnter)}
        onMouseLeave={FuncReturn(onMouseLeave)}
        onMouseUp={FuncReturn(onMouseUp)}
        onTouchStart={FuncReturn(onTouchStart)}
        onTouchEnd={FuncReturn(onTouchEnd)}
        orientAbove={boolean("oreientAbove", false)}
      >
        <ItemWrap onClick={() => alert("profile clicked")}>
          <IconProfile color={theme.colors.subheading} />
          <H5>Profile</H5>
        </ItemWrap>
        <ItemWrap onClick={() => alert("help clicked")}>
          <IconHelp />
          <H5>Help</H5>
        </ItemWrap>
        <ItemWrap onClick={() => alert("logout clicked")}>
          <IconLogout />
          <H5>Logout</H5>
        </ItemWrap>
      </Dropdown>
    );
  })
);
