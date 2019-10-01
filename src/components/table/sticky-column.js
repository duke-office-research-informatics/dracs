import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import TableWrap from "./table-container.js";
import TableHead from "./head-container.js";
import TableBody from "./body-container.js";
import Row from "./row.js";

const StickyColumnWrap = styled.div`
  transition: all 300ms ease-in-out;
  transform: translateZ(0);
  tr {
    border-bottom: solid 1px ${p => p.theme.colors.border};
  }
`;

const StickyColumn = props => {
  const renderHeader = () => {
    let cells;
    const stickyRows = [];

    props.header.forEach((row, r) => {
      cells = React.Children.toArray(row.props.children).slice(0, props.count);
      stickyRows.push(
        <Row
          {...row.props}
          key={`stickyColumnHeaderRow-${r}`}
          innerRef={node => {
            props.headerRowRef(node, r);
          }}
          index={r}
        >
          {cells}
        </Row>
      );
    });
    return stickyRows;
  };

  const renderBody = () => {
    let cells;
    const stickyRows = [];

    props.body.forEach((row, r) => {
      cells = React.Children.toArray(row.props.children).slice(0, props.count);
      stickyRows.push(
        <Row
          {...row.props}
          key={`stickyColumnBodyRow-${r}`}
          innerRef={node => {
            props.bodyRowRef(node, r);
          }}
          index={r}
          onMouseEnter={() => props.onRowMouseEnter(r)}
          onMouseLeave={() => props.onRowMouseLeave(r)}
        >
          {cells}
        </Row>
      );
    });
    return stickyRows;
  };

  return (
    <StickyColumnWrap innerRef={props.columnRef} aria-hidden={true}>
      <TableWrap>
        <TableHead>{renderHeader()}</TableHead>
        <TableBody>{renderBody()}</TableBody>
      </TableWrap>
    </StickyColumnWrap>
  );
};

StickyColumn.propTypes = {
  body: propTypes.array,
  bodyRowRef: propTypes.func,
  columnRef: propTypes.func,
  count: propTypes.number,
  header: propTypes.array,
  headerRowRef: propTypes.func,
  onRowMouseEnter: propTypes.func,
  onRowMouseLeave: propTypes.func,
  rows: propTypes.array,
};

StickyColumn.defaultProps = {};

export default StickyColumn;

export { StickyColumnWrap };
