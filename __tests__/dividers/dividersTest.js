import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "../../config/axe-helper.js";
import { SolidDivider, DashedDivider } from "../../lib/dracs.es.js";

describe("Dividers", () => {
  describe("SolidDivider", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(<SolidDivider />);
      expect(wrapper).toMatchSnapshot();
    });

    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<SolidDivider />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe("DashedDivider", () => {
    it("matches snapshot", () => {
      const wrapper = mountWithTheme(<DashedDivider />);
      expect(wrapper).toMatchSnapshot();
    });

    it("returns no a11y violations", async () => {
      const wrapper = mountWithTheme(<DashedDivider />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });
});
