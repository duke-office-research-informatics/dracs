import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  boolean,
  color,
  text,
  select,
} from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import {
  AppHeader,
  theme,
  IconMenu,
  MrhHeaderIcon,
  IconProfile,
  IconSearch,
  IconDownloadFile,
  Button,
  Avatar,
} from "../../src/index.js";

const IconOptions = {
  none: "none",
  MenuIcon: "Menu Icon",
  ProfileIcon: "Profile Icon",
  SearchIcon: "Search Icon",
  MRHHeaderIcon: "MRH Header Icon",
  FileDownloadIcon: "File Download Icon",
};

const ChildrenOptions = {
  none: "none",
  Avatar: "Avatar",
  Button: "Button",
  MenuIcon: "Menu Icon",
  ProfileIcon: "Profile Icon",
  SearchIcon: "Search Icon",
  MRHHeaderIcon: "MRH Header Icon",
  FileDownloadIcon: "File Download Icon",
};

/* eslint-disable no-unreachable */
const IconReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "MenuIcon":
      return <IconMenu size={40} color="#fff" />;
      break;
    case "ProfileIcon":
      return <IconProfile size={40} color="#fff" />;
      break;
    case "SearchIcon":
      return <IconSearch size={40} color="#fff" />;
      break;
    case "MRHHeaderIcon":
      return <MrhHeaderIcon size={40} color="#fff" />;
    case "FileDownloadIcon":
      return <IconDownloadFile size={40} color="#fff" />;
      break;
    default:
      return null;
  }
};

const ChildrenReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "Avatar":
      return (
        <Avatar displayLetter="A" bgColor={theme.colors.muted} size={40} />
      );
      break;
    case "Button":
      return (
        <Button
          label="Example Button"
          onClick={() => {
            alert("you clicked the example button");
          }}
          type="filled"
        />
      );
      break;
    case "MenuIcon":
      return <IconMenu size={40} color="#fff" />;
      break;
    case "ProfileIcon":
      return <IconProfile size={32} color="#fff" />;
      break;
    case "SearchIcon":
      return <IconSearch size={32} color="#fff" />;
      break;
    case "MRHHeaderIcon":
      return <MrhHeaderIcon size={40} color="#fff" />;
    case "FileDownloadIcon":
      return <IconDownloadFile size={32} color="#fff" />;
      break;
    default:
      return null;
  }
};

const FuncOptions = {
  none: "no click handler declared",
  withHandler: "with click handler declared",
};

const FuncReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "withHandler":
      return () => alert("click handler declared");
      break;
    default:
      return null;
  }
};
/* eslint-enable no-unreachable */

const stories = storiesOf("App Header", module);

stories.addDecorator(withKnobs);

stories.add(
  "Header",
  withInfo(`
  #### Example declaration:
  ~~~js
  import { AppHeader } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <AppHeader>{children}</AppHeader>
  ~~~
`)(() => {
    const leftIcon = select("leftIcon", IconOptions, "MRHHeaderIcon");
    const onLeftIconClick = select("onLeftIconClick", FuncOptions, "none");
    const childrenLeft = select("childrenLeft", ChildrenOptions, "SearchIcon");
    const children = select("children", ChildrenOptions, "none");
    const rightIcon = select("rightIcon", IconOptions, "MenuIcon");
    const onRightIconClick = select("onRightIconClick", FuncOptions, "none");
    const childrenRight = select("childrenRight", ChildrenOptions, "Avatar");

    return (
      <AppHeader
        backgroundColor={color("backgroundColor", theme.colors.action)}
        backgroundImage={text("backgroundImage (url to image)", "")}
        childrenLeft={ChildrenReturn(childrenLeft)}
        childrenRight={ChildrenReturn(childrenRight)}
        height={number("height", 56)}
        fixed={boolean("fixed", true)}
        mediaQuery={text("mediaQuery", "")}
        raised={boolean("raised", false)}
        rightIcon={IconReturn(rightIcon)}
        onRightIconClick={FuncReturn(onRightIconClick)}
        leftIcon={IconReturn(leftIcon)}
        onLeftIconClick={FuncReturn(onLeftIconClick)}
        width={text("width", "calc(100% - 32px)")}
      >
        {ChildrenReturn(children)}
      </AppHeader>
    );
  })
);
