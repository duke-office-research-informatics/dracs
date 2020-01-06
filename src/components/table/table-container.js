import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const TableContainer = styled.table`
  transform: translateZ(0);
`;

class TableWrap extends React.PureComponent {
  render() {
    const { children, tableWrapRef, ...other } = this.props;
    return (
      <TableContainer {...other} ref={tableWrapRef}>
        {children}
      </TableContainer>
    );
  }
}

TableWrap.propTypes = {
  children: propTypes.node,
  tableWrapRef: propTypes.func,
};

export default TableWrap;
