import React from "react";
import { mountWithTheme } from "../../config/scUtils.js";
import { axe } from "jest-axe";
import { List, SingleLineListItem } from "../../lib/dracs.es.js";

describe("List", () => {
  it("matches snapshot", () => {
    const list = mountWithTheme(<List />);
    expect(list).toMatchSnapshot();
  });
  it("returns no a11y violations", async () => {
    const list = mountWithTheme(<List />);
    const results = await axe(list.html());
    expect(results).toHaveNoViolations();
  });
  it("renders children", async () => {
    const list = mountWithTheme(
      <List>
        <SingleLineListItem title="its a test title" />
      </List>
    );
    expect(list).toMatchSnapshot();
    const results = await axe(list.html());
    expect(results).toHaveNoViolations();
  });
});
