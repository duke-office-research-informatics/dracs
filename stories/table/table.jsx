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
import { withKnobs, boolean } from "@storybook/addon-knobs/react.js";
import styled from "styled-components";
import _ from "lodash";

// I tried sorting the list and updating sortKey and sortDirection, but props don't appear to update
const rowData = [
  { name: "Jenna", role: "Sr Front End Dev", yearsOfService: "6" },
  { name: "Johnny", role: "Jr Front End Dev", yearsOfService: "2" },
  { name: "Joanna", role: "Dev Analyst", yearsOfService: "3" },
  { name: "Jonah", role: "Service Line Owner", yearsOfService: "8" },
  { name: "Janice", role: "Director of Development", yearsOfService: "15" },
  { name: "Jensen", role: "Product Owner", yearsOfService: "1" },
];

let sortKey = "name";
let sortDirection = "asc";

const sortRows = sortValue => {
  alert(`Sorting by ${sortValue}`);
};

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
              <HeaderCell
                onClick={
                  boolean("HeaderCell.Sortable", false) ? sortRows : null
                }
                sortDirection={sortDirection}
                primarySortValue="name"
                sortKey={sortKey}
                sortable={boolean("HeaderCell.Sortable", false)}
              >
                Name
              </HeaderCell>
              <HeaderCell
                onClick={
                  boolean("HeaderCell.Sortable", false) ? sortRows : null
                }
                sortDirection={sortDirection}
                primarySortValue="role"
                sortKey={sortKey}
                sortable={boolean("HeaderCell.Sortable", false)}
              >
                Role
              </HeaderCell>
              <HeaderCell
                onClick={
                  boolean("HeaderCell.Sortable", false) ? sortRows : null
                }
                sortDirection={sortDirection}
                primarySortValue="yearsOfService"
                sortKey={sortKey}
                sortable={boolean("HeaderCell.Sortable", false)}
              >
                Years in role
              </HeaderCell>
            </Row>
          </TableHead>
          <TableBody>
            {rowData.map(person => (
              <Row key={`row-${person.name}`}>
                <Cell>{person.name}</Cell>
                <Cell>{person.role}</Cell>
                <Cell>{person.yearsOfService}</Cell>
              </Row>
            ))}
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
              <HeaderCell
                onClick={
                  boolean("HeaderCell.Sortable", false) ? sortRows : null
                }
                sortDirection={sortDirection}
                primarySortValue="name"
                sortKey={sortKey}
                sortable={boolean("HeaderCell.Sortable", false)}
              >
                Name
              </HeaderCell>
              <HeaderCell
                onClick={
                  boolean("HeaderCell.Sortable", false) ? sortRows : null
                }
                sortDirection={sortDirection}
                primarySortValue="role"
                sortKey={sortKey}
                sortable={boolean("HeaderCell.Sortable", false)}
              >
                Role
              </HeaderCell>
              <HeaderCell
                onClick={
                  boolean("HeaderCell.Sortable", false) ? sortRows : null
                }
                sortDirection={sortDirection}
                primarySortValue="yearsOfService"
                sortKey={sortKey}
                sortable={boolean("HeaderCell.Sortable", false)}
              >
                Years in role
              </HeaderCell>
            </Row>
          </TableHead>
          <TableBody>
            {rowData.map(person => (
              <Row key={`row-${person.name}`}>
                <Cell>{person.name}</Cell>
                <Cell>{person.role}</Cell>
                <Cell>{person.yearsOfService}</Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  })
);
