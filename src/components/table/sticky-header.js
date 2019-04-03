import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";

import TableWrap from "./table-container.js";
import TableHead from "./head-container.js";
import Row from "./row.js";

const StickyHeaderWrap = styled.div`
  transition: all 300ms ease-in-out;
  transform: translateZ(0);
`;

const StickyHeader = props => {
  const renderHeader = () => {
    const row = props.rows[0];
    const cells = [];

    React.Children.toArray(row.props.children).forEach((cell, c) => {
      cells.push(
        React.cloneElement(cell, {
          innerRef: node => {
            props.cellRef(node, c);
          },
          key: _.uniqueId(),
        })
      );
    });
    return (
      <Row {...row.props} innerRef={props.rowRef}>
        {cells}
      </Row>
    );
  };

  return (
    <StickyHeaderWrap innerRef={props.headerRef} aria-hidden={true}>
      <TableWrap>
        <TableHead>{renderHeader()}</TableHead>
      </TableWrap>
    </StickyHeaderWrap>
  );
};

StickyHeader.propTypes = {
  rows: propTypes.array,
  headerRef: propTypes.func,
  rowRef: propTypes.func,
  cellRef: propTypes.func,
};

StickyHeader.defaultProps = {};

export default StickyHeader;

export { StickyHeaderWrap };
