import React from "react";
import { storiesOf } from "@storybook/react";

import {
  Table,
  SimpleTable,
  HeaderCell,
  TableHead,
  TableBody,
  Cell,
  Row,
} from "../../src/index.js";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs/react.js";
import styled from "styled-components";

const stories = storiesOf("Table", module);
stories.addDecorator(withKnobs, withInfo);

stories.add(
  "SimpleTable",
  withInfo(`
  #### Description:
    A simple table with base styling built in.  This has no automatic logic
  #### Example declaration:
  ~~~js
  import { SimpleTable, TableHead, TableBody, Row, HeaderCell, Cell } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <SimpleTable>
    <TableHead>
      <Row>
        <HeaderCell>first header</HeaderCell>
        <HeaderCell>second header</HeaderCell>
        <HeaderCell>third header</HeaderCell>
      </Row
    </TableHead>
    <TableBody>
      <Row>
        <Cell>first cell</Cell>
        <Cell>second cell</Cell>
        <Cell>third cell</Cell>
      </Row
    </TableBody>
  </SimpleTable>
  ~~~`)(() => {
    const TableContainer = styled.div`
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0 8px;
    `;

    return (
      <TableContainer>
        <SimpleTable>
          <TableHead>
            <Row>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Role</HeaderCell>
            </Row>
          </TableHead>
          <TableBody>
            <Row>
              <Cell>Jenna</Cell>
              <Cell>Sr Front End Dev</Cell>
            </Row>
            <Row>
              <Cell>Johnny</Cell>
              <Cell>Jr Front End Dev</Cell>
            </Row>
            <Row>
              <Cell>Joanna</Cell>
              <Cell>Dev Analyst</Cell>
            </Row>
          </TableBody>
        </SimpleTable>
      </TableContainer>
    );
  })
);

stories.add(
  "Table",
  withInfo(`
  #### Description:
    A table component with sticky headers/columns.  If sticky header/columns are set to false, this will automatically enable both at widths where the window width is narrower than the table width.  There is no way to disable this as written.
  #### Example declaration:
  ~~~js
  import { Table, TableHead, TableBody, Row, HeaderCell, Cell } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <Table>
    <TableHead>
      <Row>
        <HeaderCell>first header</HeaderCell>
        <HeaderCell>second header</HeaderCell>
        <HeaderCell>third header</HeaderCell>
      </Row
    </TableHead>
    <TableBody>
      <Row>
        <Cell>first cell</Cell>
        <Cell>second cell</Cell>
        <Cell>third cell</Cell>
      </Row
    </TableBody>

  </Table>
  ~~~`)(() => {
    const TableContainer = styled.div`
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0 8px;
    `;

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <Row>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Role</HeaderCell>
            </Row>
          </TableHead>
          <TableBody>
            <Row>
              <Cell>Jenna</Cell>
              <Cell>Sr Front End Dev</Cell>
            </Row>
            <Row>
              <Cell>Johnny</Cell>
              <Cell>Jr Front End Dev</Cell>
            </Row>
            <Row>
              <Cell>Joanna</Cell>
              <Cell>Dev Analyst</Cell>
            </Row>
          </TableBody>
        </Table>
      </TableContainer>
    );
  })
);
