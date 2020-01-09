import React from "react";
import { ThemeProvider } from "styled-components";
import { mount, shallow } from "enzyme";
import { theme as defaultTheme } from "../lib/dracs.es.js";

export const shallowWithTheme = (children, customTheme) => {
  const theme = customTheme || defaultTheme;
  return shallow(children, { context: theme });
};

/* eslint-disable */
export function mountWithTheme(child) {
  return mount(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
    ),
  });
}

//FOR ACCESSING PORTALS VIA ENZYME -- import portal from dracs
// https://github.com/airbnb/enzyme/issues/1202#issuecomment-351639783
// function mountPortal(el){
//   const wrapper =  mountWithTheme(el);
//   wrapper.setState({ visible: true});
//   const portalInstance = wrapper.find(Portal).instance();
//   return mountWithTheme(portalInstance.props.children);
// }

//FOR ACCESSING EVENT LISTENERS ATTACHED TO DOCUMENT OR DOCUMENT.BODY
//https://github.com/airbnb/enzyme/issues/426#issuecomment-296304015
// const map = {};
// document.body.addEventListener = jest.fn((event, cb) => {
//   map[event] = cb;
// });
