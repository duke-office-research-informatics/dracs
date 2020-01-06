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
import { Modal, P, H3, H5, Button } from "../../src/index.js";

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
  "Modal",
  withInfo(`
    The Modal component is used to intentionally force the user to interact with a desired set of actions/information outside of the normal page workflow.
    It places an overlay over its' parent container (generally the document body) which disallows any interaction with elements rendered below the overlay,
    forcing the user to interact exclusively with the content in the modal.  It is to be used when the user needs to interact with content immediately before
    moving on with their workflow.

    #### Example declaration:
    ~~~js
    import { Modal } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Modal
        active={activeProp}
      >
        <children/>
      </Modal>
    ~~~


    #### Prop Type Deifinitions -- until React-Docgen has better HOC support (\`ActivableRenderer\` is an HOC)
    ~~~js
    /** Sets whether or not the modal renders */
    active: propTypes.bool,
    /** React element(s) passed as a child of the modal */
    children: propTypes.node,
    /** Number in miliseconds that delays the component's mount/dismount so that the modal's enter and exit animations have time to render */
    delay: propTypes.number,
    /** CSS consumable (px, vh, em, etc) string that sets the height of the component */
    height: propTypes.string,
    /** CSS consumable (px, vh, em, etc) string that sets the minimum height of the component */
    minHeight: propTypes.string,
    /** CSS consumable (px, vh, em, etc) string that sets the maximum height of the component */
    maxHeight: propTypes.string,
    /** Dom node element (almost always a ref to a child of the Modal component) that will gain focus when the modal is rendered */
    initialFocusEl: propTypes.oneOfType([propTypes.node, propTypes.element, propTypes.object]),
    /** Style object that applies custom styles to the modal wrapper */
    modalStyle: propTypes.object,
    /** Function that will be called when the user hits the \`esc\` key.  For accessibility reasons, this function should close the dialog */
    onEscKeyDown: propTypes.func,
    /** Function that will be called when the user clicks on the overlay beneath the dialog.  For accessibility reasons, this function should close the dialog */
    onOverlayClick: propTypes.func,
    /** Function that will be called when the user begins to click on the overlay. */
    onOverlayMouseDown: propTypes.func,
    /** Function that will be called when the user moves the mouse cursor in the overlay. */
    onOverlayMouseMove: propTypes.func,
    /** Function that will be called when the user ends a click on the overlay. */
    onOverlayMouseUp: propTypes.func,
    /** Style object that overwrites the default overlay style with custom styling */
    overlayStyle: propTypes.object,
    /** CSS consumable (px, vh, em, etc) string that sets the padding of the component */
    padding: propTypes.string,
    /** Dom node that is passed to the portal to denote which element the Modal should be a child of -- defaults to the document body */
    portalContainer: propTypes.oneOfType([propTypes.node, propTypes.object]),
    /** CSS consumable (px, vw, em, etc) string that sets the width of the component */
    width: propTypes.string,
    /** CSS consumable (px, vw, em, etc) string that sets the minimum width of the component */
    minWidth: propTypes.string,
    /** String that sets a pre-set width for the modal. small: '400px', medium: '700px', large: '96vw', fullscreen: '100vw', auto: 'auto' */
    maxWidth: propTypes.oneOf(['small', 'medium', 'large', 'fullscreen', 'auto']),
    /** CSS consumable (px, vh, em, etc) string that sets the margin of the component */
    margin: propTypes.string,
    ~~~
  `)(() => {
    const escKey = select("onEscKeyDown", FuncOptions, "none");
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
        <Modal
          active={boolean("active", true)}
          delay={number("delay", 300)}
          height={text("height", "auto")}
          minHeight={text("minHeight", "")}
          maxheight={text("maxHeight", "")}
          modalStyle={object("modalStyle", {})}
          onEscKeyDown={FuncReturn(escKey)}
          onOverlayClick={FuncReturn(overlayClick)}
          onOverlayMouseDown={FuncReturn(mouseDown)}
          onOverlayMouseMove={FuncReturn(mouseMove)}
          onOverlayMouseUp={FuncReturn(mouseUp)}
          overlayStyle={object("overlayStyle", {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
          padding={text("padding", "")}
          width={text("width", "")}
          minWidth={text("minWidth", "")}
          maxWidth={select(
            "maxWidth",
            ["small", "medium", "large", "fullscreen", "auto"],
            "auto"
          )}
          margin={text("margin", "")}
          initialFocusEl={this.button}
        >
          <H3 bold>
            {text("example header text", "This is an example modal header")}
          </H3>
          <P>
            {text(
              "example body text",
              "You can put whatever you want into the body"
            )}
          </P>
          <H5 italic>
            To get to the 'show info' button, uncheck the 'active' input
          </H5>
          <Button
            label={text("example button", "example button")}
            onClick={() => {}}
            ref={node => (this.button = node)}
            style={{ alignSelf: "flex-end" }}
          />
        </Modal>
      </div>
    );
  })
);
