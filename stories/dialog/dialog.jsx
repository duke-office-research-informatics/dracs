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
import { Dialog, P, H5 } from "../../src/index.js";

const stories = storiesOf("Modals", module);

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
/* eslint-enable no-unreachable */
stories.add(
  "Dialog",
  withInfo(`
    The Dialog component is a modal that is used in the specific instance that you need an immediate yes/no answer from the user.
    It masks the rest of the application UI and forces the user to confirm/disconfirm or take an action.

    #### Example declaration:
    ~~~js
    import { Dialog } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Dialog
        active={activeProp}
        actions={[
          { label: 'Cancel Thing', onClick: cancelFunc },
          { label: 'Do Thing', onClick: proceedFunc },
        ]}
        title='Really? You Want To Do the Thing?'
      >
        <childThatExplainsWhyWeAreAskingAboutTheThing>
      </Dialog>
    ~~~
    #### Prop Type Deifinitions -- until React-Docgen has better HOC support (\`ActivableRenderer\` is an HOC)
    ~~~js
    /** Array of objects, in which each object maps to the props for the DRACS \`Button\` component */
    actions: propTypes.array,
    /** Boolean that sets whether or not the Dialog will render */
    active: propTypes.bool,
    /** React element(s) that will be children of this component */
    children: propTypes.node,
    /** String that sets optional CSS className */
    className: propTypes.string,
    /** Number (in miliseconds) that will delay the dialog mount and dismount to allow for animations to render */
    delay: propTypes.number,
    /** Function that will be called when the user hits the \`esc\` key.  For accessibility reasons, this function should close the dialog */
    escKeyDown: propTypes.func,
    /** Function that will be called when the user clicks on the overlay beneath the dialog.  For accessibility reasons, this function should close the dialog */
    onOverlayClick: propTypes.func,
    /** Function that will be called when the user begins to click on the overlay. */
    onOverlayMouseDown: propTypes.func,
    /** Function that will be called when the user moves the mouse cursor in the overlay. */
    onOverlayMouseMove: propTypes.func,
    /** Function that will be called when the user ends a click on the overlay. */
    onOverlayMouseUp: propTypes.func,
    /** String that sets the dialog title */
    title: propTypes.string,
    /** String that sets the desired width of the component, \`small\` = 300px, \`medium\` = 700px, \`large\` = 94vw (94% screen width) */
    type: propTypes.oneOf(['auto', 'small', 'medium', 'large', 'quarterScreen', 'halfScreen', 'thirtyPctScreen']),
    ~~~
  `)(() => {
    const escKey = select("escKeyDown", FuncOptions, "none");
    const overlayClick = select("onOverlayClick", FuncOptions, "none");
    const mouseDown = select("onOverlayMouseDown", FuncOptions, "none");
    const mouseMove = select("onOverlayMouseMove", FuncOptions, "none");
    const mouseUp = select("onOverlayMouseUp", FuncOptions, "none");
    /* eslint-disable react/no-unescaped-entities */
    return (
      <div
        style={{
          width: "500px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Dialog
          actions={object("actions", [
            {
              label: "Cancel",
              onClick: () => {
                alert("cancelled");
              },
            },
            {
              label: "Do Thing",
              onClick: () => {
                alert("thing done");
              },
            },
          ])}
          active={boolean("active", true)}
          className={text("className", "")}
          delay={number("delay", 300)}
          escKeyDown={FuncReturn(escKey)}
          onOverlayClick={FuncReturn(overlayClick)}
          onOverlayMouseDown={FuncReturn(mouseDown)}
          onOverlayMouseMove={FuncReturn(mouseMove)}
          onOverlayMouseUp={FuncReturn(mouseUp)}
          title={text("title", "Really? You Want To Do the Thing?")}
          type={select(
            "type",
            [
              "auto",
              "small",
              "medium",
              "large",
              "quarterScreen",
              "halfScreen",
              "thirtyPctScreen",
            ],
            "auto"
          )}
        >
          <P italic>
            There are reasons for not doing the thing, consider them before you
            do it please.
          </P>
          <H5 italic>
            To get to the 'show info' button, uncheck the 'active' input
          </H5>
        </Dialog>
      </div>
    );
  })
);
