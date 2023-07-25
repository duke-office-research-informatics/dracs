import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import elementResizeEvent from "element-resize-event";

import filterReactChildren from "../../utils/filter-react-children/filter-react-children.js";

// import StickyColumn, { StickyColumnWrap } from "./sticky-column.js";
// import StickyHeader, { StickyHeaderWrap } from "./sticky-header.js";
// import StickyCorner, { StickyCornerWrap } from "./sticky-corner.js";

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
  }
  td {
    border-bottom: solid 1px ${p => p.theme.colors.border};
  }
`;

const isTableHead = child => {
  if (child.props.isTableHead) {
    // console.log(child);
    return true;
  } else {
    return false;
  }
};
const isTableBody = child => {
  if (child.props.isTableBody) {
    return true;
  } else {
    return false;
  }
};
const isTableRow = child => {
  if (child.props.isTableRow || child.props.isColumnAttribute) {
    return true;
  } else {
    return false;
  }
};
const isColumnAttribute = child => {
  if (child.props.isColumnAttribute) {
    return true;
  } else {
    return false;
  }
};
class Table extends React.PureComponent {
  static propTypes = {
    children: propTypes.node,
    // getRowTuples: propTypes.func,
    // highlightRowOnHover: propTypes.bool,
    // onChange: propTypes.func,
    // multiSelectable: propTypes.bool,
    // onRowClick: propTypes.bool,
    // onRowMouseEnter: propTypes.func,
    // onRowMouseLeave: propTypes.func,
    // onRowSelect: propTypes.func,
    // rowHoverColor: propTypes.string,
    // selectable: propTypes.bool,
    // selected: propTypes.array,
    // resizeTimeout: propTypes.number,
    // responsiveStickyColumn: propTypes.bool,
    // stickyColumn: propTypes.bool,
    // stickyColumnCount: propTypes.number,
    // stickyHeader: propTypes.bool,
    headerColor: propTypes.string,
  };

  renderBuiltIns = () => {
    return React.Children.toArray(
      filterReactChildren(this.props.children, isColumnAttribute)
    );
  };

  renderHeader = () => {
    return React.Children.toArray(
      filterReactChildren(this.props.children, isTableHead)
    );
  };

  renderBody = () => {
    return React.Children.toArray(
      filterReactChildren(this.props.children, isTableBody)
    );
  };

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <ElementWrap {...otherProps}>
        <TableWrap>{this.props.children}</TableWrap>
      </ElementWrap>
    );
  }
}

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
