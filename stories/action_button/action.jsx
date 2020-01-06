import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  boolean,
  color,
  text,
  select,
  object,
} from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import {
  ActionButton,
  IconEmail,
  IconSettings,
  IconSearch,
  IconDownloadFile,
  theme,
} from "../../src/index.js";

const stories = storiesOf("Buttons", module);

stories.addDecorator(withKnobs);

const FuncOptions = {
  none: "no click handler declared",
  withHandler: "with click handler declared",
};
/* eslint-disable no-unreachable */
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

const refOptions = {
  none: "no ref declared",
  withRef: "with ref declared",
};

const refReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "withRef":
      return node => (this.button = node);
      break;
    default:
      return null;
  }
};

stories.add(
  "Action Button",
  withInfo(`
  The action button is a simpler version of the main 'Button' component meant to be used exclusively with an Icon.
  The icon is semi-transparent until hovered over, when it becomes fully opaque.
  #### Example declaration:
  ~~~js
  import { ActionButton, <Icon> } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <ActionButton>
    <Icon/>
  </ActionButton>
  ~~~
`)(() => {
    const IconOptions = {
      SettingsIcon: "Settings Icon",
      EmailIcon: "Email Icon",
      SearchIcon: "Search Icon",
      FileDownloadIcon: "File Download Icon",
    };

    const IconReturn = value => {
      switch (value) {
        case "SettingsIcon":
          return <IconSettings size={IconSize} color={IconColor} />;
          break;
        case "EmailIcon":
          return <IconEmail size={IconSize} color={IconColor} />;
          break;
        case "SearchIcon":
          return <IconSearch size={IconSize} color={IconColor} />;
          break;
        case "FileDownloadIcon":
          return <IconDownloadFile size={IconSize} color={IconColor} />;
          break;
        default:
          return <IconSettings size={IconSize} color={IconColor} />;
      }
    };
    /* eslint-enable no-unreachable */
    const ChildIcon = select("Button Icon", IconOptions, "SettingsIcon");
    const IconSize = number("Button Icon Size", 40);
    const IconColor = color("Button Icon Color", theme.colors.action);
    const ref = select("ref", refOptions, "none");
    const onBlur = select("onBlur", FuncOptions, "none");
    const onClick = select("onClick", FuncOptions, "withHandler");
    const onFocus = select("onFocus", FuncOptions, "none");
    const onMouseDown = select("onMouseDown", FuncOptions, "none");
    const onMouseEnter = select("onMouseEnter", FuncOptions, "none");
    const onMouseLeave = select("onMouseLeave", FuncOptions, "none");
    const onMouseUp = select("onMouseUp", FuncOptions, "none");
    const onTouchStart = select("onTouchStart", FuncOptions, "none");
    const onTouchEnd = select("onTouchEnd", FuncOptions, "none");
    return (
      <ActionButton
        autoFocus={boolean("autoFocus", false)}
        className={text("className", "")}
        disabled={boolean("disabled", false)}
        ref={refReturn(ref)}
        onBlur={FuncReturn(onBlur)}
        onClick={FuncReturn(onClick)}
        onFocus={FuncReturn(onFocus)}
        onMouseDown={FuncReturn(onMouseDown)}
        onMouseEnter={FuncReturn(onMouseEnter)}
        onMouseLeave={FuncReturn(onMouseLeave)}
        onMouseUp={FuncReturn(onMouseUp)}
        onTouchStart={FuncReturn(onTouchStart)}
        onTouchEnd={FuncReturn(onTouchEnd)}
        style={object("style", {})}
      >
        {IconReturn(ChildIcon)}
      </ActionButton>
    );
  })
);
