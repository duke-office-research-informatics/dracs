import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import styled from "styled-components";
import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/index.js";
import "../assets/reset.css";

const StoryWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100%;
  background-color: #fff;
  margin: 24px;
  box-sizing: border-box;
`;

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <StoryWrapper>{story()}</StoryWrapper>
  </ThemeProvider>
));

function loadStories() {
  // individual stories are required here.
  require("../stories/app_header/header.jsx");
  require("../stories/avatar/avatar.jsx");
  require("../stories/bottom_sheet/bottom_sheet.jsx");
  require("../stories/button/button.jsx");
  require("../stories/action_button/action.jsx");
  require("../stories/checkbox/checkbox.jsx");
  require("../stories/radio_buttons/buttons.jsx");
  require("../stories/cards/card.jsx");
  require("../stories/cards/headerBodyFooter.jsx");
  require("../stories/collapsible/collapsible.jsx");
  require("../stories/dividers/dividers.jsx");
  require("../stories/drawer/drawer.jsx");
  require("../stories/dropdown/dropdown.jsx");
  require("../stories/input/input.jsx");
  require("../stories/textarea/textarea.jsx");
  require("../stories/lists/single_line/listItem.jsx");
  require("../stories/lists/double_line/listItem.jsx");
  require("../stories/lists/triple_line/listItem.jsx");
  require("../stories/loading/spinner.jsx");
  require("../stories/dialog/dialog.jsx");
  require("../stories/modal/modal.jsx");
  require("../stories/pill/pill.jsx");
  require("../stories/progress/circular/circular.jsx");
  require("../stories/progress/linear/linear.jsx");
  require("../stories/snackbar/snackbar.jsx");
  require("../stories/snackbar/queuedSnackbar.jsx");
  require("../stories/stepper/stepper.jsx");
  require("../stories/switch/switch.jsx");
  require("../stories/tooltip/tooltip.jsx");
  require("../stories/tutorial/tutorial.jsx");
  require("../stories/typography/p.js");
  require("../stories/typography/h1.js");
  require("../stories/typography/h2.js");
  require("../stories/typography/h3.js");
  require("../stories/typography/h4.js");
  require("../stories/typography/h5.js");
}

// Option defaults:
setOptions({
  name: "DRACS",
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
});

configure(loadStories, module);
