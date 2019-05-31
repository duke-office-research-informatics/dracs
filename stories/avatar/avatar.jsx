import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  color,
  text,
  select,
} from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import {
  Avatar,
  theme,
  IconCloseCircleFilled,
  IconCheckCircle,
  IconWarning,
} from "../../src/index.js";

const stories = storiesOf("Avatar", module);

stories.addDecorator(withKnobs);

const IconOptions = {
  none: "none",
  Error: "Error",
  Success: "Success",
  Warning: "Warning",
};

/* eslint-disable no-unreachable */
const IconReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "Error":
      return (
        <IconCloseCircleFilled
          size={40}
          innerTextColor={"#fff"}
          color={theme.colors.error}
        />
      );
      break;
    case "Success":
      return (
        <IconCheckCircle
          size={40}
          innerTextColor={"#fff"}
          color={theme.colors.successGreen}
        />
      );
      break;
    case "Warning":
      return <IconWarning size={40} color={theme.colors.warning} />;
      break;
    default:
      return null;
  }
};

stories.add(
  "Avatar",
  withInfo(`
  #### Example declaration:
  ~~~js
  import { Avatar } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <Avatar displayLetter={<letter>} imgUrl={<url>}/>
  ~~~
`)(() => {
    const statusIcon = select("statusIcon", IconOptions, "none");
    return (
      <Avatar
        size={number("size", 120)}
        imgUrl={text("imgUrl", "https://i.imgflip.com/pagy8.jpg")}
        displayLetter={text("displayLetter", "a")}
        bgColor={color("bgColor", theme.colors.muted)}
        iconColor={color("iconColor", "#fff")}
        statusIcon={IconReturn(statusIcon)}
      />
    );
  })
);
