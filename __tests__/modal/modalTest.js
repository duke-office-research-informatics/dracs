import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { Modal, Portal, Button } from "../../lib/dracs.es.js";

describe("Modal", () => {
  it("matches snapshot and returns no a11y violations", () => {
    const wrapper = mountWithTheme(
      <Modal active={true}>
        <Button label="hi" />
      </Modal>
    );
    wrapper.setState({ visible: true });

    const portalInstance = wrapper.find(Portal).instance();
    const modal = mountWithTheme(portalInstance.props.children);
    console.log(modal.html());
  });
});
