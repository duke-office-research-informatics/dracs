import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  text,
  boolean,
  select,
  object,
  color,
} from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import {
  Stepper,
  Step,
  StepLabel,
  IconWarning,
  IconSearch,
  IconHelp,
  IconDownloadFile,
  theme,
} from "../../src/index.js";

const stories = storiesOf("Progress", module);

stories.addDecorator(withKnobs);

const activeStepOptions = {
  range: true,
  min: 0,
  max: 4,
  step: 1,
};

const IconOptions = {
  none: "none",
  WarningIcon: "Warning Icon",
  SearchIcon: "Search Icon",
  HelpIcon: "Help Icon",
  FileDownloadIcon: "File Download Icon",
};
/* eslint-disable no-unreachable */
const IconReturn = value => {
  switch (value) {
    case "none":
      return null;
      break;
    case "WarningIcon":
      return <IconWarning color={theme.colors.error} />;
      break;
    case "SearchIcon":
      return <IconSearch color={theme.colors.action} />;
      break;
    case "HelpIcon":
      return <IconHelp color={theme.colors.action} />;
    case "FileDownloadIcon":
      return <IconDownloadFile color={theme.colors.action} />;
      break;
    default:
      return null;
  }
};

stories.add(
  "Stepper",
  withInfo(`
    The stepper component is meant to convey a user's incremental progress in steps.
    It is currently a display-only component, but will eventually have the ability to control steps/step completion internally.

    The component's styling and layout depend on the \`<Stepper>\` component being the parent of a number (greater than one) of \`<Step>\` siblings.
    Each \`<Step>\`'s API is designed to accept and automatically format a \`<StepLabel>\`.

    The horizontal orientation is best-suited to non-mobile breakpoints, and the vertical orientation is best-suited to mobile.
    Currently, if the oriwntation is \`vertical\`, passing the \`justifyLabelsToBottom\` prop is passed to the stepper can cause layout issues in certain cases.

    #### Example declaration:
    ~~~js
    import { Stepper, Step, StepLabel } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <Stepper
      activeStep={2}
    >
      <Step>
        <StepLabel>
          Step 1
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          Step 2
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          Step 3
        </StepLabel>
      </Step>
    </Stepper>
    ~~~

  `)(() => {
    const activeStep = number("activeStep", 0, activeStepOptions, "activeStep");
    const justifyLabelsToBottom = boolean("justifyLabelsToBottom", false);
    const numberIcons = boolean("numberIcons", true);
    const iconActiveColor = color("iconActiveColor", theme.colors.action);
    const iconCompleteColor = color(
      "iconCompleteColor",
      theme.colors.successGreen
    );
    const iconIncompleteColor = color(
      "iconIncompleteColor",
      theme.colors.muted
    );
    const iconTextColor = color("iconTextColor", "#fff");
    const orientation = select("orientation", ["horizontal", "vertical"]);
    const stepperWrapperStyle = object("Stepper wrapperStyle", {});
    const stepWrapperStyle = object("Step wrapperStyle", {});
    const stepLabelWrapperStyle = object("Step Label wrapperStyle", {});
    const stepLabelTextStyle = object("Step Label Text Style", {});
    const step1Icon = select("Step 1 icon", IconOptions, "none");
    const step2Icon = select("Step 2 icon", IconOptions, "none");
    const step3Icon = select("Step 3 icon", IconOptions, "none");
    const step4Icon = select("Step 4 icon", IconOptions, "none");
    const step5Icon = select("Step 5 icon", IconOptions, "none");
    return (
      <Stepper
        activeStep={activeStep}
        iconActiveColor={iconActiveColor}
        iconCompleteColor={iconCompleteColor}
        iconIncompleteColor={iconIncompleteColor}
        iconTextColor={iconTextColor}
        justifyLabelsToBottom={justifyLabelsToBottom}
        orientation={orientation}
        numberIcons={numberIcons}
        wrapperStyle={stepperWrapperStyle}
      >
        <Step wrapperStyle={stepWrapperStyle}>
          <StepLabel
            icon={IconReturn(step1Icon)}
            labelStyle={stepLabelTextStyle}
            wrapperStyle={stepLabelWrapperStyle}
          >
            {text("Step 1 label text", "Step 1")}
          </StepLabel>
        </Step>
        <Step wrapperStyle={stepWrapperStyle}>
          <StepLabel
            icon={IconReturn(step2Icon)}
            labelStyle={stepLabelTextStyle}
            wrapperStyle={stepLabelWrapperStyle}
          >
            {text("Step 2 label text", "Step 2")}
          </StepLabel>
        </Step>
        <Step wrapperStyle={stepWrapperStyle}>
          <StepLabel
            icon={IconReturn(step3Icon)}
            labelStyle={stepLabelTextStyle}
            wrapperStyle={stepLabelWrapperStyle}
          >
            {text("Step 3 label text", "Step 3")}
          </StepLabel>
        </Step>
        <Step wrapperStyle={stepWrapperStyle}>
          <StepLabel
            icon={IconReturn(step4Icon)}
            labelStyle={stepLabelTextStyle}
            wrapperStyle={stepLabelWrapperStyle}
          >
            {text("Step 4 label text", "Step 4")}
          </StepLabel>
        </Step>
        <Step wrapperStyle={stepWrapperStyle}>
          <StepLabel
            icon={IconReturn(step5Icon)}
            labelStyle={stepLabelTextStyle}
            wrapperStyle={stepLabelWrapperStyle}
          >
            {text("Step 5 label text", "Step 5")}
          </StepLabel>
        </Step>
      </Stepper>
    );
  })
);
