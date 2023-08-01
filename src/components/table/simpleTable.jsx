import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import TableWrap from "../table/table-container.js";
import TableHead from "../table/head-container.js";
import TableBody from "../table/body-container.js";
import HeaderCell from "../table/header-cell.js";
import Row from "../table/row.js";
import Cell from "../table/cell.js";
import Col from "../table/col.js";
import ColGroup from "../table/col-group.js";

const ElementWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  transform: translateZ(0);
  display: block;
  th,
  tr,
  td,
  tbody,
  table {
    box-sizing: border-box;
    border-collapse: separate;
    border-spacing: 0px;
  }
  tbody,
  table {
    transform: translateZ(0);
  }
  th {
    white-space: nowrap;
    border-bottom: 2px solid #e5e5e5;
  }
  td {
    border-bottom: solid 1px ${p => p.theme.colors.border};
  }
`;

const Table = ({ children, ...otherProps }) => {
  return (
    <ElementWrap {...otherProps}>
      <TableWrap>{children}</TableWrap>
    </ElementWrap>
  );
};

export {
  Table,
  TableWrap,
  TableHead,
  TableBody,
  Row,
  Cell,
  HeaderCell,
  Col,
  ColGroup,
};
