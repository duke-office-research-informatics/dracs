import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { Dialog, Portal } from "../../lib/dracs.es.js";

const mockFn = jest.fn();

describe("Dialog", () => {
  it("matches snapshot", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    wrapper.unmount();
    dialog.unmount();
  });

  it("returns no a11y violations", async () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    const results = await axe(dialog.html());
    expect(results).toHaveNoViolations();
  });

  it("passes a working button via actions prop", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    const actionButton = dialog
      .find("dialog__DialogActions")
      .find("button__StyledBtn");
    expect(actionButton.props().label).toBe("button");
    actionButton.simulate("click");
    expect(mockFn).toHaveBeenCalled();
    wrapper.unmount();
    dialog.unmount();
  });

  it("passes an on esc keydown function", () => {
    //https://github.com/airbnb/enzyme/issues/426#issuecomment-296304015
    const map = {};
    document.body.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        escKeyDown={mockFn}
        title="A dialog"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    map.keydown({ which: 27 });
    expect(mockFn).toHaveBeenCalled();
    wrapper.unmount();
  });

  it("passes onOverlayClick function to overlay via props", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        onOverlayClick={mockFn}
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    dialog.find("overlay__OverlayWrap").simulate("click");
    expect(mockFn).toHaveBeenCalled();
    wrapper.unmount();
    dialog.unmount();
  });

  it("passes an onOverlayMouseDown function to overlay via props", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        onOverlayMouseDown={mockFn}
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    dialog.find("overlay__OverlayWrap").simulate("mousedown");
    expect(mockFn).toHaveBeenCalled();
    wrapper.unmount();
    dialog.unmount();
  });

  it("passes an onOverlayMouseMove function to overlay via props", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        onOverlayMouseMove={mockFn}
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    dialog.find("overlay__OverlayWrap").simulate("mousemove");
    expect(mockFn).toHaveBeenCalled();
    wrapper.unmount();
    dialog.unmount();
  });

  it("passes an onOverlayMouseUp function to overlay via props", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        onOverlayMouseUp={mockFn}
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    dialog.find("overlay__OverlayWrap").simulate("mouseup");
    expect(mockFn).toHaveBeenCalled();
    wrapper.unmount();
    dialog.unmount();
  });

  it("passes a title via props", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(
      dialog
        .find("#dracs-dialog-title")
        .first()
        .text()
    ).toContain("A dialog");
    wrapper.unmount();
    dialog.unmount();
  });

  it("sets width to auto when type=auto", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        type="auto"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    expect(dialog.find("dialog__DialogBody")).toHaveStyleRule("width", "auto");
    wrapper.unmount();
    dialog.unmount();
  });

  it("sets width to 300px when type=small", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        type="small"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    expect(dialog.find("dialog__DialogBody")).toHaveStyleRule("width", "300px");
    wrapper.unmount();
    dialog.unmount();
  });

  it("sets width to 700px when type=medium", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        type="medium"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    expect(dialog.find("dialog__DialogBody")).toHaveStyleRule("width", "700px");
    wrapper.unmount();
    dialog.unmount();
  });

  it("sets width to 96vw when type=large", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        type="large"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    expect(dialog.find("dialog__DialogBody")).toHaveStyleRule("width", "96vw");
    wrapper.unmount();
    dialog.unmount();
  });

  it("sets width to 25vw when type=quarterScreen", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        type="quarterScreen"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    expect(dialog.find("dialog__DialogBody")).toHaveStyleRule("width", "25vw");
    wrapper.unmount();
    dialog.unmount();
  });

  it("sets width to 50vw when type=halfScreen", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        type="halfScreen"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    expect(dialog.find("dialog__DialogBody")).toHaveStyleRule("width", "50vw");
    wrapper.unmount();
    dialog.unmount();
  });

  it("sets width to 30vw when type=thirtyPctScreen", () => {
    const wrapper = mountWithTheme(
      <Dialog
        active={true}
        title="A dialog"
        type="thirtyPctScreen"
        actions={[{ label: "button", onClick: mockFn }]}
      />
    );
    wrapper.setState({ visible: true });
    const portalInstance = wrapper.find(Portal).instance();
    const dialog = mountWithTheme(portalInstance.props.children);
    expect(dialog).toMatchSnapshot();
    expect(dialog.find("dialog__DialogBody")).toHaveStyleRule("width", "30vw");
    wrapper.unmount();
    dialog.unmount();
  });
});
