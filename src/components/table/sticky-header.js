import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import TableWrap from "./table-container.js";
import TableHead from "./head-container.js";
import Row from "./row.js";

const StickyHeaderWrap = styled.div`
  transition: all 300ms ease-in-out;
  transform: translateZ(0);
`;

class StickyHeader extends React.PureComponent {
  renderHeader = () => {
    const row = this.props.rows[0];
    const cells = [];

    React.Children.toArray(row.props.children).forEach((cell, c) => {
      cells.push(
        React.cloneElement(cell, {
          cellRef: node => {
            this.props.cellRef(node, c);
          },
          key: `stickyHeader-${c}`,
        })
      );
    });
    return (
      <Row {...row.props} ref={this.props.rowRef}>
        {cells}
      </Row>
    );
  };

  render() {
    return (
      <StickyHeaderWrap ref={this.props.headerRef} aria-hidden={true}>
        <TableWrap>
          <TableHead>{this.renderHeader()}</TableHead>
        </TableWrap>
      </StickyHeaderWrap>
    );
  }
}

StickyHeader.propTypes = {
  rows: propTypes.array,
  headerRef: propTypes.func,
  rowRef: propTypes.func,
  cellRef: propTypes.func,
};

StickyHeader.defaultProps = {};

export default StickyHeader;

export { StickyHeaderWrap };
