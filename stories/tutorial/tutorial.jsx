import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  text,
  boolean,
  object,
  select,
} from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import { Tutorial, H3, Button } from "../../src/index.js";

const stories = storiesOf("Tooltips", module);

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

const composeOptions = {
  button: "Button",
  h3: "H3",
};

const composeReturn = value => {
  switch (value) {
    case "h3":
      return H3;
      break;
    case "button":
      return Button;
      break;
    default:
      return H3;
  }
};
/* eslint-enable no-unreachable */
const actions = [
  {
    label: "Previous",
    onClick: () => {
      alert("go to previous clicked");
    },
  },
  {
    label: "Next",
    onClick: () => {
      alert("go to next clicked");
    },
    id: "nextTip",
  },
];
stories.add(
  "Tutorial",
  withInfo(`
    The tutorial is used to convey information about what the composed component is and how to use that component to the user, generally pertaining to the element that the tooltip is composing (but can also refer to its' parents/siblings/children).

    The DRACS tutorial is a higher-order-component that works by composing the element that is to have the tutorial display.
    The tooltip will only show when the application sets \`tutorialActive\` to \`true\`, and unlike the base tooltip will not display when hovering over/clicking on the composed component.
    This guarantees that the tutorial will know the position and sizing of the element it is composing and can thus render in the position specified by the \`tutorialPosition\` prop.

    #### Example declaration:
    ~~~js
    import { Tutorial, H5 } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    const ExampleTutorial = Tutorial(H5);

    <ExampleTutorial
      tutorialActive={activeProp}
      tutorialTitle='This is an H5'
      tutorialBody='It is used to display helpful tips and contextual information'
      tutorialActions={[
        {
          label: 'Next Tip',
          onClick: ()=>{goToNextTip()}
        },
        {
          label: 'Previous Tip',
          onClick: ()=>{goToPreviousTip()}
        },
      ]}
    >
      I'm the H5 the tooltip is composing
    </ExampleTutorial>
    ~~~

    #### Prop Type Deifinitions -- until React-Docgen has better HOC support (\`Tutorial\` is an HOC)
    ~~~js
    /** React element(s) passed as a child of the tooltip */
    children: propTypes.node,
    /** ID of element that should gain focus when tutorial renders */
    idToFocus: propTypes.string,
    /** Function called when tutorial is dismounted/closed */
    tutorialClose: propTypes.func,
    /** Function called when tutorial is mounted/opened */
    onTutorialOpen: propTypes.func,
    /** Number that sets the total number of tutorial tips if tutorial has multiple tips to display */
    tipCount: propTypes.number,
    /** Number that shows which tip is currently displaying out of the total number of tips in the tutorial */
    tipNumber: propTypes.number,
    /** Sets whether the tutorial is rendered */
    tutorialActive: propTypes.bool,
    /** An object or array of objects whose keys map to the props for the base DRACS \`Button\` component */
    tutorialActions: propTypes.oneOfType([propTypes.array, propTypes.object]),
    /** A string or react element that displays in the body section of the tutorial */
    tutorialBody: propTypes.oneOfType([propTypes.string, propTypes.node]),
    /** Number (in miliseconds) that delays the component from mounting/dismounting to allow the component to render enter/exit animations */
    tutorialDelay: propTypes.number,
    /** String that sets an HTML/CSS ID attribute on the tutorial's outer wrapper */
    tutorialId: propTypes.string,
    /** Image that renders in the tutorial body */
    tutorialImage: propTypes.oneOfType([propTypes.string, propTypes.node]),
    /** Sets whether the tutorial displays above, below, to the left, or to the right of the composed component.  If 'horizontal', the tooltip will evaluate where there is more space to the left or right, 'vertical' top/bottom, then display where there is more space */
    tutorialPosition: propTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key])),
    /** String or react element that sets the title of the tutorial tip */
    tutorialTitle: propTypes.oneOfType([propTypes.string, propTypes.node]),
    ~~~
  `)(() => {
    const composedElement = select(
      "Composed Element",
      composeOptions,
      "button"
    );
    const TutorialExample = Tutorial(composeReturn(composedElement));
    const tutorialPosition = select(
      "tutorialPosition",
      ["vertical", "horizontal", "top", "bottom", "left", "right"],
      "vertical"
    );
    const tutorialClose = select("tutorialClose", FuncOptions, "none");
    const onTutorialOpen = select("onTutorialOpen", FuncOptions, "none");

    return (
      <TutorialExample
        tutorialActive={boolean("tutorialActive", true)}
        tutorialPosition={tutorialPosition}
        tutorialTitle={text("tutorialTitle", "Thing To Use")}
        tutorialBody={text(
          "tutorialBody",
          "This thing is very useful, and this is how it's used and why you should use it.  Click the 'active' input to be able to click the see info button"
        )}
        tutorialId={text("tutorialId", "")}
        tutorialDelay={number("tutorialDelay", 300)}
        tutorialClose={FuncReturn(tutorialClose)}
        onTutorialOpen={FuncReturn(onTutorialOpen)}
        tutorialActions={object("tutorialActions", actions)}
        idToFocus="#nextTip"
        tipCount={number("tipCount", 4)}
        tipNumber={number("tipNumber", 1)}
        label={
          composedElement === "button"
            ? text("button label", "Button composed with Tutorial")
            : null
        }
        onClick={() => {}}
      >
        {composedElement === "h3"
          ? text("body text", "H3 composed with Tutorial")
          : null}
      </TutorialExample>
    );
  })
);
